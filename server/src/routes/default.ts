import AuthRoute from "./auth.route";
import type { Express } from "express-serve-static-core";

const initRoutes = (baseRoute: string, app: Express) => {
    app.use(`${baseRoute}/auth`, AuthRoute);

}

export default initRoutes;