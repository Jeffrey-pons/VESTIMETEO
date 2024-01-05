import { weatherController } from '../controllers/weather.controllers.js';
import {Router} from "express" 

const initWeatherRoutes = (app: any, sm: any, jwt: any) => {

    const router = Router();

    router.get('/:city', weatherController.getWeatherData);
    app.use("/weathers", router);
 }


export default initWeatherRoutes