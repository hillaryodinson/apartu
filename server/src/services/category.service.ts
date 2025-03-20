import db from "../configs/db";

export async function validateCategoryExists(
	categoryId: string
): Promise<boolean> {
	const category = await db.category.findUnique({
		where: { id: categoryId },
	});
	return category !== null;
}

export async function validateSubCategoryExists(
	subCategoryId: string
): Promise<boolean> {
	const subCategory = await db.subCategory.findUnique({
		where: { id: subCategoryId },
	});
	return subCategory !== null;
}
