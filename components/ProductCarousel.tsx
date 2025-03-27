"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import Image from "next/image"
import "@/app/products/[id]/productCarousel.css"
import { useState } from "react";

interface ProductCarouselProps {
    images: string[];
    alt: string
}


export default function ProductCarousel({ images, alt }: ProductCarouselProps) {
    const [slide, setSlide] = useState(0)

    const nextSlide = () => {
        if (slide === images.length - 1) {
            setSlide(0)
            return
        }
        setSlide(prev => prev + 1)
    }

    const prevSlide = () => {
        if (slide === 0) {
            setSlide(images.length - 1)
            return
        }
        setSlide(prev => prev - 1)
    }

    return (
        <div className="flex justify-center items-center relative max-w-[432px] w-[100%] max-h-[432px] h-[100%]">
            <ChevronLeftIcon className="arrow arrow-left" onClick={prevSlide} />
            {images.map((image, index) => <Image fill className={`object-cover slide ${index === slide ? "" : "slide-hidden"}`} key={index} src={image} alt={alt} sizes="(max-width: 432px) 100vw, 432px" />)}
            <ChevronRightIcon className="arrow arrow-right" onClick={nextSlide} />
            <span className="indicators">{images.map((_, index) => <button onClick={() => setSlide(index)}
                className={`indicator ${index === slide ? "" : "indicator-inactive"}`} key={index}></button>)}</span>
        </div>
    )
}