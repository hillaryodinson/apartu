import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { specs } from "./swagger";
import initRoutes from "./routes/default";
import path from "path";
import dotenv from "dotenv";
import { errorHandler, limiter } from "./middlewares/middleware";
import fs from "fs";

dotenv.config();

export const InitApp = () => {
	const app = express();
	app.set("view engine", "ejs");

	// Serve static files (images, etc.) from the 'uploads' folder
	app.use("/uploads", express.static(path.join(__dirname, "../", "uploads")));
	app.set("views", path.join(__dirname, "/views"));
	app.use(bodyParser.urlencoded({ extended: true }));

	console.log("Current directory:", __dirname);

	app.use(bodyParser.json());
	app.use(
		helmet({
			contentSecurityPolicy: false,
			xDownloadOptions: false,
		})
	);
	app.use(
		cors({
			origin: "*",
			methods: ["GET", "POST", "PUT", "DELETE"],
			allowedHeaders: ["Content-Type", "Authorization"],
		})
	);

	if (!fs.existsSync("uploads")) {
		fs.mkdirSync("uploads");
		fs.mkdirSync("uploads/original");
	}

	app.use(limiter);

	app.get("/", (req: Request, res: Response) => {
		res.render("index");
	});

	app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
	initRoutes("/api", app);

	app.use(errorHandler);
	return app;
};
