import { Request, Response } from "express";
import { CustomResponse, TypedRequest, TypedRequestBody, TypedResponse } from "../configs/requests";
import { propertySchema } from "../configs/zod";
import db from "../configs/db";
import { PropertyType } from "../configs/types";
import { AppError, ERROR_CODES } from "../utils/errors";

export const addProperty = async (req: Request, res: Response) => {
    
        //validate the user input
        const zodResponse = propertySchema.safeParse(req.body);
        if (zodResponse.error) throw zodResponse.error;

        //get the ownerId from req
        const owner = (req as TypedRequest<{}, PropertyType>).user;
        if (!owner) throw new AppError(ERROR_CODES.USER_NOT_FOUND, "User not found");

        //create the property if not existing
        const property = await db.property.create({
            data: {
                name: zodResponse.data.name,
                address: zodResponse.data.address,
                type: zodResponse.data.type,
                ownerId: owner.id,
                country: zodResponse.data.country,
                state: zodResponse.data.state,
            }
        });

        //return newly created property
        res.status(200).json({
            success: true,
            message: "Property created successfully",
            data: property
        })
}