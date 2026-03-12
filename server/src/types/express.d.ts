import type { UserResponse } from "./user.type.ts";

declare global {
  namespace Express {
    interface Request {
      user: UserResponse;
    }

    interface Response {
      apiResponseOk: <T>(message: string, data?: T) => Response;
      apiResponseCreated: <T>(message: string, data?: T) => Response;
    }
  }
}
