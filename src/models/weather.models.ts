import { getTemperatureAdvice, getWeatherConditionAdvice } from "../services/weather.conditions.services.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     WeatherData:
 *       type: object
 *       properties:
 *         main:
 *           type: object
 *           properties:
 *             temp:
 *               type: number
 *             temp_min:
 *               type: number
 *             temp_max:
 *               type: number
 *             feels_like:
 *               type: number
 *             humidity:
 *               type: number
 *           required:
 *             - temp
 *             - temp_min
 *             - temp_max
 *             - feels_like
 *             - humidity
 *         wind:
 *           type: object
 *           properties:
 *             speed:
 *               type: number
 *             deg:
 *               type: number
 *           required:
 *             - speed
 *             - deg
 *         weather:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               main:
 *                 type: string
 *               description:
 *                 type: string
 *           required:
 *             - main
 *             - description
 *         dt_txt:
 *           type: string
 *       required:
 *         - main
 *         - wind
 *         - weather
 *         - dt_txt
 */

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
  dt_txt: string;
}

export interface AirPollutionData {
  coord: {
    lat: number;
    lon: number;
  };
  list: {
    dt: number; 
    main: {
      aqi: number; 
    };
    components: {
      co: number; 
      no: number; 
      no2: number; 
      o3: number; 
      so2: number; 
      pm2_5: number; 
      pm10: number; 
      nh3: number; 
    };
  }[];
}

/**
 * @swagger
 * components:
 *   schemas:
 *     WeatherInfo:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *         temperature:
 *           type: string
 *         temperatureMin:
 *           type: string
 *         temperatureMax:
 *           type: string
 *         feelsLike:
 *           type: string
 *         humidity:
 *           type: string
 *         windSpeed:
 *           type: string
 *         weatherCondition:
 *           type: string
 *         weatherConditionDescription:
 *           type: string
 *         temperatureAdvice:
 *           type: string
 *         weatherConditionAdvice:
 *           type: string
 *       required:
 *         - date
 *         - temperature
 *         - temperatureMin
 *         - temperatureMax
 *         - feelsLike
 *         - humidity
 *         - windSpeed
 *         - weatherCondition
 *         - weatherConditionDescription
 *         - temperatureAdvice
 *         - weatherConditionAdvice
 */

export class WeatherInfo {
  date: string;
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

  constructor(city: string, weatherData: WeatherData | undefined, dateTxt: string) {
    if (!weatherData) {
      this.temperature = 'N/A';
      this.temperatureMin = 'N/A';
      this.temperatureMax = 'N/A';
      this.feelsLike = 'N/A';
      this.humidity = 'N/A';
      this.windSpeed = 'N/A';
      this.weatherCondition = 'N/A';
      this.weatherConditionDescription = 'N/A';
      this.temperatureAdvice = 'Erreur lors de la récupération des données météorologiques.';
      this.weatherConditionAdvice = 'Aucune donnée météorologique disponible.';
      this.date = "N/A";
    } else {
      this.date = `Le ${this.formatDate(dateTxt)}`;
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
  
// Formatage de la date renvoyée
  private formatDate(dateTxt: string): string {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    };
  
    let formattedDate: string;
  // Vérification de la validité de la date
    const date = new Date(dateTxt);
    if (isNaN(date.getTime())) {
      formattedDate = new Date().toLocaleDateString('fr-FR', options);
    } else {
      formattedDate = date.toLocaleDateString('fr-FR', options);
    }
    return formattedDate;
  }
  
}

export class AirPollutionInfo {
  cityName: string;
  date: number;
  airQualityIndex: string;
  coConcentration: string;
  noConcentration: string;
  no2Concentration: string;
  o3Concentration: string;
  so2Concentration: string;
  pm2_5Concentration: string;
  pm10Concentration: string;
  nh3Concentration: string;

  constructor(cityName: string, airPollutionData: any) {
    const { list } = airPollutionData;
    const [{ main, components }] = list;

    this.cityName = `Vous regardez la pollution atmosphérique de la ville de ${cityName}`;
    this.date = list.dt;
    this.airQualityIndex = `L'indice de qualité de l'air est de ${main.aqi} sur 5. Où 1 = Très Bon, 2 = Bon, 3 = Modéré, 4 = Mauvais, 5 = Très mauvais.`;
    this.coConcentration = `La concentration de CO (Monoxyde de carbone) est de ${components.co} μg/m³.`;
    this.noConcentration = `La concentration de NO (Monoxyde d'azote)est de ${components.no} μg/m³.`;
    this.no2Concentration = `La concentration de NO2 (Dioxyde d'azote)est de ${components.no2} μg/m³.`;
    this.o3Concentration = `La concentration de O3 (Ozone) est de ${components.o3} μg/m³.`;
    this.so2Concentration = `La concentration de SO2 (Dioxyde de soufre) est de ${components.so2} μg/m³.`;
    this.pm2_5Concentration = `La concentration de PM2.5 (matière de particules fines) est de ${components.pm2_5} μg/m³.`;
    this.pm10Concentration = `La concentration de PM10 (particules grossières) est de ${components.pm10} μg/m³.`;
    this.nh3Concentration = `La concentration de NH3 (ammoniac) est de ${components.nh3} μg/m³.`;
  }
}