import { Request } from "express";
import extractToken from "../utilities/extractToken";

export default function verifyAccess(req: Request, res, next) {
  const token = extractToken(req.headers);
  if (
    token !== process.env.ADMIN_APP_KEY ||
    req.query.appId !== process.env.ADMIN_APP_ID
  )
    throw new Error("Unauthorized access");
  next();
}
