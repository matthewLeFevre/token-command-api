import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";

async function action(req: Request, res) {
  send({ res });
}

const revoke = [asyncWrapper(action)];

export default revoke;
