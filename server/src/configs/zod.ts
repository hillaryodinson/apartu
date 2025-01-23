import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const resetPasswordSchema = z.object({
    email: z.string().email(),
    callback_url: z.string(),
})