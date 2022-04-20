import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";

async function action(req: Request, res) {
  send({ res });
}

const getByAppId = [asyncWrapper(action)];

export default getByAppId;
