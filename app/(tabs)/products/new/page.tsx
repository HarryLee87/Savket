"use client"

import Button from "@/components/Button";
import InputForm from "@/components/InputForm";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function NewProduct() {
    const [preview, setPreview] = useState("")

    const onImageChange = () => { }
    return (
        <div>
            <form className="flex flex-col gap-5 p-3">
                <label
                    htmlFor="photo"
                    className="border-2 aspect-square flex flex-col items-center justify-center text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer"
                >
                    <PhotoIcon className="w-20" />
                    <div className="text-neutral-400 text-sm">Add pictures</div>
                </label>
                <input onChange={onImageChange} type="file" id="photo" name="photo" className="hidden" />
                <InputForm name="title" required placeholder="Title" type="text" />
                <InputForm name="price" required placeholder="Price" type="text" />
                <InputForm name="description" required placeholder="Description" type="text" />
                <Button text="Post" />
            </form>
        </div>
    )
}