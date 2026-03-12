/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/http.exception.js";
import { ApiResponse } from "../utils/api-response.util.js";

export function errorHandlerMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof HttpException) {
    const response = new ApiResponse({
      status: err.status,
      message: err.message,
      data: null,
      error: err.error,
    });
    return res.status(err.status).json(response.getResponse());
  }

  const status = 500;
  const message = err instanceof Error ? err.message : "Ocorreu um erro inesperado";

  const response = new ApiResponse({
    status,
    message,
    data: null,
    error: err,
  });

  res.status(status).json(response.getResponse());
}
