import { formatToCAD, formatToTimeAgo } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

interface ListProductProps {
    title: string,
    created_at: Date,
    id: number
    photo: string
    price: number
}

export default function ListProduct({
    title,
    created_at,
    id,
    photo,
    price }: ListProductProps) {
    return (
        <Link href={`/products/${id}`} className="flex gap-5">
            <div className="relative size-28 min-w-28 rounded-md overflow-hidden">
                <Image fill src={photo} alt={title} quality={10} className="object-cover" />
            </div>
            <div className="flex flex-col gap-1 *:text-white">
                <span className="text-lg">{title}</span>
                <span className="text-sm text-neutral-500">{formatToTimeAgo(created_at.toString())}</span>
                <span className="text-lg font-semibold">${formatToCAD(price)}</span>
            </div>
        </Link>
    )
}