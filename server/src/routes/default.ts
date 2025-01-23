import AuthRoute from "./auth.route";
import type { Express } from "express-serve-static-core";
import UserRoute from "./user.route";

const initRoutes = (baseRoute: string, app: Express) => {
    app.use(`${baseRoute}/auth`, AuthRoute);
    app.use(`${baseRoute}/user`, UserRoute);

}

export default initRoutes;