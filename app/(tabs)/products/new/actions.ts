"use server";

import db from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const productSchema = z.object({
  title: z.string().nonempty("Title is required"),
  photo: z.array(z.instanceof(File)).min(1, {
    message: "At least one photo is required",
  }),
  price: z.coerce.number({
    required_error: "Price is required",
  }),
  description: z.string().nonempty("Description is required"),
});

export async function uploadProduct(_: any, formData: FormData) {
  const photos = formData.getAll("photo");
  const data = {
    photo: photos,
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  };
  const supabase = await createClient();

  const result = productSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const { data: authUser } = await supabase.auth.getUser();
    const userId = authUser.user?.id;
    const bucketName = "product-img";
    const photoUrls: string[] = [];

    if (userId) {
      for (const file of result.data.photo) {
        if (file instanceof File) {
          const path = `${userId}/${file.name}`;
          const { error: uploadError } = await supabase.storage
            .from(bucketName)
            .upload(path, file);

          if (uploadError) {
            console.error("Upload error:", uploadError);
            redirect("/error");
          }

          const { data: publicUrlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(path);

          if (publicUrlData.publicUrl) {
            photoUrls.push(publicUrlData.publicUrl);
          }
        }
      }

      const newProduct = await db.product.create({
        data: {
          title: result.data.title,
          price: result.data.price,
          description: result.data.description,
          photo: photoUrls,
          user: {
            connect: {
              id: userId,
            },
          },
        },
        select: {
          id: true,
        },
      });

      redirect(`/products/${newProduct.id}`);
    }
  }
}
