import z from 'zod';

export const bookSchema = z.object({
  judul: z.string().min(1, 'Judul wajib diisi'),
  tgl_terbit: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Tanggal harus format YYYY-MM-DD'),
  pengarang: z.string().min(1, 'Pengarang wajib diisi'),
  penerbit: z.string().min(1, 'Penerbit wajib diisi'),
});
