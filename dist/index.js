import express from "express";
import cors from "cors";
import MongoDb from "./src/config/db.js";
import dotenv from "dotenv";
import rateLimitMiddleware from "./src/middlewares/rate.limiter.js";
import initRoutes from "./src/routes/routes.js";
import initMiddlewares from "./src/middlewares/init.middleware.js";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./src/config/swagger.js";
dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json({ limit: "500mb" }));
app.use(cors());
app.use(express.json());
app.use(rateLimitMiddleware);
//Mongo DB
await MongoDb();
// //middlewares
initMiddlewares(app);
//routes
initRoutes(app);
// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
