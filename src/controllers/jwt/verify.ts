import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import { body } from "express-validator";
import validationCheck from "../../middleware/validationCheck";

const validation = [body("token").exists(), validationCheck];

async function action(req: Request, res) {
  const result = await req.jwt.verify(req.body.token);
  send({ res, data: result });
}

const verify = [...validation, asyncWrapper(action)];

export default verify;
