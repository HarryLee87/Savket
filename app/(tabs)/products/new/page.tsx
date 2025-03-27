"use client"

import Button from "@/components/Button";
import InputForm from "@/components/InputForm";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { uploadProduct } from "./actions";

const MAX_IMAGE_QTY = 5

export default function NewProduct() {
    const [previews, setPreviews] = useState<string[]>([]);

    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { files } } = event
        if (!files) return
        // const file = files[0]

        if (files.length > 5) {
            alert("You can upload a maximum of 5 images.")
            return
        }

        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        const urls: string[] = []

        for (let i = 0; i < files.length; i++) {
            const file = files[i]

            if (file.size > maxSize) {
                alert("The file you selected exceeds 5MB in size.");
                continue;
            }
            urls.push(URL.createObjectURL(file))
        }
        setPreviews(urls)
        console.log(urls)
    }

    return (
        <div>
            <form action={uploadProduct} className="flex flex-col gap-5 p-3">
                <label
                    htmlFor="photo"
                    className="border-2 aspect-square flex flex-col items-center justify-center text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointe bg-center bg-cover"
                // style={{
                //     backgroundImage: `url(${preview})`
                // }}
                >
                    {previews.length === 0 ? (
                        <>
                            <PhotoIcon className="w-20" />
                            <div className="text-neutral-400 text-sm">Add pictures</div>
                        </>
                    )
                        : (
                            <div className="flex gap-2">
                                {previews.map((preview, index) => (
                                    <img key={index} src={preview} alt={`Preview ${index}`} className="object-cover h-20 w-20" />
                                ))}
                            </div>
                        )
                    }
                </label>
                <input
                    onChange={onImageChange}
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    multiple
                    className="hidden"
                />
                <InputForm name="title" required placeholder="Title" type="text" />
                <InputForm name="price" required placeholder="Price" type="text" />
                <InputForm name="description" required placeholder="Description" type="text" />
                <Button text="Post" />
            </form>
        </div>
    )
}