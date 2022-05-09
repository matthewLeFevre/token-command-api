import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import { body } from "express-validator";
import validationCheck from "../../middleware/validationCheck";

const validation = [body("token").exists(), validationCheck];

async function action(req: Request, res) {
  const data = await req.jwt.getPayload(req.body.token);
  send({ res, data });
}

const getData = [...validation, asyncWrapper(action)];

export default getData;
