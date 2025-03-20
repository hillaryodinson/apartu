import api from "@/utils/api";
import { ApiResponse, CategoryType } from "@/utils/types";

export const fetchCategories = async () => {
	const response = await api.get("/category");
	const result = (await response.data) as ApiResponse<CategoryType[]>;

	if (result.success) return result.data;
	return [];
};

export const deleteCategory = async (id: string) => {
	const response = await api.delete(`/category/${id}`);
	const result = (await response.data) as ApiResponse<null>;

	return result.data;
};
