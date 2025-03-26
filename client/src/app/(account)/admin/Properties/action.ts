import api from "@/utils/api";
import { ApiResponse, PropertyType } from "@/utils/types";

export const fetchProperties = async () => {
	const response = await api.get(
		"/property/all?withOwners=true&withCategory=true"
	);
	const result = (await response.data) as ApiResponse<PropertyType[]>;

	if (result.success) return result.data;

	return [];
};
