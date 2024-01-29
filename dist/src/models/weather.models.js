import { getTemperatureAdvice, getWeatherConditionAdvice } from "../services/weather.conditions.services.js";
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
    constructor(city, weatherData, dateTxt) {
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
        }
        else {
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
            const weatherCondition = weatherData.weather[0].main;
            const weatherConditionAdvice = getWeatherConditionAdvice(weatherCondition);
            this.temperatureAdvice = `Conseil de température : ${temperatureAdvice}`;
            this.weatherConditionAdvice = `Conseil de conditions météorologiques : ${weatherConditionAdvice}`;
        }
    }
    formatDate(dateTxt) {
        return genericFormatDate(dateTxt);
    }
}
/**
 * @swagger
 * components:
 *   schemas:
 *     AirPollutionInfo:
 *       type: object
 *       properties:
 *         cityName:
 *           type: string
 *         date:
 *           type: string
 *         airQualityIndex:
 *           type: string
 *         coConcentration:
 *           type: string
 *         noConcentration:
 *           type: string
 *         no2Concentration:
 *           type: string
 *         o3Concentration:
 *           type: string
 *         so2Concentration:
 *           type: string
 *         pm2_5Concentration:
 *           type: string
 *         pm10Concentration:
 *           type: string
 *         nh3Concentration:
 *           type: string
 *       required:
 *         - cityName
 *         - date
 *         - airQualityIndex
 *         - coConcentration
 *         - noConcentration
 *         - no2Concentration
 *         - o3Concentration
 *         - so2Concentration
 *         - pm2_5Concentration
 *         - pm10Concentration
 *         - nh3Concentration
 */
export class AirPollutionInfo {
    constructor(cityName, airPollutionData) {
        const { list } = airPollutionData;
        const [{ dt, main, components }] = list;
        this.cityName = `Vous regardez la pollution atmosphérique de la ville de ${cityName}`;
        this.date = `Le ${genericFormatDate(dt)}`;
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
function genericFormatDate(dateTxt) {
    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    };
    let formattedDate;
    const date = typeof dateTxt === 'number' ? new Date(dateTxt * 1000) : new Date(dateTxt);
    if (isNaN(date.getTime())) {
        formattedDate = new Date().toLocaleDateString('fr-FR', options);
    }
    else {
        formattedDate = date.toLocaleDateString('fr-FR', options);
    }
    return formattedDate;
}
