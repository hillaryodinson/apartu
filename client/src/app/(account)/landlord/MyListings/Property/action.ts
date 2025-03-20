import api from "@/utils/api";
import { ApiResponse, CategoryType, PropertyType } from "@/utils/types";

export const fetchMyProperties = async () => {
	const response = await api.get("/property");
	const result = (await response.data) as ApiResponse<PropertyType[]>;

	if (result.success) return result.data;

	return [];
};

export const fetchCategories = async () => {
	const response = await api.get("/category");
	const result = (await response.data) as ApiResponse<CategoryType[]>;

	if (result.success) return result.data;

	return [];
};
