export const NODE_ENV = process.env.NODE_ENV || 'development';
export const JWT_SECRET = process.env.JWT_SECRET || 'default';
export const DATABASE_URL =
  process.env.DATABASE_URL || 'postgresql://localhost:5432/defaultdb';
