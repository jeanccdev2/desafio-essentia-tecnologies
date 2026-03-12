import type { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils/api-response.util.js";
import type { ApiResponseInterface } from "../utils/api-response.util.js";

export function apiResponseWrapperMiddleware(_req: Request, res: Response, next: NextFunction) {
  function apiResponse<T>(status: number, message: string, data?: T) {
    const payload: ApiResponseInterface<T> = { status, message };

    if (data !== undefined) {
      payload.data = data;
    }

    const response = new ApiResponse<T>(payload);
    return res.status(status).json(response.getResponse());
  }

  res.apiResponseOk = <T>(message: string, data?: T) => apiResponse(200, message, data);
  res.apiResponseCreated = <T>(message: string, data?: T) => apiResponse(201, message, data);

  return next();
}
