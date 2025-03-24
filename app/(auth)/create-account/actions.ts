"use server";

import { db } from "@/lib/prisma";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_ERROR_MESSAGE,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_ERROR_MESSAGE,
  USERNAME_MIN_LENGTH,
} from "@/utils/constants";
import { PASSWORD_REGEX } from "@/utils/regexes/password";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/services/auth";
// import bcrypt from "bcrypt";
// import getSession from "@/lib/session";

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
      .trim(),
    // .refine(checkUniqueUsername, "This username is already taken!"),
    email: z.string().email().trim().toLowerCase(),
    // .refine(checkUniqueEmail, "This email is already taken!"),
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
  })
  .superRefine(async ({ username }, context) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      // show error
      context.addIssue({
        code: "custom",
        message: "This username is already taken!",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

// .superRefine(async ({ email }, context) => {
//   const userEmail = await db.user.findUnique({
//     where: {
//       email,
//     },
//     select: {
//       id: true,
//     },
//   });

//   if (userEmail) {
//     // show error
//     context.addIssue({
//       code: "custom",
//       message: "This email is already taken!",
//       path: ["email"],
//       fatal: true,
//     });
//     return z.NEVER;
//   }
// });

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
  const supabase = await createClient();

  const data = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    password_confirm: formData.get("password_confirm") as string,
  };

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return {
      ...data,
      error: result.error.flatten(),
    };
  } else {
    const { data: authData, error } = await supabase.auth.signUp({
      email: result.data.email,
      password: result.data.password,
      options: {
        data: { username: result.data.username },
        emailRedirectTo: "/profile",
      },
    });

    if (error) {
      return {
        ...data,
        error: {
          formErrors: [],
          fieldErrors: {
            email: [error.message],
          },
        },
      };
    } else if (authData.user?.identities?.length === 0) {
      return {
        ...data,
        error: {
          formErrors: [],
          fieldErrors: {
            email: ["User with this email already exists, please login"],
          },
        },
      };
    }

    const authUser = await getUser();
    await db.user.create({
      data: {
        id: authUser.id,
        username: result.data.username,
        email: result.data.email,
      },
    });
    //hash the password
    // const hashedPassword = await bcrypt.hash(result.data.password, 12);
    // const user = await db.user.create({
    //   data: {
    //     username: result.data.username,
    // email: result.data.email,
    // password: hashedPassword,
    // },
    //   select: {
    //     id: true,
    //   },
    // });
    // console.log(user);
    //log the user in with iron-session to save the session in browser cookie.
    // const session = await getSession();

    // session.id = user.id;
    // await session.save();

    redirect("/error/alert-error");
  }
}
