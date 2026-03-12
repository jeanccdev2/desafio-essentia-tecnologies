import type { UserResponse } from "./user.type.ts";

declare global {
  namespace Express {
    interface Request {
      user?: UserResponse;
    }
  }
}
