import Express from "express";
import { authorize, tryCatch, upload } from "../middlewares/middleware";
import { deleteFile, uploadFile } from "../controllers/file.controller";
const FileRoute = Express.Router();

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload files
 *     description: Handles file upload and can be used with dropzone.
 *     tags: [File]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: The files to upload
 *         required: true
 *         collectionFormat: multi
 *     responses:
 *       200:
 *         description: Files uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: File was uploaded successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/File'
 *       400:
 *         description: File not uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: File was not uploaded
 */
FileRoute.post(
	"/upload",
	authorize,
	upload.array("images", 15),
	tryCatch(uploadFile)
);

/**
 * @swagger
 * /delete:
 *   delete:
 *     summary: Delete a file
 *     description: Deletes a file from the file system
 *     tags: [File]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filename:
 *                 type: string
 *                 description: The name of the file to delete
 *                 example: "example.txt"
 *                 required: true
 *     responses:
 *       200:
 *         description: File deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: File was deleted successfully
 *       400:
 *         description: File not deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: File was not deleted
 */
FileRoute.delete("/delete", tryCatch(deleteFile));

export default FileRoute;
