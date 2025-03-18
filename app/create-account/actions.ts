"use server";

import { z } from "zod";

const checkUsername = (username: string) => {
  return !username.includes("silly");
};

const checkPassword = ({
  password,
  password_confirm,
}: {
  password: string;
  password_confirm: string;
}) => password === password_confirm;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username cannot be numbers!",
        required_error: "Username is required!",
      })
      .min(5, "Username is too short!")
      .max(18, "Username is too long!")
      .refine(checkUsername, "silly is not allowed"),
    email: z.string().email(),
    password: z.string().min(6).max(20),
    password_confirm: z.string().min(6).max(20),
  })
  .refine(checkPassword, {
    message: "Passwords do not match!",
    path: ["password_confirm"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    password_confirm: formData.get("password_confirm"),
  };

  const result = formSchema.safeParse(data);
  console.log(result);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  }
}
