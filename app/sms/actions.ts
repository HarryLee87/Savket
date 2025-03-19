import { z } from "zod";

const SMSSchema = z.object({
  phone: z.string().min(10).max(10),
  token: z.string().min(6).max(6),
});

const SMSHandleForm = async (prevState: any, formData: FormData) => {
  const data = {
    phone: formData.get("phone"),
    token: formData.get("token"),
  };

  const result = SMSSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
};

export { SMSHandleForm };
