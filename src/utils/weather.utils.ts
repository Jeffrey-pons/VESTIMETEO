import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

export const getWeatherData = async (city: string) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getWeatherAdvice = async (city: string) => {
  const weatherData = await getWeatherData(city);

  // Ici, vous définirez la logique pour traduire les données météo en conseils vestimentaires
  const advice = "Conseils vestimentaires en fonction de la météo";

  return { weatherData, advice };
};