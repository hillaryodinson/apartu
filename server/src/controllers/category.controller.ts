import { Request, Response } from "express";
import db from "../configs/db";
import { AppError, ERROR_CODES } from "../utils/errors";

// Add a new category
export const addCategory = async (req: Request, res: Response) => {
	const { name } = req.body;
	const existingCategory = await db.category.findUnique({
		where: { name },
	});

	if (existingCategory) {
		throw new AppError(
			ERROR_CODES.DB_DUPLICATE_RECORD,
			"Category name already exists",
			400
		);
	}
	const newCategory = await db.category.create({
		data: {
			name,
		},
	});

	res.status(201).json({
		success: true,
		message: "Category created successfully",
		data: {
			id: newCategory.id,
			name: newCategory.name,
		},
	});
};

// Update an existing category
export const updateCategory = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name } = req.body;
	const updatedCategory = await db.category.update({
		data: { name },
		where: { id },
	});
	if (!updatedCategory) {
		throw new AppError(
			ERROR_CODES.DB_RECORD_NOT_FOUND,
			"Category not found",
			400
		);
	}
	res.status(200).json({
		success: true,
		message: "Category was updated",
		data: {
			id: updatedCategory.id,
			name: updatedCategory.name,
		},
	});
};

// Delete a category
export const deleteCategory = async (req: Request, res: Response) => {
	const { id } = req.params;
	const deletedCategory = await db.category.delete({
		where: {
			id,
		},
	});
	if (!deletedCategory) {
		throw new AppError(
			ERROR_CODES.DB_RECORD_NOT_FOUND,
			"Category not found",
			400
		);
	}
	res.status(200).json({
		success: true,
		message: "Category deleted successfully",
	});
};

// Get a single category by ID
export const getCategory = async (req: Request, res: Response) => {
	const { id } = req.params;
	const category = await db.category.findUnique({
		where: { id },
	});
	if (!category) {
		throw new AppError(
			ERROR_CODES.DB_RECORD_NOT_FOUND,
			"Category not found",
			400
		);
	}
	res.status(200).json({
		success: true,
		message: "ok",
		data: {
			id: category.id,
			name: category.name,
		},
	});
};

// Get all categories
export const getAllCategories = async (req: Request, res: Response) => {
	const categories = await db.category.findMany({
		select: {
			id: true,
			name: true,
		},
	});
	res.status(200).json({
		success: true,
		message: "ok",
		data: categories,
	});
};
