"use server";

import db from "@/lib/prisma";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX_ERROR_MESSAGE,
} from "@/utils/constans";
import { PASSWORD_REGEX } from "@/utils/regexes/password";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
};

const loginFormSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .trim()
    .refine(checkUniqueEmail, "An account with this email does not exist"),
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

  const result = await loginFormSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
    //if the user exists, check the password hash
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(result.data.password, user!.password ?? "");
    //log the user in
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      //redirect to "/profile"
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["Incorrect password"],
          email: [],
        },
      };
    }
  }
};

export { loginHandleForm };
