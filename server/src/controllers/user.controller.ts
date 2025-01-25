
import { Request, Response } from "express";
import { newAccountSchema } from "../configs/zod";
import db from "../configs/db";
import argon2 from "argon2";
import dotenv from 'dotenv';
import { NodemailerDB } from "../services/nodemailer-db";
import { TypedRequest, TypedRequestQuery } from "../configs/requests";
import { AppError, ERROR_CODES } from "../utils/errors";
dotenv.config();

export const newAccount = async(req: Request, res: Response)=> {
        const zodResponse = newAccountSchema.safeParse(req.body);
        if (zodResponse.error) throw zodResponse.error;

        const {name, email, password, role} = zodResponse.data;

        const hashedPassword = await argon2.hash(password);
        await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            },
        });
        //verify email address
        //send welcome email
        const mailer = new NodemailerDB(db);
        await mailer.sendMail({
            to: email,
            subject: 'Welcome to Apartu',
            template: `welcome_${role}`,
            context: {
                name
            },
            from: process.env.EMAIL || 'no-reply@example.com'
        });
        res.status(200).json({
            success: true,
            message: "Account was created successfully",
        });
}

export const verifyEmail = async (req: Request, res: Response) => {
    //check if the token exists
    const {token, callback} = (req as TypedRequest<{token:string, callback:string}>).query;
    try {
        const user = await db.user.findFirst({
            where: {
                actiToken: token
            }
        });

        if (!user) throw new AppError(ERROR_CODES.VALIDATION_INVALID_TOKEN,"Invalid activation token");
        //if it does remove token from account
        await db.user.update({
            data:{
                actiToken:null
            },
            where: {
                id: user.id
            }
        });

        //redirect user to callback
        res.redirect(`${callback}?msg=OK`);
    } catch (error:any) {
        res.redirect(`${callback}?msg=ERR`);
    }
}

export const changePassword = async (req: Request, res: Response) => {

}