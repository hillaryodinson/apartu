import db from "../configs/db";

export async function validateCategoryExists(
	categoryId: string
): Promise<boolean> {
	const category = await db.category.findUnique({
		where: { id: categoryId },
	});
	return category !== null;
}
