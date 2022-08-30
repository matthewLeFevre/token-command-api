import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import { body } from "express-validator";
import validationCheck from "../../middleware/validationCheck";
import { StatefulToken, TokenType } from "../../models/token";

const validation = [
  body("data").exists(),
  body("isEncrypted").exists().isBoolean(),
  body("expiresIn").optional().isNumeric(),
  body("userId").optional(),
  body("appId").optional(),
  validationCheck,
];

async function action(req: Request, res) {
  const result = await req.jwt.sign(req.body.data, req.body.expiresIn);
  const tokenRecord: StatefulToken = {
    token: result,
    encrypted: req.body.isEncrypted,
    type: TokenType.JWT,
    expireTime: Date.now() + req.body.expiresIn
  }
  if (req.body.userId) tokenRecord.userId = req.body.userId;
  if (req.body.appId) tokenRecord.appId = req.body.appId;
  const id = await req.db.tables.tokens.create(tokenRecord);

  send({ res, data: {id, ...tokenRecord} });
}

const create = [...validation, asyncWrapper(action)];

export default create;
