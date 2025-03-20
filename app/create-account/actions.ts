"use server";

import { db } from "@/lib/prisma";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_ERROR_MESSAGE,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_ERROR_MESSAGE,
  USERNAME_MIN_LENGTH,
} from "@/utils/constans";
import { PASSWORD_REGEX } from "@/utils/regexes/password";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(user);
};

const checkUniqueEmail = async (email: string) => {
  const userEmail = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(userEmail);
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
      .min(USERNAME_MIN_LENGTH, USERNAME_MIN_ERROR_MESSAGE)
      .max(USERNAME_MAX_LENGTH, USERNAME_MAX_ERROR_MESSAGE)
      .toLowerCase()
      .trim()
      .refine(checkUniqueUsername, "This username is already taken!"),
    email: z
      .string()
      .email()
      .trim()
      .toLowerCase()
      .refine(checkUniqueEmail, "This email is already taken!"),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .max(PASSWORD_MAX_LENGTH)
      .regex(
        PASSWORD_REGEX,
        "A password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    password_confirm: z.string().min(6).max(20),
  })
  .refine(checkPassword, {
    message: "Passwords do not match!",
    path: ["password_confirm"],
  });
interface ActionState {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
}

export async function createAccount(
  prevState: ActionState,
  formData: FormData
) {
  const data = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    password_confirm: formData.get("password_confirm") as string,
  };

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return {
      username: data.username,
      email: data.email,
      password: data.password,
      password_confirm: data.password_confirm,
      error: result.error.flatten(),
    };
  } else {
    //hash the password
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    console.log(user);

    //save the user to db
    //log the user in
    //redirect to "/home"
    // redirect("/");
  }
}
