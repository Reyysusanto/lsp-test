import { SuccessResponse } from './response.type';

export type Books = {
  id: string;
  judul: string;
  tgl_terbit: string;
  pengarang: string;
  penerbit: string;
};

export type AllBooksResponse = SuccessResponse<Books[]>;
export type BookResponse = SuccessResponse<Books>;
