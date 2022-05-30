import { CustomError } from "@everlast-brands/error-handling";
import { Request } from "express";
import { RectifyOperator } from "rectifyjs";

/**
 * Validate JWT
 */
export default async function isValidJWT(req: Request, res, next) {
  const token = req.body.token;
  let tokenDetails;
  try {
    const response = await req.db.tables.tokens.getWithQuery(
      "token",
      RectifyOperator.EQ,
      token
    );
    tokenDetails = response._responses[0].r[0];
    next();
  } catch (err: any) {
    throw new CustomError(
      "InvalidJWTError",
      err?.message || "Invalid JWT",
      400
    );
  }
}
