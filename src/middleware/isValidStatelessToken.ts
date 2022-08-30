import { CustomError } from "@everlast-brands/error-handling";
import { Request } from "express";
import { RectifyOperator } from "rectifyjs";

export default async function isValidStatelessToken(req: Request, res, next) {
  const dbResponse = await req.db.tables.tokens.getWithQuery(
    "token",
    RectifyOperator.EQ,
    req.body.token
  );
  const tokenDetails = dbResponse._responses[0].r[0];
  if (tokenDetails.expireTime < Date.now()) {
    throw new CustomError("ExpiredTokenError", "Token is expired", 400);
  }
  req.tokenDetails = tokenDetails;
  next();
}
