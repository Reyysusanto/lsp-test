import z from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(4),
  username: z.string().min(4),
  password: z.string().min(6),
});
