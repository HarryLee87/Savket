"use client"

import Button from "@/components/Button";
import InputForm from "@/components/InputForm";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useActionState, useState } from "react";
import { uploadProduct } from "./actions";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/20/solid";

const MAX_IMAGE_QTY = 5

export default function NewProduct() {
    const [previews, setPreviews] = useState<string[]>([]);
    const [state, dispatch] = useActionState(uploadProduct, { formErrors: [], fieldErrors: {} })


    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { files } } = event
        if (!files) return
        // const file = files[0]

        if (files.length > MAX_IMAGE_QTY) {
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

    const handleDeleteImg = (index: number) => {
        setPreviews((prev) => prev.filter((_, i) => i !== index))
    }

    return (
        <div>
            <form action={dispatch} className="flex flex-col gap-5 p-3">
                <div className="flex flex-row gap-2 max-w-md overflow-x-auto scrollbar-hidden py-2 items-center">
                    <label
                        htmlFor="photo"
                        className="border-2 aspect-square flex flex-col items-center justify-center text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover w-30 h-30"
                    >
                        <PhotoIcon className="w-15" />
                        <div className="*:text-sm">
                            <span className={`text-neutral-400 ${previews.length === 0 ? "" : "text-orange-600"}`}>{previews.length}</span>
                            <span>/{MAX_IMAGE_QTY}</span>
                            {state?.fieldErrors?.photo && (
                                <span className="text-red-500 text-xs">{state.fieldErrors.photo}</span>
                            )}
                        </div>
                    </label>

                    {previews.length === 0 ? (
                        null
                    )
                        : (
                            <div className="flex gap-3">
                                {previews.map((preview, index) => (
                                    <div key={index} className="relative size-28">
                                        <Image fill key={index} src={preview} alt={`Preview ${index}`}
                                            className="rounded-md object-cover" />
                                        <button
                                            onClick={() => handleDeleteImg(index)}
                                            className="absolute -top-2 -right-2 h-5 w-5 text-neutral-900 aspect-square bg-white rounded-full cursor-pointer z-10">
                                            <XMarkIcon />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </div>

                <input
                    onChange={onImageChange}
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    multiple
                    className="hidden"
                />
                <InputForm name="title"
                    // required
                    placeholder="Title" type="text" errors={state?.fieldErrors.title} />
                <InputForm name="price"
                    // required
                    placeholder="Price" type="text" errors={state?.fieldErrors.price} />
                <InputForm name="description"
                    // required 
                    placeholder="Description" type="text" errors={state?.fieldErrors.description} />
                <Button text="Post" />
            </form>
        </div>
    )
}