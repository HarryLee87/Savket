"use server";

import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX_ERROR_MESSAGE,
} from "@/utils/constans";
import { PASSWORD_REGEX } from "@/utils/regexes/password";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH)
    .max(PASSWORD_MAX_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR_MESSAGE),
});

const loginHandleForm = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = loginFormSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
};

export { loginHandleForm };
