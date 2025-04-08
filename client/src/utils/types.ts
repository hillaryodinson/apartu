import { z } from "zod";
import { ImageSchema, UnitBasicInfoSchema } from "./zod";

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

export type UnitType = {
	id: string;
	name: string;
	rentPrice: number;
	rentDuration: number;
	rentCycle: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
	type: SubCategoryType;
	images: ImageType[];
	parentUnit: string | null;
	subUnits: UnitType[];
	availability: string;
	createdAt: string;
	updatedAt: string;
};
export type ImageType = {
	id?: string;
	image: string;
	thumb: string;
};
export type PropertyType = {
	address: string;
	country: string;
	createdAt: string;
	id: string;
	name: string;
	ownerId: string;
	owner?: UserType;
	state: string;
	rentalType: string;
	units: UnitType[];
	updatedAt: string;
	category: {
		id: string;
		name: string;
	};
};

export type CategoryType = {
	id: string;
	name: string;
	subCategory: SubCategoryType[];
};

export type SubCategoryType = {
	id: string;
	name: string;
};

export type CategoryWithSubCategoryType = CategoryType & {
	subCategory: SubCategoryType[];
};

export type UnitBasicInfo = z.infer<typeof UnitBasicInfoSchema> & {
	propertyId: string;
};
export type UnitImageInfo = z.infer<typeof ImageSchema>[];
export type UserRole = "admin" | "tenant" | "caretaker" | "landlord";
export type AttributeType = {
	name: string;
	type: string;
	valueType: string;
	id?: string;
};
