import { WeatherData, WeatherInfo, AirPollutionData } from '../models/weather.models.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

// Récupération données météos sur le moment présent
export const getWeatherData = async (city: string): Promise<WeatherData | undefined> => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const weatherData = await response.json() as WeatherData;
    return weatherData;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getWeatherAdvice = async (city: string) => {
  const weatherData = await getWeatherData(city);
  return new WeatherInfo(city, weatherData, '');
};

// Récupération données météos sur cinq jours
export const getWeatherForecast = async (city: string): Promise<WeatherData[] | undefined> => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const forecastData : any = await response.json();
    return forecastData.list as WeatherData[];
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

// Récupérer le nom d'une ville par ses données géographique
export const getCoordinatesByCityName = async (city: string): Promise<{ lat: number; lon: number } | undefined> => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data: any = await response.json();

    if (data.length > 0) {
      const { lat, lon } = data[0];
      return { lat, lon };
    }

    return undefined;
  } catch (error) {
    console.error('Error fetching coordinates by city name:', error);
    return undefined;
  }
};

// Récupérer la pollution atmosphérique d'une ville, liée à la fonction au dessus
export const getAirPollutionData = async (lat: number, lon: number): Promise<AirPollutionData | undefined> => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const apiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const airPollutionData = await response.json() as AirPollutionData;
    return airPollutionData;
  } catch (error) {
    console.error('Error fetching air pollution data:', error);
    return undefined;
  }
};

