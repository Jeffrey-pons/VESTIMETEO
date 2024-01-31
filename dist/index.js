import { errorMiddleware } from './src/middlewares/error.middleware.js';
import express from "express";
import cors from "cors";
import MongoDb from "./src/config/db.js";
import dotenv from "dotenv";
import NodeCache from "node-cache";
import rateLimitMiddleware from "./src/middlewares/rate.limiter.js";
import initRoutes from "./src/routes/routes.js";
import initMiddlewares from "./src/middlewares/init.middleware.js";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./src/config/swagger.js";
import { collectDefaultMetrics } from 'prom-client';
import { metricsMiddleware } from "./src/services/metrics.services.js";
import { cacheMiddleware } from './src/middlewares/cache.middleware.js';
collectDefaultMetrics();
dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();
// Rate Limiter
app.use(rateLimitMiddleware);
app.use(express.json({ limit: "500mb" }));
app.use(cors());
// Gestion du cache
const Cache = new NodeCache();
app.use(cacheMiddleware);
// Route metrics & cache
app.get('/metrics', metricsMiddleware);
app.get('/view-cache', (req, res) => {
    const cacheContent = Cache.keys().map(key => ({
        key,
        value: Cache.get(key)
    }));
    res.status(200).json(cacheContent);
});
//Mongo DB
await MongoDb();
// //middlewares
initMiddlewares(app);
//routes
initRoutes(app);
// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Gestion des erreurs 
app.use(errorMiddleware);
export { Cache };
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
