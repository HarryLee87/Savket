"use server";

// import db from "@/lib/prisma";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX_ERROR_MESSAGE,
} from "@/utils/constants";
import { PASSWORD_REGEX } from "@/utils/regexes/password";
import { z } from "zod";
// import bcrypt from "bcrypt";
// import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

// const checkUniqueEmail = async (email: string) => {
//   const user = await db.user.findUnique({
//     where: {
//       email,
//     },
//     select: {
//       id: true,
//     },
//   });

//   return Boolean(user);
// };

const loginFormSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  // .refine(checkUniqueEmail, "An account with this email does not exist"),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH)
    .max(PASSWORD_MAX_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR_MESSAGE),
});

interface ActionState {
  email: string;
  password: string;
}

const loginHandleForm = async (prevState: ActionState, formData: FormData) => {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const supabase = await createClient();

  const result = await loginFormSchema.safeParseAsync(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return {
      ...data,
      error: result.error.flatten(),
    };
  } else {
    console.log(result.data);
    //if the user exists, check the password hash
    // const user = await db.user.findUnique({
    //   where: {
    //     email: result.data.email,
    //   },
    //   select: {
    //     id: true,
    //     password: true,
    //   },
    // });
    // const ok = await bcrypt.compare(result.data.password, user!.password ?? "");
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: result.data.email,
      password: result.data.password,
    });

    if (error || !authData.user) {
      console.log("SignIn error:", error?.message || "No user returned");
      return {
        ...data,
        error: {
          formErrors: [],
          fieldErrors: {
            password: ["Invalid email or password. Please try again."],
          },
        },
      };
    }
    //log the user in with iron-session to save the session in browser cookie.
    // const session = await getSession();
    // session.id = authData.user!.id;
    // await session.save();

    // if (ok) {
    //   const session = await getSession();
    //   session.id = user!.id;
    //   await session.save();
    //   //redirect to "/profile"
    //   redirect("/profile");
    // } else {
    //   return {
    //     fieldErrors: {
    //       password: ["Incorrect password"],
    //       email: [],
    //     },
    //   };
    // }

    //redirect to "/profile"
    redirect("/profile");
  }
};

export { loginHandleForm };
