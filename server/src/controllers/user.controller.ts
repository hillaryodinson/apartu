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
dotenv.config();

export const newAccount = async (req: Request, res: Response) => {
	const zodResponse = newAccountSchema.safeParse(req.body);
	if (zodResponse.error) throw zodResponse.error;

	const { name, email, password, role } = zodResponse.data;

	const hashedPassword = await argon2.hash(password);
	const actiToken = randomUUID();
	await db.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
			role,
			actiToken,
		},
	});

	//verify email address
	const CLIENT_URL = process.env.CLIENT_URL || "https://localhost:3001";
	const ACTIVATION_ROUTE = process.env.CLIENT_ACTIVATION_ROUTE || "/activate";
	const ACTIVATION_URL = `${CLIENT_URL}${ACTIVATION_ROUTE}?token=${actiToken}`;

	const mailer = new NodemailerDB(db);
	await mailer.sendMail({
		to: email,
		subject: "Activate Your Account",
		template: `activate_account`,
		context: {
			name: email,
			activationURL: ACTIVATION_URL,
		},
		from: process.env.EMAIL || "no-reply@example.com",
	});

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

	if (!user)
		throw new AppError(
			ERROR_CODES.VALIDATION_INVALID_TOKEN,
			"Invalid activation token"
		);
	//if it does remove token from account
	await db.user.update({
		data: {
			actiToken: null,
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
