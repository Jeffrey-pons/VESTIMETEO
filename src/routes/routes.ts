import { verifyToken } from './../middlewares/jwt.middlewares.js';
import initUserRoutes from "./user.routes.js";
import initWeatherRoutes from "./weather.routes.js"
import { Express } from 'express';


const initRoutes = (app: Express) => {
  initUserRoutes(app, verifyToken);
  initWeatherRoutes(app);
  
};

export default initRoutes;
