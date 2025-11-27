import { AllBooksResponse } from '@/types/books.type';
import { ErrorResponse } from '@/types/response.type';
import axios from 'axios';
import { createErrorAction } from '../errorrResponse';

export const getAllBooksService = async (): Promise<
  AllBooksResponse | ErrorResponse
> => {
  try {
    const response = await axios.get<AllBooksResponse | ErrorResponse>(
      `api/books`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.success) {
      return response.data as AllBooksResponse;
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
