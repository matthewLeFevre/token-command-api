import { Router } from "express";
import create from "../controllers/stateless/create";
import getData from "../controllers/stateless/getData";
import revoke from "../controllers/stateless/revoke";
import verify from "../controllers/stateless/verify";

const StatelessRouter = Router();

StatelessRouter.post("/", create);
StatelessRouter.post("/data", getData);
StatelessRouter.post("/verify", verify);
StatelessRouter.post("/revoke", revoke);

export default StatelessRouter;
