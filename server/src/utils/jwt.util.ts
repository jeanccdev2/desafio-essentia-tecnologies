import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

type JwtPayload = {
  sub: string;
};

export class JwtUtil {
  static sign(payload: JwtPayload) {
    return jwt.sign(payload, ENV.JWT_SECRET);
  }

  static verify(token: string) {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as JwtPayload;
    return decoded.sub;
  }
}
