import { HttpException } from "./http.exception.js";

export class NotFoundException extends HttpException {
  constructor(message: string, error?: Error | undefined) {
    super(404, message, error);
  }
}
