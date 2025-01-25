import { Request, Response, Router } from "express";
import { addProperty } from "../controllers/property.controller";
import { CustomResponse, TypedRequest, TypedRequestBody, TypedResponse } from "../configs/requests";
import { PropertyType } from "../configs/types";
import { authorize, tryCatch } from "../middlewares/middleware";

const PropertyRoute = Router();
/**
 * @swagger
 * /property:
 *   post:
 *     summary: Add a new property
 *     description: Add a new property
 *     tags: [Property]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the property
 *               address:
 *                 type: string
 *                 description: Address of the property
 *               type:
 *                 type: string
 *                 description: Type of the property
 *               country:
 *                 type: string
 *                 description: Country of the property
 *               state:
 *                 type: string
 *                 description: State of the property
 *     responses:
 *       200:
 *         description: The property was added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the property was added successfully
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The ID of the newly created property
 *                     name:
 *                       type: string
 *                       description: The name of the newly created property
 *                     address:
 *                       type: string
 *                       description: The address of the newly created property
 *                     type:
 *                       type: string
 *                       description: The type of the newly created property
 *                     country:
 *                       type: string
 *                       description: The country of the newly created property
 *                     state:
 *                       type: string
 *                       description: The state of the newly created property
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the property was added successfully
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 *                 errors:
 *                   type: object
 *                   description: An object containing the errors
 *       401:
 *         description: Error Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the property was added successfully
 *                 message: 
 *                   type: string
 *                   description: A message indicating the result of the operation
 *                 errors:
 *                   type: object
 *                   description: An object containing the errors
 */
PropertyRoute.post('/', 
    authorize, 
    tryCatch(
        (req, res) => addProperty(req as TypedRequest<{}, PropertyType>, res))
)
export default PropertyRoute;