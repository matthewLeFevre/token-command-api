import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import { param } from "express-validator";
import validationCheck from "../../middleware/validationCheck";

const validation = [
  param("tokenId").exists(),
  validationCheck,
];

async function action(req: Request, res) {
  await req.db.tables.tokens.deleteWithId(req.params.tokenId)
  send({ res, message: "Token Revoked" });
}

const revoke = [...validation, asyncWrapper(action)];

export default revoke;
