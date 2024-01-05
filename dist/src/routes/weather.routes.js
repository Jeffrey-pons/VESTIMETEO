import { weatherController } from '../controllers/weather.controllers.js';
import { Router } from "express";
const initWeatherRoutes = (app, sm, jwt) => {
    const router = Router();
    router.get('/:city', weatherController.getWeatherData);
    app.use("/weathers", router);
};
export default initWeatherRoutes;
