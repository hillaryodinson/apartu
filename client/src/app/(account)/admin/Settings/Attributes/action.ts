import api from "@/utils/api";
import { ApiResponse, AttributeType } from "@/utils/types";

export const fetchAttributes = async () => {
	const response = await api.get("/attributes");
	const result = (await response.data) as ApiResponse<AttributeType[]>;

	if (result.success) return result.data;
	return [];
};

export const deleteAttribute = async (id: string) => {
	const response = await api.delete(`/attributes/${id}`);
	const result = (await response.data) as ApiResponse<null>;

	return result.data;
};
