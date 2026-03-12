import { IsNumber, Max, Min } from "class-validator";
import type { PaginatedResponse } from "../types/pagination.type.js";

export class PaginationParamsDTO {
  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsNumber()
  @Min(1)
  @Max(100)
  limit: number = 25;

  get offset(): number {
    return (this.page - 1) * this.limit;
  }
}

export class PaginatedResponseDTO<T> implements PaginatedResponse<T> {
  data: T[];
  pagination: {
    totalItems: number;
    totalPages: number;
  };

  constructor(data: T[], limit: number, total: number) {
    this.data = data;
    this.pagination = {
      totalItems: total,
      totalPages: Math.ceil(total / limit),
    };
  }
}
