import { z, ZodType } from "zod";
import { ILoginFormData } from "../types/login";

export const SignUpSchema: ZodType<ILoginFormData> = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  username: z.string().min(1, { message: "Full name is required" }),
  fullName: z.string().min(1, { message: "Full name is required" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});
