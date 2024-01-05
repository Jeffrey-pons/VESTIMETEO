import { verifyToken } from './../middlewares/jwt.middlewares.js';
import { sanitizeMiddleware } from './../middlewares/sanitize.middleware.js';
import initUserRoutes from "./user.routes.js";
import initWeatherRoutes from "./weather.routes.js";
const initRoutes = (app) => {
    initUserRoutes(app, sanitizeMiddleware, verifyToken);
    initWeatherRoutes(app, sanitizeMiddleware, verifyToken);
};
export default initRoutes;
