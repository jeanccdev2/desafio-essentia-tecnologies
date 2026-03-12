export interface ApiResponseInterface<T = null, E = null> {
  status: number;
  message: string;
  data?: T;
  error?: E;
}

export class ApiResponse<T = null, E = null> {
  private response: ApiResponseInterface<T, E>;

  constructor(response: ApiResponseInterface<T, E>) {
    this.response = response;
  }

  getResponse() {
    return this.response;
  }
}
