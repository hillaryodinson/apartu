import { Request, Response, Router } from "express";
import {
	CustomResponse,
	TypedRequestBody,
	TypedRequestQuery,
	TypedResponse,
} from "../configs/requests";
import { NewAccountType } from "../configs/types";
import { newAccount, verifyEmail } from "../controllers/user.controller";
import { tryCatch } from "../middlewares/middleware";

const UserRoute = Router();

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Creates a new user account
 *     description: Creates a new user account with the given information
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       description: Supported roles only include (admin, landlord, caretaker, tenant)
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: "#/components/schemas/User"
 *
 *     responses:
 *       200:
 *         description: A message indicating that the user has been created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the user was created successfully
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the user was created successfully
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 */
UserRoute.post("/register", tryCatch(newAccount));

/**
 * @swagger
 * /user/verify-email/{token}:
 *   put:
 *     summary: Verifies the email address
 *     description: Verifies the email address of the new user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The token sent to the user's email
 *
 *     responses:
 *       200:
 *         description: Shows a success message when user is verified successfully. it returns the authentication details for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the operation was successful
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 *
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the operation was successful
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 */
UserRoute.put("/verify-email/:token", tryCatch(verifyEmail));

export default UserRoute;
