import { verifyToken } from './../middlewares/jwt.middlewares.js';
import { sanitizeMiddleware } from './../middlewares/sanitize.middleware.js';
import initUserRoutes from "./user.routes.js";


const initRoutes = (app: any) => {
  initUserRoutes(app, sanitizeMiddleware, verifyToken);
};

export default initRoutes;
