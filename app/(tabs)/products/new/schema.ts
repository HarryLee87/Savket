import { z } from "zod";

const productSchema = z.object({
  title: z.string().nonempty("Title is required"),
  photo: z.array(z.instanceof(File)).min(1, {
    message: "At least one photo is required",
  }),
  // price: z.coerce.number({
  //   required_error: "Price is required",
  // }),
  price: z.preprocess(
    (val) => {
      if (typeof val === "string" && val.trim() === "") {
        return undefined;
      }

      if (typeof val === "string") {
        return parseFloat(val);
      }
      return val;
    },
    z.number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a valid number",
    })
  ),
  description: z.string().nonempty("Description is required"),
});

export type ProductType = z.infer<typeof productSchema>;

export default productSchema;
