import { SuccessResponse } from './response.type';

export enum Role {
  MAHASISWA = 'MAHASISWA',
  DOSEN = 'DOSEN',
}

export type JwtPayload = {
  id: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
};

export type LoginType = {
  success: true;
  role: string;
  token: string;
  message: string;
};

export type RegisterType = {
  id: string;
  nama: string;
  user: string;
};

export type LoginResponse = SuccessResponse<LoginType>;
export type RegisterResponse = SuccessResponse<RegisterType>;
