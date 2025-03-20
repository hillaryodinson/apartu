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

export const PropertySchema = z.object({
	name: z.string(),
	type: z.enum(["APARTMENT_COMPLEX", "HOUSE"]),
	country: z.string(),
	state: z.string(),
	address: z.string(),
	categoryId: z.string(),
});

export const ImageSchema = z.object({
	image: z.string(),
	thumb: z.string(),
});
export const UnitBasicInfoSchema = z.object({
	name: z.string(),
	type: z.enum(["ENTIRE_PROPERTY", "APARTMENT", "ROOM"]),
	rentPrice: z.coerce.number(),
	rentDuration: z.coerce.number(),
	rentCycle: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
});
export const UnitImageSchema = z.object({
	images: z.array(ImageSchema).optional(),
});
