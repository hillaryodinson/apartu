import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const resetPasswordSchema = z.object({
    email: z.string().email(),
    callback_url: z.string(),
})

export const confirmPasswordResetSchema = z.object({
    token: z.string(),
    password: z.string(),
})

export const newAccountSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.enum(['admin', 'landlord', 'caretaker', 'tenant'])
})