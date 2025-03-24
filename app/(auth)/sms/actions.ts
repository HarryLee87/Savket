"use server";

import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import db from "@/lib/prisma";
import crypto from "crypto";

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, ["ko-KR", "en-CA"]),
    "Wrong phone number format"
  );
const tokenSchema = z.coerce
  .number()
  .min(100000, "Verification Code is too short")
  .max(999999, "Verification Code is too long");
export interface ActionState {
  token: boolean;
  phone: string;
}

const SMSHandleForm = async (prevState: ActionState, formData: FormData) => {
  const phone = formData.get("phone") as string;
  const token = formData.get("token") as string;
  const supabase = await createClient();

  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      return {
        token: false,
        phone: phone,
        error: result.error.flatten(),
      };
    } else {
      const { data: _data, error } = await supabase.auth.signInWithOtp({
        phone: phone,
        options: {
          data: { username: `#${crypto.randomBytes(10).toString("hex")}` },
        },
      });

      if (error) {
        console.error("Error:", error);
        redirect("/sms");
      }

      return {
        token: true,
        phone: phone,
      };
    }
  } else {
    const result = tokenSchema.safeParse(token);
    if (!result.success) {
      return {
        token: true,
        phone: phone,
        error: result.error.flatten(),
      };
    } else {
      const {
        data: { session },
        error,
      } = await supabase.auth.verifyOtp({
        phone,
        token: token,
        type: "sms",
      });

      if (error) {
        console.error("Error:", error);
        redirect("/error");
      }

      // store the data of supabase auth user with phone to db
      if (session) {
        await db.user.create({
          data: {
            id: session.user.id,
            username: session.user.user_metadata.username,
          },
        });
      }

      redirect("/");
    }
  }
};

export { SMSHandleForm };
