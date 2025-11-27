import { BookResponse } from '@/types/books.type';
import { ErrorResponse } from '@/types/response.type';
import axios from 'axios';
import { createErrorAction } from '../errorrResponse';

export const deleteBookService = async (
  bookId: string
): Promise<BookResponse | ErrorResponse> => {
  try {
    const response = await axios.delete<BookResponse | ErrorResponse>(
      `/api/books?id=${bookId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.success) {
      return response.data as BookResponse;
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
