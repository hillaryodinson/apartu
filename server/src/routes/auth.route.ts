import { Request, Response, Router } from "express";
import { confirmPasswordReset, login, resetPassword } from "../controllers/auth.controller";
import { CustomResponse, TypedRequest, TypedRequestBody, TypedResponse } from "../configs/requests";
import { ConfirmPasswordResetType, LoginType, ResetPasswordType, UserType } from "../configs/types";
import { tryCatch } from "../middlewares/middleware";

const AuthRoute = Router();

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Authentication routes
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login
 *     description: Logs in a user and returns a JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: my_secret_password
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: whether the login was successful
 *                 message:
 *                   type: string
 *                   description: a success message
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: The JWT token
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: The user's id
 *                         email:
 *                           type: string
 *                           description: The user's email
 *                         role:
 *                           type: string
 *                           description: The user's role
 *                         name:
 *                           type: string
 *                           description: The user's name
 *                         created_at:
 *                           type: string
 *                           description: The user's creation date
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: whether the login was successful
 *                 message:
 *                   type: string
 *                   description: an error message
 *                 errors:
 *                   type: string
 *                   description: list of errors
 */
AuthRoute.post('/login', tryCatch((req, res) => login(req as TypedRequest<{}, LoginType>, res)));

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Request a password reset
 *     description: Requests a password reset and sends a link to the specified email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - callback_url
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address to send the reset link to
 *               callback_url:
 *                 type: string
 *                 description: The url to redirect the user to after the reset link is clicked
 *     responses:
 *       200:
 *         description: A message indicating that the email has been sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the email was sent successfully
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
 *                   description: Whether the login was successful
 *                 message:
 *                   type: string
 *                   description: an error message
 *                 errors:
 *                   type: string
 *                   description: list of errors
 */
AuthRoute.post('/reset-password', tryCatch((req, res) => resetPassword(req as TypedRequest<{}, ResetPasswordType>, res)));

/**
 * @swagger
 * /auth/reset-password/confirm:
 *   post:
 *     summary: Confirm the password reset
 *     description: Confirms the password reset by updating the user's password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: The token sent in the email
 *               password:
 *                 type: string
 *                 description: The new password to set
 *     responses:
 *       200:
 *         description: A message indicating that the password has been reset
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the password was reset successfully
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
 *                   description: Whether the login was successful
 *                 message:
 *                   type: string
 *                   description: an error message
 *                 errors:
 *                   type: string
 *                   description: list of errors
 */
AuthRoute.post('/reset-password/confirm', tryCatch((req, res) => confirmPasswordReset(req as TypedRequest<{}, ConfirmPasswordResetType>, res)));

export default AuthRoute;
