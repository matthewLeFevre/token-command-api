import { SecureJwt } from "@everlast-brands/secure-jwt";
import Rectify from "rectifyjs";
import { StatelessToken, Token } from "../../src/models/token";

declare global {
  namespace Express {
    interface Request {
      db: Rectify;
      jwt: SecureJwt;
      tokenDetails: StatelessToken;
    }
  }
}
