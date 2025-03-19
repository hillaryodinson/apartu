import AuthRoute from "./auth.route";
import type { Express } from "express-serve-static-core";
import UserRoute from "./user.route";
import PropertyRoute from "./property.route";
import FileRoute from "./file.route";
import CategoryRouter from "./category.route";

const initRoutes = (baseRoute: string, app: Express) => {
	app.use(`${baseRoute}/auth`, AuthRoute);
	app.use(`${baseRoute}/user`, UserRoute);
	app.use(`${baseRoute}/property`, PropertyRoute);
	app.use(`${baseRoute}/file`, FileRoute);
	app.use(`${baseRoute}/category`, CategoryRouter);
};

export default initRoutes;
