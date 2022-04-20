import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { randomUUID } from "crypto";
import { Request } from "express";
import { body, oneOf } from "express-validator";
import validationCheck from "../../middleware/validationCheck";
import { StatelessToken, TokenType } from "../../models/token";

const validation = [
  body("data").exists(),
  oneOf([body("time").exists(), body("date").exists()]),
  body("userId").optional(),
  body("appId").optional(),
  validationCheck,
];

async function action(req: Request, res) {
  const { data, time, date, userId, appId } = req.body;

  let expireTime = 0;

  if (!time && !date) {
    let d = new Date();
    d.setDate(d.getDate() + 30);
    expireTime = d.getTime();
  }

  if (time && !date) expireTime = Date.now() + time;

  if (!time && date) expireTime = date;

  const token: StatelessToken = {
    data,
    token: randomUUID(),
    type: TokenType.Stateless,
    expireTime,
  };

  if (userId) token.userId = userId;
  if (appId) token.appId = appId;

  const id = await req.db.tables.tokens.create(token);

  send({ res, data: { id } });
}

const create = [...validation, asyncWrapper(action)];

export default create;
