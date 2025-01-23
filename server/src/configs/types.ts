import { z } from "zod";
import { confirmPasswordResetSchema, loginSchema, newAccountSchema, resetPasswordSchema } from "./zod";
import { User } from "@prisma/client";

export type LoginType =  z.infer<typeof loginSchema>;
export type UserType = Omit<User, 'password'>
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
export type ConfirmPasswordResetType = z.infer<typeof confirmPasswordResetSchema>;
export type NewAccountType = z.infer<typeof newAccountSchema>;