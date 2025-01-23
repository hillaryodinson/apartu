import { Request, Response, Router } from "express";
import { login } from "../controllers/auth.controller";
import { CustomResponse, TypedRequestBody, TypedResponse } from "../configs/requests";
import { AuthResponseType, LoginType, UserType } from "../configs/types";

const AuthRoute = Router();


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login
 *     description: Logs in a user and returns a JWT token
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
AuthRoute.post('/login', (req: Request, res: Response) => {
    login(req as TypedRequestBody<LoginType>, res as TypedResponse<CustomResponse<AuthResponseType>>);
});

export default AuthRoute;