import { Request, Response } from "express";
import { CustomResponse, TypedRequestBody, TypedResponse } from "../configs/requests";
import { propertySchema } from "../configs/zod";
import db from "../configs/db";
import { PropertyType } from "../configs/types";

export const addProperty = async (req: TypedRequestBody<PropertyType>, res: TypedResponse<CustomResponse>) => {
    try {
        //validate the user input
        const zodResponse = propertySchema.safeParse(req.body);
        if (zodResponse.error) throw new Error(zodResponse.error.message);

        //get the ownerId from req
        const owner = req.user;
        if (!owner) throw new Error("User not found");

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
        return res.status(200).json({
            success: true,
            message: "Property created successfully",
            data: property
        })

    } catch (error:any) {
        return res.status(400).json({ 
            success: false, message: error.message 
        });
    }
}