import {
	ErrorRequestHandler,
	NextFunction,
	Request,
	RequestHandler,
	Response,
} from "express";
import JWT from "jsonwebtoken";
import { AccessTokenType } from "../configs/types";
import {
	CustomResponse,
	RequestWithUser,
	TypedResponse,
} from "../configs/requests";
import { ZodError } from "zod";
import { AppError, ERROR_CODES } from "../utils/errors";
import rateLimit from "express-rate-limit";
import multer from "multer";
import path from "path";

export const authorize = (req: Request, res: Response, next: NextFunction) => {
	//get the token from header
	const token = req.headers["authorization"]?.split(" ")[1] as
		| string
		| undefined;

	if (!token)
		return next(
			new AppError(
				ERROR_CODES.VALIDATION_INVALID_TOKEN,
				"Unauthorized",
				401
			)
		);

	try {
		const tokenInfo = JWT.verify(token, process.env.JWT_SECRET as string);
		(req as RequestWithUser).user = tokenInfo as AccessTokenType;
	} catch (error) {
		return next(
			new AppError(
				ERROR_CODES.VALIDATION_INVALID_TOKEN,
				"Unauthorized",
				401
			)
		);
	}

	next();
};

export const authorizeAccess = (
	req: RequestWithUser,
	res: Response,
	next: NextFunction
) => {
	//get the list of routes and the places they can access
};

export const errorHandler: ErrorRequestHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(err);
	if (err instanceof ZodError) {
		res.status(400).json({
			success: false,
			message: `V${100}: Validation Errors`,
			errors: err.errors.map((e) => ({
				fields: e.path.join(", "),
				message: e.message,
			})),
		});
	} else if (err instanceof AppError) {
		res.status(err.statusCode).json({
			success: false,
			message: err.message,
			code: `E${err.errorCode}`,
		});
	} else {
		console.log(err.message);
		res.status(500).send({
			success: false,
			message: "Oops an error occured. Please contact administrator",
			code: "EE00",
		});
	}
};

export const tryCatch = (fn: RequestHandler) => {
	return async (
		req: any,
		res: TypedResponse<CustomResponse>,
		next: NextFunction
	) => {
		try {
			await fn(req, res, next);
		} catch (error: any) {
			next(error);
		}
	};
};

export const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP/user to 100 requests per windowMs
	handler: function (req, res, next) {
		res.status(429).json({
			message: "Too many requests, please try again later.",
		});
	},
});

const storage = multer.diskStorage({
	destination: (req: Request, file, cb) => {
		cb(null, "uploads/original/");
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		const filename = Date.now() + ext;
		cb(null, filename);
	},
});
export const upload = multer({ storage });
