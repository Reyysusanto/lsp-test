import { ApiResponse } from '@/types/response.type';

export const successResponse = <T>(
  data: T,
  message = 'Success'
): ApiResponse<T> => {
  return {
    success: true,
    message,
    data,
  };
};

export const errorResponse = (
  message = 'Error',
  error?: string
): ApiResponse<null> => {
  return {
    success: false,
    message,
    error,
  };
};
