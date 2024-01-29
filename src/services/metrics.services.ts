import prometheus from 'prom-client';
import { Request, Response} from 'express';

// Collecte automatique des métriques par défaut
const collectDefaultMetrics = prometheus.collectDefaultMetrics;

// Créez un objet pour enregistrer vos métriques
const register = new prometheus.Registry();
collectDefaultMetrics({ register });

// Métriques génériques
const httpRequestTotal = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  registers: [register],
});

const httpRequestDurationSeconds = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  registers: [register],
});







// Métriques personnalisées
const customCounter = new prometheus.Counter({
  name: 'custom_counter_total',
  help: 'Total number of custom events',
  registers: [register],
});





const userRegistrationsTotal = new prometheus.Histogram({
  name: 'user_registrations_total',
  help: 'Total number of user registrations',
  registers: [register],
});



const cityWeatherRequestsTotal = new prometheus.Counter({
  name: 'city_weather_requests_total',
  help: 'Total number of city weather information requests',
  registers: [register],
});

const cityWeatherForecastRequestsTotal = new prometheus.Counter({
  name: 'city_weather_forecast_requests_total',
  help: 'Total number of city weather forecast requests',
  registers: [register],
});

const cityAirPollutionRequestsTotal = new prometheus.Counter({
  name: 'city_air_pollution_requests_total',
  help: 'Total number of city air pollution information requests',
  registers: [register],
});

// Fonction pour incrémenter le compteur personnalisé
function incrementCustomCounter() {
  customCounter.inc();
}

// Fonction pour incrémenter le compteur de prévisions météo
function incrementCityWeatherRequests() {
  cityWeatherRequestsTotal.inc();
}

// Fonction pour incrémenter le compteur de prévisions météo
function incrementCityWeatherForecastRequests() {
  cityWeatherForecastRequestsTotal.inc();
}

// Fonction pour incrémenter le compteur de pollution de l'air
function incrementCityAirPollutionRequests() {
  cityAirPollutionRequestsTotal.inc();
}

// Middleware Express pour exporter les métriques
function metricsMiddleware(req: Request, res: Response) {
  res.set('Content-Type', register.contentType);
  register.metrics().then((metrics) => {
    res.end(metrics);
  });
}

export {
  httpRequestTotal,
  httpRequestDurationSeconds,
  cityWeatherRequestsTotal,
  userRegistrationsTotal,
  cityWeatherForecastRequestsTotal,
  cityAirPollutionRequestsTotal,
  incrementCustomCounter,
  metricsMiddleware,
  incrementCityWeatherRequests,
  incrementCityWeatherForecastRequests,
  incrementCityAirPollutionRequests
};
