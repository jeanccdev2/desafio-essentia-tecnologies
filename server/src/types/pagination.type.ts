export type PaginationParams = {
  page: number;
  limit: number;
  offset: number;
};

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    totalItems: number;
    totalPages: number;
  };
};
