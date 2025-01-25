import AuthRoute from "./auth.route";
import type { Express } from "express-serve-static-core";
import UserRoute from "./user.route";
import PropertyRoute from "./property.route";

const initRoutes = (baseRoute: string, app: Express) => {
    app.use(`${baseRoute}/auth`, AuthRoute);
    app.use(`${baseRoute}/user`, UserRoute);
    app.use(`${baseRoute}/property`, PropertyRoute);

}

export default initRoutes;