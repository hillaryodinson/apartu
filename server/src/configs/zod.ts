import { z } from "zod";
import { validateCategoryExists } from "../services/category.service";

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const resetPasswordSchema = z.object({
	email: z.string().email(),
	callback_url: z.string(),
});

export const confirmPasswordResetSchema = z.object({
	token: z.string(),
	password: z.string(),
});

export const newAccountSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
	role: z.enum(["admin", "landlord", "caretaker", "tenant"]),
});

export const propertySchema = z.object({
	name: z.string(),
	address: z.string(),
	state: z.string(),
	country: z.string(),
	type: z.enum(["HOUSE", "APARTMENT_COMPLEX"]),
	categoryId: z.string().refine(
		async (categoryId) => {
			const exists = await validateCategoryExists(categoryId);
			return exists;
		},
		{
			message: "Category does not exist",
		}
	),
});

export const imageSchema = z.object({
	image: z.string(),
	thumb: z.string(),
});

export const unitSchema = z.object({
	name: z.string().min(1, "Unit name is required"),
	type: z.enum(["ENTIRE_PROPERTY", "APARTMENT", "ROOM"]),
	rentPrice: z.number().positive("Rent price must be a positive number"),
	rentDuration: z
		.number()
		.positive("Rent duration must be a positive number"),
	rentCycle: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
	availability: z.enum(["AVAILABLE", "RENTED"]).optional(),
	images: z.array(imageSchema).optional(),
});

export const unitUpdateSchema = unitSchema.partial();
