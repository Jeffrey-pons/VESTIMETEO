import { getTemperatureAdvice, getWeatherConditionAdvice } from "../services/weather.conditions.service.js";
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
    if (!weatherData) {
        console.error('Aucune donnée météorologique disponible.');
        return { error: 'Aucune donnée météorologique disponible.' };
    }
    // class constructor
    const temperature = weatherData.main.temp;
    const temperatureMin = weatherData.main.temp_min;
    const temperatureMax = weatherData.main.temp_max;
    const feelsLike = weatherData.main.feels_like;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const windDeg = weatherData.wind.deg;
    const weatherCondition = weatherData.weather[0].main;
    const weatherConditionDescription = weatherData.weather[0].description;
    // appel des deux methodes dans le service 
    const temperatureAdvice = getTemperatureAdvice(temperature);
    const weatherConditionAdvice = getWeatherConditionAdvice(weatherCondition);
    //class
    const response = {
        temperature: `Température à ${city}: ${temperature} °C`,
        temperatureMin: `${temperatureMin} °C`,
        temperatureMax: `${temperatureMax} °C`,
        feelsLike,
        humidity,
        windSpeed,
        windDeg,
        weatherCondition,
        weatherConditionDescription,
        temperatureAdvice,
        weatherConditionAdvice,
        logMessages: [
            `Conditions météorologiques à ${city}: ${weatherCondition}`,
            'Conseils de température: ' + temperatureAdvice,
            'Conseils météorologiques: ' + weatherConditionAdvice,
        ],
    };
    return response;
};
