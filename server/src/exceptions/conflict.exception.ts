import { HttpException } from "./http.exception.js";

export class ConflictException extends HttpException {
  constructor(message: string, error?: Error | undefined) {
    super(409, message, error);
  }
}
