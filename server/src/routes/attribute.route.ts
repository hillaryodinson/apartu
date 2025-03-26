import express from "express";
import { authorize, tryCatch } from "../middlewares/middleware";
import {
	createAttribute,
	deleteAttribute,
	getAttributes,
	getSingleAttribute,
	updateAttribute,
} from "../controllers/attribute.controller";

const attributeRoute = express.Router();

/**
 * @swagger
 * /attributes/{id}:
 *   get:
 *     tags:
 *      - Attributes
 *     summary: Get a attribute by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetch a single attribute
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
 *                    $ref: '#/components/schemas/Attribute'
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
attributeRoute.get("/:id", tryCatch(getSingleAttribute));

/**
 * @swagger
 * /attributes:
 *   get:
 *     tags:
 *        - Attributes
 *     summary: Get all attributes
 *     parameters:
 *       - in: query
 *         name: filterByType
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetch all attributes
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
 *                      $ref: '#/components/schemas/Attribute'
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
attributeRoute.get("/", tryCatch(getAttributes));

/**
 * @swagger
 * /attributes:
 *   post:
 *     tags:
 *       - Attributes
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new attribute
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Attribute'
 *     responses:
 *       201:
 *         description: The created attribute
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
 *                    $ref: '#/components/schemas/Attribute'
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
attributeRoute.post("/", authorize, tryCatch(createAttribute));

/**
 * @swagger
 * /attributes/{id}:
 *   put:
 *     tags:
 *       - Attributes
 *     security:
 *       - bearerAuth: []
 *     summary: Update a attribute by ID
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
 *             $ref: '#/components/schemas/Attribute'
 *     responses:
 *       200:
 *         description: The updated attribute
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attribute'
 */
attributeRoute.put("/:id", authorize, tryCatch(updateAttribute));

/**
 * @swagger
 * /attribute/{id}:
 *   delete:
 *     tags:
 *       - Attributes
 *     summary: Delete a attribute by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: status of the post with OK for success
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the attribute was created successfully
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 */
attributeRoute.delete("/:id", authorize, tryCatch(deleteAttribute));

export default attributeRoute;
