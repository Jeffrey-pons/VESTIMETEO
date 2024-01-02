import express from "express";
import cors from "cors";
import MongoDb from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json({ limit: "500mb" }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

//Mongo DB
await MongoDb();

// //middlewares
// initMiddlewares(app);

// //routes
// initRoutes(app);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
