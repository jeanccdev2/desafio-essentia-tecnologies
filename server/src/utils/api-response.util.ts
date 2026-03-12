export interface ApiResponseInterface<T = undefined> {
  status: number;
  message: string;
  data?: T;
  error?: string | null | undefined;
}

export class ApiResponse<T = null> {
  private response: ApiResponseInterface<T>;

  constructor(response: ApiResponseInterface<T>) {
    this.response = response;
  }

  getResponse() {
    return this.response;
  }
}
