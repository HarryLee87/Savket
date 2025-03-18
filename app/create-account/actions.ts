"use server";

import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(5).max(18),
  email: z.string().email(),
  password: z.string().min(6).max(20),
  password_confirm: z.string().min(6).max(20),
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
  }
}
