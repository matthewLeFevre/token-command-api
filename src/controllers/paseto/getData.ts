import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";

async function action(req: Request, res) {
  send({ res });
}

const getData = [asyncWrapper(action)];

export default getData;
