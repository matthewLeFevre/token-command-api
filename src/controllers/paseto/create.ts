import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import { body } from "express-validator";
import validationCheck from "../../middleware/validationCheck";

const validation = [
  body("data").exists(),
  body("isEncrypted").exists().isBoolean(),
  body("expiresIn").optional().isNumeric(),
  validationCheck,
];

async function action(req: Request, res) {

  send({ res });
}

const create = [asyncWrapper(action)];

export default create;
