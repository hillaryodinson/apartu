import { User } from "@prisma/client";
import { randomUUID } from "crypto";
import db from "../configs/db";
import { sendActivationEmail } from "../utils/helper";

export const generateActivationToken = async (user: User) => {
	try {
		const actiToken = randomUUID();
		await db.user.update({
			data: {
				actiToken,
				actiTokenExpiredAt: new Date(Date.now() + 60 * 60 * 1000),
			},
			where: {
				id: user.id,
			},
		});

		await sendActivationEmail(actiToken, user);
		return actiToken;
	} catch (error) {
		console.log("GenerateActivationToken Error: ", error);
		return false;
	}
};
