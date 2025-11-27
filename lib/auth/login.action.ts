import { ErrorResponse } from '@/types/response.type';
import axios from 'axios';
import z from 'zod';
import { createErrorAction } from '../errorrResponse';
import { LoginSchema } from '@/schema/loginSchema';
import { LoginResponse } from '@/types/auth.type';

export const loginService = async (
  data: z.infer<typeof LoginSchema>
): Promise<LoginResponse | ErrorResponse> => {
  try {
    const response = await axios.post<LoginResponse | ErrorResponse>(
      '/api/login',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.success) {
      return response.data as LoginResponse;
    } else {
      return response.data as ErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return createErrorAction(
        error.response.data.message,
        error.response.data.error || 'Unknown error'
      );
    }
    return createErrorAction('An unexpected error occurred', 'Unknown error');
  }
};
