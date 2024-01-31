import { getWeatherAdvice, getWeatherForecast, getCoordinatesByCityName, getAirPollutionData } from '../clients/weather.clients.js';
import { WeatherInfo, AirPollutionInfo } from '../models/weather.models.js';
import { ManagementError } from '../utils/managementError.utils.js';
import { incrementCityWeatherRequests, incrementCityAirPollutionRequests, incrementCityWeatherForecastRequests } from "../services/metrics.services.js";
/**
 * @swagger
 * tags:
 *   name: Weather
 *   description: Endpoints for weather information
 */
// Variable de compteur, non déclaré, enlever du eslint
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let totalWeatherRequests = 0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let totalWeatherForecastRequests = 0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let totalWeatherAirPollutionRequests = 0;
export const weatherController = {
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
    getWeatherData: async (req, res) => {
        const cityName = req.params.city;
        try {
            totalWeatherRequests++;
            const weatherAdvice = await getWeatherAdvice(cityName);
            incrementCityWeatherRequests();
            if (weatherAdvice) {
                res.json(weatherAdvice);
            }
            else {
                throw new ManagementError(500, 'Les informations n ont pas été correctement récupérées');
            }
        }
        catch (error) {
            throw new ManagementError(500, 'Erreur interne du serveur');
        }
    },
    /**
  * @swagger
  *
  * /weathers/forecast/{city}:
  *   get:
  *     summary: Get the five-day weather forecast for a specific city.
  *     tags: [Weather]
  *     parameters:
  *       - in: path
  *         name: city
  *         required: true
  *         description: The name of the city for which the weather forecast is requested.
  *         schema:
  *           type: string
  *     responses:
  *       '200':
  *         description: Weather forecast successfully retrieved.
  *       '500':
  *         description: Internal server error, please try again later.
  *
  * @param {Request} req - L'objet de requête Express.
  * @param {Response} res - L'objet de réponse Express.
  * @returns {Promise<void>}
  */
    getWeatherForecast: async (req, res) => {
        const cityName = req.params.city;
        try {
            totalWeatherForecastRequests++;
            const forecastData = await getWeatherForecast(cityName);
            incrementCityWeatherForecastRequests();
            if (forecastData) {
                const forecastInfo = forecastData.map((data) => new WeatherInfo(cityName, data, data.dt_txt));
                res.json(forecastInfo);
            }
            else {
                throw new ManagementError(500, 'Les informations n ont pas été correctement récupérées');
            }
        }
        catch (error) {
            throw new ManagementError(500, 'Erreur interne du serveur');
        }
    },
    /**
 * @swagger
 *
 * /weathers/air-pollution/{city}:
 *   get:
 *     summary: Get air pollution data for a specific city.
 *     tags: [Weather]
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         description: The name of the city for which air pollution data is requested.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Air pollution data successfully retrieved.
 *       '404':
 *         description: Coordinates not found for the specified city.
 *       '500':
 *         description: Internal server error, please try again later.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
    getAirPollution: async (req, res) => {
        const cityName = req.params.city;
        try {
            totalWeatherAirPollutionRequests++;
            const coordinates = await getCoordinatesByCityName(cityName);
            incrementCityAirPollutionRequests();
            if (!coordinates) {
                throw new ManagementError(404, 'Coordonnées introuvables pour la ville spécifiée');
            }
            const airPollutionData = await getAirPollutionData(coordinates.lat, coordinates.lon);
            if (airPollutionData) {
                const airPollutionInfoArray = airPollutionData.list.map(({ dt, main, components }) => new AirPollutionInfo(cityName, { coord: coordinates, list: [{ dt, main, components }] }));
                res.json({ city: cityName, airQuality: airPollutionInfoArray });
            }
            else {
                throw new ManagementError(500, 'Les informations n ont pas été correctement récupérées');
            }
        }
        catch (error) {
            throw new ManagementError(500, 'Erreur interne du serveur');
        }
    },
};
