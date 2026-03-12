export interface ApiResponse<T = null, E = null> {
  status: number;
  message: string;
  data?: T;
  error?: E;
}

export class ApiResponseBuilder<T = null, E = null> {
  private response: ApiResponse<T, E> = {
    status: 200,
    message: "",
  };

  constructor() {}

  setStatus(status: number) {
    this.response.status = status;
    return this;
  }

  setMessage(message: string) {
    this.response.message = message;
    return this;
  }

  setData(data: T) {
    this.response.data = data;
    return this;
  }

  setError(error: E) {
    this.response.error = error;
    return this;
  }

  build() {
    return this.response;
  }
}
