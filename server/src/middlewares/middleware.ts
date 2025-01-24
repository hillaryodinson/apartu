import { NextFunction, Request, Response } from "express";
import JWT from 'jsonwebtoken'
import { AccessTokenType } from "../configs/types";
import { RequestWithUser } from "../configs/requests";

export const authorize = (req: Request, res: Response, next: NextFunction) => {
    //get the token from header
    const token = req.headers['authorization']?.split(' ')[1] as string | undefined;

    if (!token) return next({ status:401, message: 'Access denied. No token provided.' });

    const tokenInfo = JWT.verify(token, process.env.JWT_SECRET as string);
    (req as RequestWithUser).user = tokenInfo as AccessTokenType

    next()
}

export const authorizeAccess = (req: RequestWithUser, res: Response, next: NextFunction) => {
    //get the list of routes and the places they can access
}