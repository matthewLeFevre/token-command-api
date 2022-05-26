import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import { body } from "express-validator";
import isValidStatelessToken from "../../middleware/isValidStatelessToken";
import validationCheck from "../../middleware/validationCheck";

const validation = [body("token").exists(), validationCheck];

async function action(req: Request, res) {
  send({ res, data: req.tokenDetails.data });
}

const getData = [...validation, asyncWrapper(isValidStatelessToken), asyncWrapper(action)];

export default getData;
