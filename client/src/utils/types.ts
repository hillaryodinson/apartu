import { z } from "zod";
import { PropertySchema, UnitSchema } from "./zod";

export type ApiResponse<T> = {
	success: boolean;
	message: string;
	data?: T;
	errors?: Record<string, unknown>;
};

export type AuthResponse = {
	token: string;
	user: UserType;
};

export type UserType = {
	id: string;
	email: string;
	role: string;
	name: string;
	created_at: string;
};

export type PropertyType = z.infer<typeof PropertySchema>;
export type UnitType = z.infer<typeof UnitSchema>;
