import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from 'swagger-ui-express';
import { specs } from "./swagger";
import DefaultRoute from './routes/default';

export const InitApp = () => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(helmet({
    contentSecurityPolicy: false,
    xDownloadOptions: false,
  }));
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type"],
    })
  );
  
  app.use('/', swaggerUi.serve, swaggerUi.setup(specs));
  app.use("/api", DefaultRoute);
  
  return app;
};
