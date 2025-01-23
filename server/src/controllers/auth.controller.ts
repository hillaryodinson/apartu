import { Request, Response } from "express";
import { loginSchema, resetPasswordSchema } from "../configs/zod";
import db from '../configs/db';
import JWT from 'jsonwebtoken';
import { CustomResponse, TypedRequestBody, TypedResponse } from "../configs/requests";
import { LoginType, ResetPasswordType, UserType } from "../configs/types";
import argon2 from 'argon2';
import { randomUUID } from "crypto";

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

        //check if the password is correct
        const isValidPassword = await argon2.verify(dbResponse.password, data.password);
        if (!isValidPassword) throw new Error('Invalid Username or Password');

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

export const resetPassword =  async (req: TypedRequestBody<ResetPasswordType>, res: TypedResponse<CustomResponse>) => {
    try {
        //accepts a callback url and email
        const zodResponse = resetPasswordSchema.safeParse(req.body);

        if (zodResponse.error) throw new Error(zodResponse.error.message);

        const user = await db.user.findUnique({
            where: {
                email: req.body.email
            }
        });
        //checks if email is valid
        if (!user) throw new Error('Invalid email address');

        //request a password reset
        const token = randomUUID();
        await db.passwordReset.create({
            data: {
                token,
                userId: user.id,
                expiresIn: new Date(Date.now() + 60 * 60 * 1000) //token is valid for 1 hour
            }
        })
        //generate a random token sent to email
        return res.status(200).json({
            success: true,
            message: 'Password reset request was sent to your email',
        })
        //return response
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email address',
            errors: error.message
        })
    }
}

export const verfyResetToken = async (req: Request, res: Response) => {
    //gets the token and verifies if its valid
    //sets the new password for the user.
    //return response with success message
}