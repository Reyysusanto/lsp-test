export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
};

export type SuccessResponse<T = unknown> = {
  success: true;
  message: string;
  timestamp: string;
  data: T;
};

export type ErrorResponse = {
  success: false;
  message: string;
  timestamp: string;
  error: string;
};
