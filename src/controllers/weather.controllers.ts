import { Request, Response } from 'express';
import { getWeatherData } from '../utils/weather.utils.js';


/**
 * @swagger
 * tags:
 *   name: Weather
 *   description: Endpoints for weather information
 */

/**
 * @swagger
 * /weathers/{city}:
 *   get:
 *     summary: Get weather data for a specific city
 *     tags: [Weather]
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         description: The name of the city for which weather data is requested
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with weather data
 *       '500':
 *         description: Internal Server Error
 */

export const weatherController = {
  getWeatherData: async (req: Request, res: Response): Promise<void> => {
    const cityName = req.params.city as string;
    const weatherData = await getWeatherData(cityName);
    res.json(weatherData);
  }
};
