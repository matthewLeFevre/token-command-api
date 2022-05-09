import { SecureJwt } from "@everlast-brands/secure-jwt";
import Rectify from "rectifyjs";

declare global {
  namespace Express {
    interface Request {
      db: Rectify;
      jwt: SecureJwt;
    }
  }
}
