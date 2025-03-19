"use server";

import { passwordRegex } from "@/utils/regexes/password";
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
      .toLowerCase()
      .trim()
      .refine(checkUsername, "silly is not allowed"),
    email: z.string().email().trim().toLowerCase(),
    password: z
      .string()
      .min(6)
      .max(20)
      .regex(
        passwordRegex,
        "A password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
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
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
