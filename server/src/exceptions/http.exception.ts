export abstract class HttpException {
  public status: number;
  public message: string;
  public error: Error | undefined;

  constructor(status: number, message: string, error: Error | undefined) {
    this.status = status;
    this.message = message;
    this.error = error;
  }
}
