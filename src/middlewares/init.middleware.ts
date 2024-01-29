import cors from "cors";
import express, {Express} from "express";
import helmet from "helmet";

const initMiddlewares = (app: Express) => {
  const corsOrigin = "*";

  const corsOptions = {
    origin: corsOrigin,
  };

  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
};

export default initMiddlewares;
