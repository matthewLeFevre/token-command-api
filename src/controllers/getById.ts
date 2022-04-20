import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";

async function action(req: Request, res) {
  const token = await req.db.tables.tokens.getWithId(req.params.id);
  send({ res, data: token });
}

const getById = [asyncWrapper(action)];

export default getById;
