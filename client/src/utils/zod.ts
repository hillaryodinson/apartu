import { z } from "zod";

export const LoginSchema = z.object({
	email: z.string().email("Invalid email address."),
	password: z
		.string()
		.min(1, "Password must be more than one character and less than 20")
		.max(20, "Password must be more than one character and less than 20"),
});

export const SignupSchema = z.object({
	name: z.string(),
	email: z.string().email("Please input a valid email address"),
	password: z.string().min(5, "Password must be more than 5 characters"),
	role: z.enum(["tenant", "landlord", "caretaker"]),
});
