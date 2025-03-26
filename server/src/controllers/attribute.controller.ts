import { Request } from "express";
import { CustomResponse, TypedResponse } from "../configs/requests";
import { attributeSchema } from "../configs/zod";
import db from "../configs/db";
import { AppError, ERROR_CODES } from "../utils/errors";

export const createAttribute = async (
	req: Request,
	res: TypedResponse<CustomResponse>
) => {
	//get the attribute from payload
	const payload = req.body;
	//validate the payload
	const zodResponse = attributeSchema.safeParse(payload);
	if (zodResponse.error) throw zodResponse.error;

	//add the attribute if exist.
	const attribute = await db.attribute.create({
		data: {
			...zodResponse.data,
		},
	});

	//return the attribute.
	res.json({
		success: true,
		message: "OK",
		data: attribute,
	});
};

export const updateAttribute = async (
	req: Request,
	res: TypedResponse<CustomResponse>
) => {
	const { id } = req.params;
	const payload = req.body;

	// Validate the payload
	const zodResponse = attributeSchema.safeParse(payload);
	if (zodResponse.error) throw zodResponse.error;

	// Update the attribute
	const attribute = await db.attribute.update({
		where: { id },
		data: {
			...zodResponse.data,
		},
	});

	// Return the updated attribute
	res.json({
		success: true,
		message: "Attribute updated successfully",
		data: attribute,
	});
};

export const deleteAttribute = async (
	req: Request,
	res: TypedResponse<CustomResponse>
) => {
	const { id } = req.params;

	// Delete the attribute
	await db.attribute.delete({
		where: { id },
	});

	// Return success response
	res.json({
		success: true,
		message: "Attribute deleted successfully",
	});
};

export const getSingleAttribute = async (
	req: Request,
	res: TypedResponse<CustomResponse>
) => {
	const { id } = req.params;

	// Fetch the attribute
	const attribute = await db.attribute.findUnique({
		where: { id },
	});

	if (!attribute) {
		throw new AppError(
			ERROR_CODES.DB_RECORD_NOT_FOUND,
			"Attribute not found",
			400
		);
	}

	// Return the attribute
	res.json({
		success: true,
		message: "OK",
		data: attribute,
	});
};

export const getAttributes = async (
	req: Request,
	res: TypedResponse<CustomResponse>
) => {
	const { filterByType } = req.query;
	let where = null;

	if (
		(filterByType !== null && filterByType == "unit") ||
		filterByType == "property"
	) {
		where = { type: filterByType };
	}

	const attributes = await db.attribute.findMany({
		where: {
			...where,
		},
	});

	// Return the list of attributes
	res.json({
		success: true,
		message: "OK",
		data: attributes,
	});
};
