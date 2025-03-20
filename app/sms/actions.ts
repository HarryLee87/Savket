"use server";

import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";

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
  const token = formData.get("token");

  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      return {
        token: false,
        phone: phone,
        error: result.error.flatten(),
      };
    } else {
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
      redirect("/");
    }
  }
};

export { SMSHandleForm };
