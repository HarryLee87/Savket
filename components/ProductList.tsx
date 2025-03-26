"use client"

import { InitialProducts } from "@/app/(tabs)/products/page";
import ListProduct from "./ListProduct";
import { useEffect, useRef, useState } from "react";
import { getMoreProducts } from "@/app/(tabs)/products/actions";

interface ProductListProps {
    initialProducts: InitialProducts
}

export default function ProductList({ initialProducts }: ProductListProps) {
    const [products, setProducts] = useState(initialProducts)
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [isLastPage, setIsLastPage] = useState(false)

    const trigger = useRef<HTMLSpanElement>(null)
    useEffect(() => {
        const observer = new IntersectionObserver(
            async (
                entries: IntersectionObserverEntry[],
                observer: IntersectionObserver
            ) => {
                const element = entries[0]
                if (element.isIntersecting && trigger.current) {
                    observer.unobserve(trigger.current)
                    setIsLoading(true);
                    const newProducts = await getMoreProducts(page + 1)
                    if (newProducts.length !== 0) {
                        setPage(prev => prev + 1)
                        setProducts(prev => [...prev, ...newProducts])
                    } else {
                        setIsLastPage(true)
                    }
                    setIsLoading(false)
                }
                console.log(entries)
            }, { threshold: 0.5 })
        if (trigger.current) {
            observer.observe(trigger.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [page])
    const onLoadMoreClick = async () => {

    }

    return (
        <div className="flex flex-col gap-5 p-5">
            {products.map(product => <ListProduct key={product.id} {...product} />)}
            {!isLastPage ?
                // <span ref={trigger}
                //     style={{
                //         marginTop: `${page + 1 * 10}vh`
                //     }}
                //     className="mb-96 secondary-btn mx-auto">
                //     {isLoading ? "Loading..." : "Load more"}
                // </span> 
                <span ref={trigger}
                    style={{
                        marginTop: `${page + 1 * 5}vh`
                    }}
                    className="loading mx-auto" />
                : null}
        </div>
    )
}