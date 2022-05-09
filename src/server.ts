import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Rectify from "rectifyjs";
import JWTRouter from "./routes/jwt";
import PASETORouter from "./routes/paseto";
import StatelessRouter from "./routes/stateless";
import deleteById from "./controllers/deleteById";
import getById from "./controllers/getById";
import getByUserId from "./controllers/getByUserId";
import getByAppId from "./controllers/getByAppId";
import { SecureJwt } from "@everlast-brands/secure-jwt";
import { DEFAULT_LIVE_TIME } from "./utilities/config";

export default function createServer() {
  dotenv.config();

  const app = express();
  app.use(cors());

  // Performs the same task that body parser does
  app.use(express.json());

  let DB;
  (async function () {
    DB = await Rectify.build({
      db: <string>process.env.RETHINK_DB_NAME,
      host: <string>process.env.RETHINK_DB_HOST,
      port: parseInt(<string>process.env.RETHINK_DB_PORT),
      tableNames: ["tokens"],
    });
  })();
  app.use((req, res, next) => {
    req.db = DB;
    req.jwt = new SecureJwt(process.env.JWT_SECRET, DEFAULT_LIVE_TIME);
    next();
  });

  // App routes
  app.use("/token/jwt", JWTRouter);
  app.use("/token/paseto", PASETORouter);
  app.use("/token/stateless", StatelessRouter);
  app.get("/token/:id", getById);
  app.get("/token/user/:id", getByUserId);
  app.get("/token/app/:id", getByAppId);
  app.delete("/token/:id", deleteById);

  return app;
}
