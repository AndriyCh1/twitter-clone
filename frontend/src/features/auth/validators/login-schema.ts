import { z, ZodType } from "zod";
import { ILoginFormData } from "../types/login-form-data";

export const LoginSchema: ZodType<ILoginFormData> = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
