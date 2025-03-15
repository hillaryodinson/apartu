import api from "@/utils/api";
import { ApiResponse, PropertyType } from "@/utils/types";

export const fetchMyProperties = async () => {
	const response = await api.get("/property");
	const result = (await response.data) as ApiResponse<PropertyType[]>;

	if (result.success) return result.data;

	return [];
};
