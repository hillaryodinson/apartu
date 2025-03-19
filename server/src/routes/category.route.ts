import express from "express";
import { authorize, tryCatch } from "../middlewares/middleware";
import {
	addCategory,
	deleteCategory,
	getAllCategories,
	getCategory,
	updateCategory,
} from "../controllers/category.controller";

const categoryRouter = express.Router();

/**
 * @swagger
 * /category:
 *   get:
 *     tags:
 *        - Category
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: Fetch all categories
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
 *                   example: Ok
 *                 data:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Category'
 *       500:
 *         description: Internal Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Whether the operation was successful
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 *                   example: An error occured. Please try again
 */
categoryRouter.get("/", tryCatch(getAllCategories));

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     tags:
 *      - Category
 *     summary: Get a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetch all category
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
 *                   example: Ok
 *                 data:
 *                    type: object
 *                    $ref: '#/components/schemas/Category'
 *       500:
 *         description: Internal Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Whether the operation was successful
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 *                   example: An error occured. Please try again
 */
categoryRouter.get("/:id", tryCatch(getCategory));

/**
 * @swagger
 * /category:
 *   post:
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: The created category
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
 *                   example: Ok
 *                 data:
 *                    type: object
 *                    $ref: '#/components/schemas/Category'
 *       400:
 *         description: Internal Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Whether the operation was successful
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 *                   example: An error occured. Please try again
 *                 errors:
 *                   type: object
 *                   description: A message indicating the result of the operation
 */
categoryRouter.post("/", authorize, tryCatch(addCategory));

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     tags:
 *       - Category
 *     summary: Update a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: The updated category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 */
categoryRouter.put("/:id", tryCatch(updateCategory));

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     tags:
 *       - Category
 *     summary: Delete a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The updated category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 */
categoryRouter.delete("/:id", tryCatch(deleteCategory));

export default categoryRouter;
