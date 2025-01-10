import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import helmet from "helmet";

export const InitApp = () => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(helmet())
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type"],
    })
  );

  app.get("/", (req, res) => {
    res.send("APARTU");
  });

  return app;
};
