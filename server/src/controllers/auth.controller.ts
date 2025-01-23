import { Request, Response } from "express";
import { loginSchema } from "../configs/zod";
import db from '../configs/db';
import JWT from 'jsonwebtoken';
import { CustomResponse, TypedRequestBody, TypedResponse } from "../configs/requests";
import { AuthResponseType, LoginType, UserType } from "../configs/types";

export const login = async (req: TypedRequestBody<LoginType>, res: TypedResponse<CustomResponse>) => {
    try {
        //validate the user input
        const data = req.body;
        const zodResponse = loginSchema.safeParse(data);

        if (zodResponse.error) throw new Error(zodResponse.error.message);

        //get the user data from the database
        const dbResponse = await db.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (!dbResponse) throw new Error('User not found');

        //create a jwt token
        const token = JWT.sign({
            id: dbResponse.id,
            email: dbResponse.email
        }, process.env.JWT_SECRET as string, {
            expiresIn: '1h'
        });

        //send the jwt token in the response
        res.status(200).json({
            success:true,
            message: 'User logged in successfully',
            data: {
                token,
                user: {...dbResponse, password:undefined} as UserType
            }
        })
    } catch (error: any) {
        //handle the error
        res.status(400).json({
            success:false,
            message: "Invalid Username or Password",
            errors: error.message
        })
    }
};