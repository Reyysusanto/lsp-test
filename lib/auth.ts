import { JwtPayload, Role } from '@/types/auth.type';
import { JWT_SECRET } from '@/utils/env';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { HttpError } from './errors';

export const signToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (typeof payload === 'string') return null;
    return payload as JwtPayload;
  } catch {
    return null;
  }
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const verifyPassword = (password: string, hashed: string) => {
  return bcrypt.compare(password, hashed);
};

export const setAuth = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: true,
    path: '/',
  });
};

export const getAuth = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  return cookieStore.get('token')?.value ?? null;
};

export const getCurrentUser = async (): Promise<JwtPayload> => {
  const token = await getAuth();
  if (!token) throw new HttpError('Unauthorized', 401);

  const payload = verifyToken(token);
  if (!payload) throw new HttpError('Unauthorized', 401);

  return payload;
};

export const requireRole = async (roles: Role[]): Promise<JwtPayload> => {
  const user = await getCurrentUser();
  if (!roles.includes(user.role)) throw new HttpError('Forbidden', 403);
  return user;
};
