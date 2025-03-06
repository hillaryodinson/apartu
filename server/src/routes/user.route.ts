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
 * /user/verify-email:
 *   get:
 *     summary: Verifies the email address
 *     description: Verifies the email address and redirects to the callback URL with query parameter `msg=ok` or `msg=err`
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The token sent to the user's email
 *       - in: query
 *         name: callback
 *         schema:
 *           type: string
 *         required: true
 *         description: The URL to redirect the user to after the email is verified
 *     responses:
 *       301:
 *         description: Redirects the user to the callback URL with query parameter `?msg=ok` or `?msg=err`
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Whether the email was verified successfully with status ok
 *                   example: ok
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               properties:
 *                 msg:
 *                   type: boolean
 *                   description: Whether the email was verified successfully with status err
 */
UserRoute.get("/verify-email", tryCatch(verifyEmail));

export default UserRoute;
