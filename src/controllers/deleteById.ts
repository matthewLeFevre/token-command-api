import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";

async function action(req: Request, res) {
  const result: any = await req.db.tables.tokens.deleteWithId(req.params.id);
  send({ res, data: result });
}

const deleteById = [asyncWrapper(action)];

export default deleteById;
