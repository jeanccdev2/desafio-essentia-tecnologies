export interface ApiResponseInterface<T = undefined> {
  status: number;
  message: string;
  data?: T;
  error?: string | null | undefined;
}
