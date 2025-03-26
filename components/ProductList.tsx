"use client"

import { InitialProducts } from "@/app/(tabs)/products/page";
import ListProduct from "./ListProduct";
import { useState } from "react";
import { getMoreProducts } from "@/app/(tabs)/products/actions";

interface ProductListProps {
    initialProducts: InitialProducts
}

export default function ProductList({ initialProducts }: ProductListProps) {
    const [products, setProducts] = useState(initialProducts)
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [isLastPage, setIsLastPage] = useState(false)

    const onLoadMoreClick = async () => {
        setIsLoading(true)
        const newProducts = await getMoreProducts(page + 1)
        if (newProducts.length !== 0) {
            setPage(prev => prev + 1)
            setProducts(prev => [...prev, ...newProducts])
        } else {
            setIsLastPage(true)
        }
        setIsLoading(false)
    }

    return (
        <div className="flex flex-col gap-5 p-5">
            {products.map(product => <ListProduct key={product.id} {...product} />)}
            {!isLastPage ?
                <button onClick={onLoadMoreClick} disabled={isLoading} className="secondary-btn mx-auto">{isLoading ? "Loading..." : "Load more"}</button>
                : null
            }
        </div>
    )
}