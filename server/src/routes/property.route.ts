import { Request, Response, Router } from "express";
import {
  addProperty,
  addUnit,
  deleteProperty,
  deleteUnit,
  getOwnerProperties,
  getProperties,
  getUnit,
  updateProperty,
  updateUnit,
  updateUnitAvailability,
} from "../controllers/property.controller";
import {
  CustomResponse,
  TypedRequest,
  TypedRequestBody,
  TypedResponse,
} from "../configs/requests";
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
 *             $ref: '#/components/schemas/Property'
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
PropertyRoute.post(
  "/",
  authorize,
  tryCatch((req, res) =>
    addProperty(req as TypedRequest<{}, PropertyType>, res)
  )
);

/**
 * @swagger
 * /property:
 *   get:
 *     tags:
 *       - Property
 *     security:
 *       - bearerAuth: []
 *     summary: Gets all properties owned by the current user
 *     description: Gets all properties owned by the current user
 *     responses:
 *       200:
 *         description: The properties owned by the current user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Property'
 *       401:
 *         description: Error Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the properties were fetched successfully
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 *                 errors:
 *                   type: object
 *                   description: An object containing the errors
 */
PropertyRoute.get("/", authorize, tryCatch(getOwnerProperties));

/**
 * @swagger
 * /property/all:
 *   get:
 *     tags:
 *       - Property
 *     summary: Gets all properties
 *     description: Gets all properties
 *     responses:
 *       200:
 *         description: All properties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Property'
 *       401:
 *         description: Error Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the properties were fetched successfully
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 *                 errors:
 *                   type: object
 *                   description: An object containing the errors
 */
PropertyRoute.get("/all", tryCatch(getProperties));

/**
 * @swagger
 * /property/{propertyId}:
 *   put:
 *     tags:
 *       - Property
 *     security:
 *       - bearerAuth: []
 *     summary: Updates a property
 *     description: Updates a property
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         type: string
 *         description: The ID of the property to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $refs: '#/components/schemas/Property'
 *     responses:
 *       200:
 *         description: The property was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the property was updated successfully
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The ID of the updated property
 *                     name:
 *                       type: string
 *                       description: The name of the updated property
 *                     address:
 *                       type: string
 *                       description: The address of the updated property
 *                     type:
 *                       type: string
 *                       description: The type of the updated property
 *                     country:
 *                       type: string
 *                       description: The country of the updated property
 *                     state:
 *                       type: string
 *                       description: The state of the updated property
 */
PropertyRoute.put("/:propertyId", authorize, tryCatch(updateProperty));

/**
 * @swagger
 * /property/{propertyId}:
 *   delete:
 *     tags:
 *       - Property
 *     security:
 *       - bearerAuth: []
 *     summary: Deletes a property
 *     description: Deletes a property by its ID
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         type: string
 *         description: The ID of the property to delete
 *     responses:
 *       200:
 *         description: Property deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the property was deleted successfully
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 *       401:
 *         description: Error Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the operation was successful
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 */
PropertyRoute.delete("/:propertyId", authorize, tryCatch(deleteProperty));

/**
 * @swagger
 * /property/{propertyId}/unit:
 *   post:
 *     tags:
 *       - Property
 *     summary: Creates a new unit in a property
 *     description: Creates a new unit in a property
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         type: string
 *         description: The ID of the property to create the unit in
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: "#/components/schemas/Unit"
 *     responses:
 *       201:
 *         description: Unit created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the unit was created successfully
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The ID of the newly created unit
 *                     name:
 *                       type: string
 *                       description: The name of the newly created unit
 *                     type:
 *                       type: string
 *                       description: The type of the newly created unit
 *                     rentPrice:
 *                       type: number
 *                       description: The rent price of the newly created unit
 *                     rentDuration:
 *                       type: number
 *                       description: The rent duration of the newly created unit
 *                     rentCycle:
 *                       type: string
 *                       description: The rent cycle of the newly created unit
 *                     availability:
 *                       type: string
 *                       description: The availability of the newly created unit
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the unit was created successfully
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 *                 errors:
 *                   type: object
 *                   description: An object containing the errors
 */
PropertyRoute.post("/:propertyId/unit", tryCatch(addUnit));

/**
 * @swagger
 * /property/unit/{unitId}/availability:
 *   put:
 *     tags:
 *       - Property
 *     security:
 *       - bearerAuth: []
 *     summary: Update unit availability
 *     description: Updates the availability status of a unit
 *     parameters:
 *       - in: path
 *         name: unitId
 *         required: true
 *         type: string
 *         description: The ID of the unit to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               availability:
 *                 type: string
 *                 enum: [AVAILABLE, RENTED]
 *                 description: The new availability status of the unit
 *     responses:
 *       200:
 *         description: Unit availability updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the unit availability was updated successfully
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
 *                   description: Whether the unit availability was updated successfully
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 *                 errors:
 *                   type: object
 *                   description: An object containing the errors
 */
PropertyRoute.put("/unit/:unitId/availability", authorize, tryCatch(updateUnitAvailability));

/**
 * @swagger
 * /property/unit/{unitId}:
 *   delete:
 *     tags:
 *       - Property
 *     security:
 *       - bearerAuth: []
 *     summary: Deletes a unit
 *     description: Deletes a unit by its ID
 *     parameters:
 *       - in: path
 *         name: unitId
 *         required: true
 *         type: string
 *         description: The ID of the unit to delete
 *     responses:
 *       200:
 *         description: Unit deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the unit was deleted successfully
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 *       401:
 *         description: Error Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the operation was successful
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 */
PropertyRoute.delete("/unit/:unitId", authorize, tryCatch(deleteUnit));
/**
 * @swagger
 * /property/unit/{unitId}:
 *   put:
 *     tags:
 *       - Property
 *     security:
 *       - bearerAuth: []
 *     summary: Updates a unit
 *     description: Updates a unit by its ID
 *     parameters:
 *       - in: path
 *         name: unitId
 *         required: true
 *         type: string
 *         description: The ID of the unit to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: "#/components/schemas/Unit"
 *     responses:
 *       200:
 *         description: Unit updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the unit was updated successfully
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 *       401:
 *         description: Error Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the operation was successful
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 */
PropertyRoute.put("/unit/:unitId", authorize, tryCatch(updateUnit));
/**
 * @swagger
 * /property/unit:
 *   get:
 *     tags:
 *       - Property
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieves a unit by its ID
 *     description: Retrieves a unit by its ID
 *     parameters:
 *       - in: query
 *         name: unitId
 *         required: true
 *         type: string
 *         description: The ID of the unit to retrieve
 *     responses:
 *       200:
 *         description: The unit details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the unit was fetched successfully
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Unit'
 *       401:
 *         description: Error Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the operation was successful
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 */
PropertyRoute.get("/unit", authorize, tryCatch(getUnit));

export default PropertyRoute;
