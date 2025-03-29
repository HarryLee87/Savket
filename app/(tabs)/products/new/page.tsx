"use client"

import Button from "@/components/Button";
import InputForm from "@/components/InputForm";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useActionState, useState } from "react";
import { uploadProduct } from "./actions";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import productSchema, { ProductType } from "./schema";

const MAX_IMAGE_QTY = 5

export default function NewProduct() {
    const [previews, setPreviews] = useState<string[]>([]);
    const [saleType, setSaleType] = useState<"forSale" | "free">("forSale");
    const [state, dispatch] = useActionState(uploadProduct, { formErrors: [], fieldErrors: {} })
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProductType>({
        resolver: zodResolver(productSchema),
    })


    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { files } } = event
        if (!files) return
        // const file = files[0]
        const fileArray = Array.from(files);
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
        setValue("photo", fileArray);
        console.log(urls)
    }

    const handleDeleteImg = (index: number) => {
        setPreviews((prev) => prev.filter((_, i) => i !== index))
    }

    const onSubmit = (data: ProductType) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("price", data.price.toString());
        formData.append("description", data.description);
        data.photo.forEach((file) => {
            formData.append("photo", file);
        });
        dispatch(formData);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 p-3">

                <div className="flex flex-row gap-2 max-w-md overflow-x-auto scrollbar-hidden py-2 items-center">
                    <label
                        htmlFor="photo"
                        className="border-2 aspect-square flex flex-col items-center justify-center text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover w-30 h-30"
                    >
                        <PhotoIcon className="w-15" />
                        <div className="*:text-sm flex flex-col justify-center items-center">
                            <div>
                                <span className={`text-neutral-400 ${previews.length === 0 ? "" : "text-orange-600"}`}>{previews.length}</span>
                                <span>/{MAX_IMAGE_QTY}</span>
                            </div>
                            <span className="text-red-500 text-xs">{errors.photo?.message}</span>
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
                    type="file"
                    // id="photo"
                    // name="photo"
                    // {...register("photo")}
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={onImageChange}
                />
                <InputForm
                    // name="title"
                    {...register("title")}
                    required
                    placeholder="Title"
                    type="text"
                    errors={[errors.title?.message ?? ""]}
                />
                <div className="flex gap-2 mb-2">
                    <button
                        type="button"
                        onClick={() => { setSaleType("forSale"); setValue("price", "" as unknown as number);; }}
                        className={`px-3 py-1 rounded-2xl ${saleType === "forSale" ? "bg-lime-500 text-white" : "bg-neutral-700 text-neutral-400"}`}>
                        For Sale
                    </button>
                    <button
                        type="button"
                        onClick={() => { setSaleType("free"); setValue("price", 0); }}
                        className={`px-3 py-1 rounded-2xl ${saleType === "free" ? "bg-lime-500 text-white" : "bg-neutral-700 text-neutral-400"}`}>
                        Free
                    </button>
                </div>
                <InputForm
                    {...register("price")}
                    // required
                    placeholder="Price"
                    type="text"
                    errors={[errors.price?.message ?? ""]}
                    disabled={saleType === "free"}
                />
                <InputForm
                    // name="description"
                    {...register("description")}
                    required
                    placeholder="Description"
                    type="text"
                    errors={[errors.description?.message ?? ""]}
                />
                <Button text="Post" />
            </form>
        </div>
    )
}