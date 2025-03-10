import { z } from "zod";
import { UnitSchema } from "./zod";

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

export type UnitType = z.infer<typeof UnitSchema>;
export type PropertyType = {
	address: string;
	country: string;
	createdAt: string;
	id: string;
	name: string;
	ownerId: string;
	state: string;
	type: string;
	units: UnitType[];
	updatedAt: string;
};
