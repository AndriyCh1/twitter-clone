import { z, ZodType } from "zod";
import { ILoginFormData } from "../types/login";

export const LoginSchema: ZodType<ILoginFormData> = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
