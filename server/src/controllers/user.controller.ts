
import { Request, Response } from "express";
import { newAccountSchema } from "../configs/zod";
import db from "../configs/db";
import argon2 from "argon2";
import dotenv from 'dotenv';
import { NodemailerDB } from "../services/nodemailer-db";
import { TypedRequestQuery } from "../configs/requests";
dotenv.config();

export const newAccount = async(req: Request, res: Response)=> {
    try {
        const zodResponse = newAccountSchema.safeParse(req.body);
        if (zodResponse.error) throw new Error(zodResponse.error.message);

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
        return res.status(200).json({
            success: true,
            message: "Account was created successfully",
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "An error occured while creating account",
            errors: error,
        });
    }
}

export const verifyEmail = async (req: TypedRequestQuery<{token:string, callback:string}>, res: Response) => {
    //check if the token exists
    const {token, callback} = req.query;
    try {
        const user = await db.user.findFirst({
            where: {
                actiToken: token
            }
        });

        if (!user) throw new Error("Invalid activation token");
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