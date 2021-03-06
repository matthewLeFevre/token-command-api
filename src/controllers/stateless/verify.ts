import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import isValidStatelessToken from "../../middleware/isValidStatelessToken";

async function action(req: Request, res) {
  send({ res, data: {...req.tokenDetails.data, id: req.tokenDetails.id, expireTime: req.tokenDetails.expireTime} });
}

const verify = [asyncWrapper(isValidStatelessToken), asyncWrapper(action)];

export default verify;
