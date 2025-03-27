"use server";

export async function uploadProduct(
  formData: FormData
) {
  const photos =
    formData.getAll("photo");
  const data = {
    photos,
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get(
      "description"
    ),
  };
  console.log(data);
}
