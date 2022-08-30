import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import isValidStatelessToken from "../../middleware/isValidStatelessToken";

async function action(req: Request, res) {
    await req.db.tables.tokens.updateWithId(req.tokenDetails.id, {expireTime: 0})
    send({res});
}

const revoke = [asyncWrapper(isValidStatelessToken), asyncWrapper(action)];

export default revoke;