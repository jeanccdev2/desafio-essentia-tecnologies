import { HttpException } from "./http.exception.js";

export class BadRequestException extends HttpException {
  constructor(message: string, error?: Error | undefined) {
    super(400, message, error);
  }
}
