import { Router } from "express";
import create from "../controllers/encrypted/create";
import getData from "../controllers/encrypted/getData";
import verify from "../controllers/encrypted/verify";

const EncryptedRouter = Router();

EncryptedRouter.get("/data/:id", getData);
EncryptedRouter.post("/", create);
EncryptedRouter.post("/verify", verify);

export default EncryptedRouter;
