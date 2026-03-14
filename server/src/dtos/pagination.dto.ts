import { IsIn, IsNumber, IsOptional, Max, Min } from "class-validator";
import { Type } from "class-transformer";
import type { PaginatedResponse } from "../types/pagination.type.js";
import type { TaskStatus } from "../types/task.type.js";

export class PaginationParamsDTO {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number = 1;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit: number = 25;

  @IsOptional()
  @IsIn(["pending", "in_progress", "completed"])
  status?: TaskStatus;

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
