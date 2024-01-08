import { WeatherInfo } from '../models/weather.models.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();
// Récupération donnée API open weather
export const getWeatherData = async (city) => {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(apiUrl);
        const weatherData = await response.json();
        return weatherData;
    }
    catch (error) {
        console.error(error);
        return undefined;
    }
};
export const getWeatherAdvice = async (city) => {
    const weatherData = await getWeatherData(city);
    return new WeatherInfo(city, weatherData);
};
