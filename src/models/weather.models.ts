import { getTemperatureAdvice, getWeatherConditionAdvice } from "../services/weather.conditions.services.js";

export interface WeatherData {
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      feels_like: number;
      humidity: number;
    };
    wind: {
      speed: number;
      deg: number;
    };
    weather: {
      main: string;
      description: string;
    }[];
  }
  
  export class WeatherInfo {
    temperature: string;
    temperatureMin: string;
    temperatureMax: string;
    feelsLike: string;
    humidity: string;
    windSpeed: string;
    weatherCondition: string;
    weatherConditionDescription: string;
    temperatureAdvice: string;
    weatherConditionAdvice: string;
  
    constructor(city: string, weatherData: WeatherData | undefined) {
      if (!weatherData) {
        this.temperature = 'N/A';
        this.temperatureMin = 'N/A';
        this.temperatureMax = 'N/A';
        this.feelsLike = 'N/A';
        this.humidity = 'N/A';
        this.windSpeed = 'N/A';
        this.weatherCondition = 'N/A';
        this.weatherConditionDescription = 'N/A';
        this.temperatureAdvice = 'Aucune donnée météorologique disponible.';
        this.weatherConditionAdvice = 'Aucune donnée météorologique disponible.';
      } else {
        this.temperature = `La température à ${city} est de ${weatherData.main.temp} °C`;
        this.temperatureMin = `La température minimale est de ${weatherData.main.temp_min} °C`;
        this.temperatureMax = `La température maximale est de ${weatherData.main.temp_max} °C`;
        this.feelsLike = `Le ressenti est de ${weatherData.main.feels_like} °C`;
        this.humidity = `L'humidité est de ${weatherData.main.humidity} %`;
        this.windSpeed = `La vitesse du vent est de ${weatherData.wind.speed} m/s`;
        this.weatherCondition = `Les conditions météorologiques sont actuellement :  ${weatherData.weather[0].main}`;
        this.weatherConditionDescription = weatherData.weather[0].description;
  
        const temperatureAdvice = getTemperatureAdvice(weatherData.main.temp);
        const weatherConditionAdvice = getWeatherConditionAdvice(weatherData.weather[0].main);
  
        this.temperatureAdvice = `Conseil de température : ${temperatureAdvice}`;
        this.weatherConditionAdvice = `Conseil de conditions météorologiques : ${weatherConditionAdvice}`;
      }
    }
  }
  