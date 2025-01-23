import { z } from "zod";
import { loginSchema } from "./zod";
import { User } from "@prisma/client";

export type LoginType =  z.infer<typeof loginSchema>;
export type UserType = Omit<User, 'password'>
export type AuthResponseType = {token:string, user:UserType}