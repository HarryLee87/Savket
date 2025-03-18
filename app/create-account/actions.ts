"use server";

import { z } from "zod";

const usernameSchema = z.string().min(5).max(18);

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    password_confirm: formData.get("password_confirm"),
  };

  usernameSchema.parse(data.username);
}
