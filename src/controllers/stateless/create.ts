import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { randomUUID } from "crypto";
import { Request } from "express";
import { body} from "express-validator";
import validationCheck from "../../middleware/validationCheck";
import { StatelessToken, TokenType } from "../../models/token";

const validation = [
  body("data").exists(),
  body("expiresIn").optional().isNumeric(),
  body("userId").optional(),
  body("appId").optional(),
  validationCheck,
];

async function action(req: Request, res) {
  const { data, expiresIn, userId, appId } = req.body;

  const token: StatelessToken = {
    data,
    token: randomUUID(),
    type: TokenType.Stateless,
    expireTime: Date.now() + expiresIn
  };

  if (userId) token.userId = userId;
  if (appId) token.appId = appId;

  const id = await req.db.tables.tokens.create(token);
  const newToken = await req.db.tables.tokens.getWithId(id);
  send({ res, data: { token: newToken.token } });
}

const create = [...validation, asyncWrapper(action)];

export default create;
