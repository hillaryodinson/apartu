import { Request } from "express";
import {
	CustomResponse,
	TypedRequest,
	TypedResponse,
} from "../configs/requests";
import { AppError, ERROR_CODES } from "../utils/errors";
import path from "path";
import fs from "fs";
import sharp from "sharp";

export const uploadFile = async (
	req: Request,
	res: TypedResponse<CustomResponse>
) => {
	const files = req.files as Express.Multer.File[];

	if (!files || files.length === 0) {
		throw new AppError(
			ERROR_CODES.FILE_NOT_FOUND,
			"No file was uploaded",
			400
		);
	}

	const response = await Promise.all(
		files.map(async (file) => {
			const thumbPath = path.join("uploads", "thumb", file.filename);
			const mainPath = path.join("uploads", "main", file.filename);

			// Ensure thumb and main directories exist
			if (!fs.existsSync("uploads/thumb")) {
				fs.mkdirSync("uploads/thumb");
			}
			if (!fs.existsSync("uploads/main")) {
				fs.mkdirSync("uploads/main");
			}

			// Resize the image to thumbnail
			await sharp(file.path).resize(150, 150).toFile(thumbPath);

			// Resize the image to main size
			await sharp(file.path).resize(800, 800).toFile(mainPath);

			// Return paths for thumb and main images
			return {
				thumb: `/uploads/thumb/${file.filename}`,
				main: `/uploads/main/${file.filename}`,
			};
		})
	);

	res.status(200).json({
		success: true,
		message: "File uploaded successfully",
		data: response,
	});
};

export const deleteFile = async (
	req: Request,
	res: TypedResponse<CustomResponse>
) => {
	const request = req as TypedRequest<{}, { filename: string }>;
	const filename = request.body.filename;

	if (!filename)
		throw new AppError(
			ERROR_CODES.FILE_NOT_FOUND,
			"File name is required",
			400
		);

	// Build the paths for both thumb and main images
	const thumbPath = path.join("uploads", "thumb", filename as string);
	const mainPath = path.join("uploads", "main", filename as string);

	// Function to delete a file
	const deleteFile = (filePath: string): Promise<void> => {
		return new Promise((resolve, reject) => {
			fs.unlink(filePath, (err) => {
				if (err) {
					return reject(`Error deleting file: ${filePath}`);
				}
				resolve();
			});
		});
	};

	// Delete the files (thumb and main)
	await Promise.all([deleteFile(thumbPath), deleteFile(mainPath)]);

	res.status(200).json({
		success: true,
		message: "File was deleted successfully",
	});
};
