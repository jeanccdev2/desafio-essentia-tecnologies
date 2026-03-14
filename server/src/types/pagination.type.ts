import type { TaskStatus } from "./task.type.js";

export type PaginationParams = {
  page: number;
  limit: number;
  offset: number;
  status?: TaskStatus;
  searchText?: string;
};

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    totalItems: number;
    totalPages: number;
  };
};
