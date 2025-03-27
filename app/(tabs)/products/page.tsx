import ProductList from "@/components/ProductList";
import db from "@/lib/prisma"
import { PlusIcon } from "@heroicons/react/20/solid";
import { Prisma } from "@prisma/client";
import Link from "next/link";

async function getProducts() {
    const products = await db.product.findMany({
        select: {
            title: true,
            price: true,
            created_at: true,
            photo: true,
            id: true
        },
        take: 6,
        orderBy: {
            created_at: 'desc'
        }
    });
    return products
}

export type InitialProducts = Prisma.PromiseReturnType<typeof getProducts>

export default async function Products() {
    const initialProducts = await getProducts()
    return (
        <div>
            <ProductList initialProducts={initialProducts} />
            <Link href="/products/new" className="float-icon">
                <PlusIcon className="size-10" />
            </Link>
        </div>
    )
}