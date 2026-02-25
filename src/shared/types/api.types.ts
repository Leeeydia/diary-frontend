export interface ApiResponse<T = unknown> {
  status: number;
  code: string;
  message: string;
  data: T;
}
