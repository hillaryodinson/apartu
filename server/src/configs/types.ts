import { z } from "zod";
import { loginSchema, resetPasswordSchema } from "./zod";
import { User } from "@prisma/client";

export type LoginType =  z.infer<typeof loginSchema>;
export type UserType = Omit<User, 'password'>
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;