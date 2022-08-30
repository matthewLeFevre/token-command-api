import { asyncWrapper, CustomError, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import { body } from "express-validator";
import isValidJWT from "../../middleware/isValidJWT";
import validationCheck from "../../middleware/validationCheck";

const validation = [body("token").exists(), validationCheck];

async function action(req: Request, res) {
  try {
    await req.jwt.verify(req.body.token);
    send({ res, message: "Token is valid." });
  } catch(err: any) {
    throw new CustomError("InvalidTokenError", err.message || "Invalid Token.", 400);
  }
}

const verify = [...validation, asyncWrapper(isValidJWT), asyncWrapper(action)];

export default verify;
