import { z } from "zod";
import { IEditProfileFormData } from "../types";

export const EditProfileSchema: z.ZodType<IEditProfileFormData> = z.object({
  fullName: z
    .string()
    .min(1, { message: "Full name is required" })
    .max(32, { message: "Full name is too long" })
    .optional()
    .or(z.literal("")),
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .max(32, { message: "Username is too long" })
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .max(32, { message: "Email is too long" })
    .optional()
    .or(z.literal("")),
  bio: z
    .string()
    .min(1, { message: "Bio is required" })
    .max(128, { message: "Bio is too long" })
    .optional()
    .or(z.literal("")),
  link: z
    .string()
    .min(1, { message: "Link is required" })
    .max(128, { message: "Link is too long" })
    .optional()
    .or(z.literal("")),
  newPassword: z
    .string()
    .min(1, { message: "New password is required" })
    .max(32, { message: "New password is too long" })
    .optional()
    .or(z.literal("")),
  currentPassword: z
    .string()
    .min(1, { message: "Current password is required" })
    .max(32, { message: "Current password is too long" })
    .optional()
    .or(z.literal("")),
});
