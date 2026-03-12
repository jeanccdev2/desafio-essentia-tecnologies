import { HttpException } from "./http.exception.js";

export class UnauthorizedException extends HttpException {
  constructor(message: string, error?: Error | undefined) {
    super(401, message, error);
  }
}
