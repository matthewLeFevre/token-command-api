import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { SecureJwt } from "@everlast-brands/secure-jwt";
import { Request, Router } from "express";

const TokenRouter = Router();

TokenRouter.get(
  "/",
  asyncWrapper(async (req, res) => {
    const tokens = await req.db.tables.tokens.getAll();
    send({ res, data: tokens });
  })
);
TokenRouter.get(
  "/:id",
  asyncWrapper(async (req, res) => {})
);
TokenRouter.post(
  "/jwt-encrypted",
  asyncWrapper(async (req: Request, res) => {
    const jwt = new SecureJwt("1234", 60);
    const { ttl, data, type, appId, userId, encrypted } = req.body;
    const token = await jwt.sign(data, ttl);
    console.log(token);
    const tokenRecord = {
      type: type || null,
      appId: appId || null,
      userId: userId || null,
      encrypted: encrypted || false,
      token,
    };
    await req.db.tables.tokens.create(tokenRecord);
    send({ res });
  })
);
TokenRouter.post(
  "/verify",
  asyncWrapper(async (req, res) => {})
);
TokenRouter.post(
  "/revoke",
  asyncWrapper(async (req, res) => {})
);
TokenRouter.post(
  "/data",
  asyncWrapper(async (req, res) => {})
);

export default TokenRouter;
