export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export function createResponse<T>(statusCode: number, message: string, data: T): ApiResponse<T> {
  return { statusCode, message, data };
}
