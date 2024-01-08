import prometheus from 'prom-client';

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

const httpRequestErrorsTotal = new prometheus.Counter({
  name: 'http_request_errors_total',
  help: 'Total number of HTTP request errors',
  registers: [register],
});

const cpuUsagePercentage = new prometheus.Gauge({
  name: 'cpu_usage_percentage',
  help: 'CPU usage percentage',
  registers: [register],
});

const memoryUsageBytes = new prometheus.Gauge({
  name: 'memory_usage_bytes',
  help: 'Memory usage in bytes',
  registers: [register],
});

// Métriques personnalisées
const customCounter = new prometheus.Counter({
  name: 'custom_counter_total',
  help: 'Total number of custom events',
  registers: [register],
});

const customOperationsTotal = new prometheus.Counter({
  name: 'custom_operations_total',
  help: 'Total number of custom operations',
  registers: [register],
});

const customProcessingDurationSeconds = new prometheus.Histogram({
  name: 'custom_processing_duration_seconds',
  help: 'Custom processing duration in seconds',
  registers: [register],
});

const userRegistrationsTotal = new prometheus.Histogram({
  name: 'user_registrations_total',
  help: 'Total number of user registrations',
  registers: [register],
});

const userLoginsTotal = new prometheus.Counter({
  name: 'user_logins_total',
  help: 'Total number of user logins',
  registers: [register],
});

const cityWeatherRequestsTotal = new prometheus.Counter({
  name: 'city_weather_requests_total',
  help: 'Total number of city weather information requests',
  registers: [register],
});

// Fonction pour incrémenter le compteur personnalisé
function incrementCustomCounter() {
  customCounter.inc();
}

function incrementCityWeatherRequests() {
    cityWeatherRequestsTotal.inc();
  }  

// Middleware Express pour exporter les métriques
function metricsMiddleware(req: any, res: any, next: any) {
  res.set('Content-Type', register.contentType);
  register.metrics().then((metrics) => {
    res.end(metrics);
  });
}

export {
    httpRequestTotal,
    httpRequestDurationSeconds,
    cityWeatherRequestsTotal,
    incrementCustomCounter,
    metricsMiddleware,
    incrementCityWeatherRequests
  };