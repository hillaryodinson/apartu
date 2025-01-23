
import { Request, Response } from "express";
import { newAccountSchema } from "../configs/zod";
import db from "../configs/db";
import argon2 from "argon2";
import dotenv from 'dotenv';
import { NodemailerDB } from "../services/nodemailer-db";
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
        })
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