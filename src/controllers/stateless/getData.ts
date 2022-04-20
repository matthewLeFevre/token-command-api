import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import { body } from "express-validator";
import { RectifyOperator } from "rectifyjs";
import validationCheck from "../../middleware/validationCheck";

const validation = [body("token").exists(), validationCheck];

async function action(req: Request, res) {
  const { token } = req.body;

  const { _responses } = await req.db.tables.tokens.getWithQuery(
    "token",
    RectifyOperator.EQ,
    token
  );

  send({ res, data: _responses[0].r[0].data });
}

const getData = [...validation, asyncWrapper(action)];

export default getData;
