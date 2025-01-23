import { Router } from "express";
import { login } from "../controllers/auth.controller";

const AuthRoute = Router();
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logs a user in
 *     description: Logs a user in
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email for the user
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password for the user
 *     responses:
 *       200:
 *         description: The logged in user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                           format: email
 *                         created:
 *                           type: string
 *                           format: date-time
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 */
AuthRoute.post('/login', login);

export default AuthRoute;