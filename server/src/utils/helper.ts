import { User } from "@prisma/client";
import { NodemailerDB } from "../services/nodemailer-db";
import db from "../configs/db";

export const sendActivationEmail = async (token: string, user: User) => {
	//verify email address
	const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3001";
	const ACTIVATION_ROUTE = process.env.CLIENT_ACTIVATION_ROUTE || "/activate";
	const ACTIVATION_URL = `${CLIENT_URL}${ACTIVATION_ROUTE}?token=${token}`;

	const mailer = new NodemailerDB(db);
	await mailer.sendMail({
		to: user.email,
		subject: "Activate Your Account",
		template: `activate_account`,
		context: {
			name: user.email,
			activationURL: ACTIVATION_URL,
		},
		from: process.env.EMAIL || "no-reply@example.com",
	});
};
