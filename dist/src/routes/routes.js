import { verifyToken } from './../middlewares/jwt.middlewares.js';
import initUserRoutes from "./user.routes.js";
import initWeatherRoutes from "./weather.routes.js";
const initRoutes = (app) => {
    initUserRoutes(app, verifyToken);
    initWeatherRoutes(app);
};
export default initRoutes;
