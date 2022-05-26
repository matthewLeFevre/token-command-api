import { Router } from "express";
import create from "../controllers/jwt/create";
import getData from "../controllers/jwt/getData";
import revoke from "../controllers/jwt/revoke";
import verify from "../controllers/jwt/verify";

const JWTRouter = Router();

JWTRouter.post("/", create);
JWTRouter.post("/data", getData);
JWTRouter.post("/verify", verify);
JWTRouter.delete("/revoke/:tokenId", revoke);

export default JWTRouter;
