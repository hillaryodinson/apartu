import { Request, Response } from "express";
import { newAccountSchema } from "../configs/zod";
import db from "../configs/db";
import argon2 from "argon2";
import dotenv from "dotenv";
import { NodemailerDB } from "../services/nodemailer-db";
import {
	CustomResponse,
	TypedRequest,
	TypedResponse,
} from "../configs/requests";
import { AppError, ERROR_CODES } from "../utils/errors";
import { randomUUID } from "crypto";
import { sendActivationEmail } from "../utils/helper";
dotenv.config();

export const newAccount = async (req: Request, res: Response) => {
	const zodResponse = newAccountSchema.safeParse(req.body);
	if (zodResponse.error) throw zodResponse.error;

	const { name, email, password, role } = zodResponse.data;

	const hashedPassword = await argon2.hash(password);
	const actiToken = randomUUID();
	const user = await db.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
			role,
			actiToken,
		},
	});

	await sendActivationEmail(actiToken, user);

	res.status(200).json({
		success: true,
		message: "Account was created successfully",
	});
};

export const verifyEmail = async (
	req: Request,
	res: TypedResponse<CustomResponse>
) => {
	//check if the token exists
	const { token } = (req as TypedRequest<{ token: string }>).params;

	const user = await db.user.findFirst({
		where: {
			actiToken: token,
		},
	});

	if (
		!user ||
		!user.actiTokenExpiredAt ||
		user.actiTokenExpiredAt < new Date()
	)
		throw new AppError(
			ERROR_CODES.VALIDATION_INVALID_TOKEN,
			"Invalid activation token or token has expired",
			400
		);
	//if it does remove token from account
	await db.user.update({
		data: {
			actiToken: null,
			actiTokenExpiredAt: null,
			activatedAt: new Date(),
		},
		where: {
			id: user.id,
		},
	});

	//send welcome email
	const mailer = new NodemailerDB(db);
	await mailer.sendMail({
		to: user.email,
		subject: "Welcome to Apartu",
		template: `welcome_${user.role}`,
		context: {
			name: user.name,
		},
		from: process.env.EMAIL || "no-reply@example.com",
	});

	//redirect user to callback
	res.status(200).json({
		success: true,
		message: "Activation was successful",
		data: {},
	});
};

export const changePassword = async (req: Request, res: Response) => {};
