"use server";

import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";

const phoneSchema = z
  .string()
  .trim()
  .refine((phone) => validator.isMobilePhone(phone, ["ko-KR", "en-CA"]));
const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
  token: boolean;
  phone?: string;
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
        phone: prevState.phone, // Preserve the phone number
        // return the errors
      };
    } else {
      redirect("/");
    }
  }

  //   const result = SMSSchema.safeParse(data);
  //   if (!result.success) {
  //     return result.error.flatten();
  //   } else {
  //     console.log(result.data);
  //   }
};

export { SMSHandleForm };
