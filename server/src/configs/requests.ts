import {Query, Send} from 'express-serve-static-core';
import { Request, Response } from 'express';

export interface RequestWithUser extends Request {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    }|null;
}

export interface TypedRequest<T extends Query = {}, U = {}> extends RequestWithUser {
    body: U,
    query: T
}

export interface TypedRequestBody<T> extends RequestWithUser {
    body: T,
}

export interface TypedRequestQuery<T extends Query> extends RequestWithUser {
    query: T
}

export interface TypedResponse<ResBody> extends Response {
    json: Send<ResBody, this>;
}

export interface CustomResponse{
    success: boolean;
    message?: string;
    data?: any;
    errors?: any;
}
