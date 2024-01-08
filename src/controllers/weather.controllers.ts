import { Request, Response } from 'express';
import { getWeatherData, getWeatherAdvice } from '../clients/weather.clients.js';

import {
  cityWeatherRequestsTotal,
  incrementCityWeatherRequests,
} from "../services/metrics.services.js";


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
 *         description: Donnée de l'api Open Weather bien récuperé.
 *       '500':
 *         description: Erreur interne du serveur, veuillez réessayer plus
 */
let totalWeatherRequests = 0;

export const weatherController = {
  getWeatherData: async (req: Request, res: Response): Promise<void> => {
    const cityName = req.params.city as string;
    try {

      totalWeatherRequests++;
      const weatherAdvice = await getWeatherAdvice(cityName);
      incrementCityWeatherRequests();

      if (weatherAdvice) {
        res.json(weatherAdvice);
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

