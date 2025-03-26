import ProductList from "@/components/ProductList";
import db from "@/lib/prisma"
import { Prisma } from "@prisma/client";

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
        <ProductList initialProducts={initialProducts} />
    )
}