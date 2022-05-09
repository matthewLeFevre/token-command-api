import { Router } from "express";
import create from "../controllers/paseto/create";
import getData from "../controllers/paseto/getData";
import verify from "../controllers/paseto/verify";

const PASETORouter = Router();

PASETORouter.get("/data/:id", getData);
PASETORouter.post("/", create);
PASETORouter.post("/verify", verify);

export default PASETORouter;
