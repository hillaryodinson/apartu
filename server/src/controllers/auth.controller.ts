import { confirmPasswordResetSchema, loginSchema, resetPasswordSchema } from "../configs/zod";
import db from "../configs/db";
import JWT from "jsonwebtoken";
import {
  CustomResponse,
  TypedRequestBody,
  TypedResponse,
} from "../configs/requests";
import { ConfirmPasswordResetType, LoginType, ResetPasswordType, UserType } from "../configs/types";
import argon2 from "argon2";
import { randomUUID } from "crypto";
import { NodemailerDB } from "../services/nodemailer-db";
import dotenv from 'dotenv';
dotenv.config();

export const login = async (
  req: TypedRequestBody<LoginType>,
  res: TypedResponse<CustomResponse>
) => {
  try {
    //validate the user input
    const data = req.body;
    const zodResponse = loginSchema.safeParse(data);

    if (zodResponse.error) throw new Error(zodResponse.error.message);

    //get the user data from the database
    const dbResponse = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!dbResponse) throw new Error("User not found");

    //check if the password is correct
    const isValidPassword = await argon2.verify(
      dbResponse.password,
      data.password
    );
    if (!isValidPassword) throw new Error("Invalid Username or Password");

    //create a jwt token
    const token = JWT.sign(
      {
        id: dbResponse.id,
        email: dbResponse.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    //send the jwt token in the response
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        token,
        user: { ...dbResponse, password: undefined } as UserType,
      },
    });
  } catch (error: any) {
    //handle the error
    res.status(400).json({
      success: false,
      message: "Invalid Username or Password",
      errors: error.message,
    });
  }
};

export const resetPassword = async (
  req: TypedRequestBody<ResetPasswordType>,
  res: TypedResponse<CustomResponse>
) => {
  try {
    //accepts a callback url and email
    const zodResponse = resetPasswordSchema.safeParse(req.body);

    if (zodResponse.error) throw new Error(zodResponse.error.message);

    const {email, callback_url} = zodResponse.data;

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    //checks if email is valid
    if (!user) throw new Error("Invalid email address");

    //request a password reset
    const token = randomUUID();
    await db.passwordReset.create({
      data: {
        token,
        userId: user.id,
        expiresIn: new Date(Date.now() + 60 * 60 * 1000), //token is valid for 1 hour
      },
    });
    //generate a random token sent to email
    const mailer = new NodemailerDB(db);
    const resetUrl = `${callback_url}?token=${token}`;
    await mailer.sendMail({
      to: user.email,
      subject: "Password Reset",
      template: "password-reset",
      context: {
        name:user.name,
        resetUrl,
      },
      from: "B9vY1@example.com",
    });

    return res.status(200).json({
      success: true,
      message: "Password reset request was sent to your email",
    });
    //return response
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address",
      errors: error.message,
    });
  }
};

export const confirmPasswordReset = async (
    req: TypedRequestBody<ConfirmPasswordResetType>, 
    res: TypedResponse<CustomResponse>
) => {
    try {

        const zodResponse = confirmPasswordResetSchema.safeParse(req.body);
        if (zodResponse.error) throw new Error(zodResponse.error.message);

        //gets the token and verifies if its valid
        const {token, password} = zodResponse.data;
        const result = await db.passwordReset.findUnique({
            where: {
                token,
            },
        });
        if (!result) throw new Error("Invalid token");
        if (Date.now() > result.expiresIn.getTime()) throw new Error("Token has expired");

        //hash the new password
        const hashedPassword = await argon2.hash(password);

        //update the password in the database
        await db.user.update({
            where: {
                id: result.userId,
            },
            data: {
                password: hashedPassword,
            },
        });

        //delete the token from the database
        await db.passwordReset.delete({
            where: {
                token,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Password reset successful",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "An error occured while resetting password",
            errors: error,
        });
    }
};
