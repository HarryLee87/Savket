import db from "@/lib/prisma"
import { formatToCAD } from "@/lib/utils"
import { createClient } from "@/utils/supabase/server"
import { UserIcon } from "@heroicons/react/20/solid"
import { TrashIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

async function getIsOwner(userId: string) {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    console.log("🚀 ~ getIsOwner ~ user:", user)
    if (error) {
        console.error("Error fetching user data:", error)
        return false
    }

    if (user) {
        return user.id === userId
    }
    return false
}

async function getProduct(id: number) {
    const product = await db.product.findUnique({
        where: {
            id
        },
        include: {
            user: {
                select: {
                    username: true,
                    avatar: true
                }
            }
        }
    })
    console.log("🚀 ~ getProduct ~ product:", product)
    return product
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    const id = Number((await params).id)
    if (isNaN(id)) {
        return notFound()
    }
    const product = await getProduct(id)
    if (!product) {
        return notFound()
    }

    const deleteItem = async () => {
        "use server"
        const productInDB = await db.product.findUnique({
            where: {
                id: product.id
            },
            select: {
                id: true,
                user_id: true
            }
        })

        if (!productInDB) return

        const supabase = await createClient();
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
            return
        }

        if (user!.id !== productInDB.user_id) {
            redirect("/error/permission-error");
        }

        await db.product.delete({
            where: {
                id: product.id
            }
        })
        redirect("/products")
    }

    const isOwner = await getIsOwner(product.user_id)
    return (
        <div className="max-w-md min-h-screen py-3 px-2 mx-auto">
            <div className="relative aspect-square size-auto">
                <Image fill src={product.photo} alt={product.title} priority={true} className="object-cover"
                    // If the viewport is at most 432px wide, use 100vw; otherwise, use 432px.
                    sizes="(max-width: 432px) 100vw, 432px"
                />
            </div>
            <div className="flex flex-row justify-between border-b border-neutral-600 items-center">
                <div className="p-5 flex items-center gap-3 ">
                    <div className="rounded-full overflow-hidden size-10">
                        {product.user.avatar !== null ?
                            <Image src={product.user.avatar} width={40} height={40} alt={product.user.username} />
                            : <UserIcon />
                        }
                    </div>
                    <div>
                        <h3>{product.user.username}</h3>
                    </div>
                </div>
                {isOwner ?
                    <form action={deleteItem}>
                        <button className=" bg-red-500 py-1 px-1.5 rounded-md cursor-pointer mr-2">
                            <TrashIcon className="h-8" />
                        </button>
                    </form>
                    : null
                }
            </div>
            <div className="p-5">
                <h1 className="text-2xl font-semibold">{product.title}
                </h1>
                <p>{product.description}</p>
            </div>
            <div className="fixed w-full bottom-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center max-w-md *:font-semibold">
                <span className="text-lg">${formatToCAD(product.price)}</span>
                <Link href={``} className="bg-lime-500 px-5 py-2.5 rounded-md text-white">Chat</Link>
            </div>
        </div>
    )
}