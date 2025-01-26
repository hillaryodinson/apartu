import { z } from "zod";
import { confirmPasswordResetSchema, loginSchema, newAccountSchema, propertySchema, resetPasswordSchema, unitSchema, unitUpdateSchema } from "./zod";
import { Property, type Role, Unit, User } from "@prisma/client";

export type LoginType =  z.infer<typeof loginSchema>;
export type UserType = Omit<User, 'password'>
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
export type ConfirmPasswordResetType = z.infer<typeof confirmPasswordResetSchema>;
export type NewAccountType = z.infer<typeof newAccountSchema>;
export type AccessTokenType = {id:string, name:string, email:string, role:Role}
export type PropertyType = z.infer<typeof propertySchema>;
export type UnitType = z.infer<typeof unitSchema>;
export type UnitUpdateType = z.infer<typeof unitUpdateSchema>
export type PropertyUnitType = Property & {units:Unit[]}