import { Router } from "express";
import create from "../controllers/plain/create";
import getData from "../controllers/plain/getData";
import verify from "../controllers/plain/verify";

const PlainRouter = Router();

PlainRouter.get("/data/:id", getData);
PlainRouter.post("/", create);
PlainRouter.post("/verify", verify);

export default PlainRouter;
