import { Request, Response, Router } from "express";
import { CustomResponse, TypedRequestBody, TypedResponse } from "../configs/requests";
import { NewAccountType } from "../configs/types";
import { newAccount } from "../controllers/user.controller";

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
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *               role:
 *                 type: string
 *                 description: The role of the user supported roles (admin, landlord, caretaker, tenant)
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
UserRoute.post('/register', (req: Request, res: Response) => {
    newAccount(req as TypedRequestBody<NewAccountType>, res as TypedResponse<CustomResponse>);
});

export default UserRoute;