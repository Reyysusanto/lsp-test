'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBookService } from '@/lib/books/createBook';
import { toast } from 'sonner';

export interface Buku {
  judul: string;
  tgl_terbit: string;
  pengarang: string;
  penerbit: string;
}

const bukuSchema = z.object({
  judul: z.string().min(1, 'Judul wajib diisi'),
  tgl_terbit: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Tanggal harus format YYYY-MM-DD'),
  pengarang: z.string().min(1, 'Pengarang wajib diisi'),
  penerbit: z.string().min(1, 'Penerbit wajib diisi'),
});

interface BukuFormProps {
  onSubmit: (data: Buku) => void;
  initialData?: Buku;
}

export function FormBuku({ onSubmit, initialData }: BukuFormProps) {
  const queryClient = useQueryClient();
  const form = useForm<Buku>({
    resolver: zodResolver(bukuSchema),
    defaultValues: initialData || {
      judul: '',
      tgl_terbit: '',
      pengarang: '',
      penerbit: '',
    },
  });

  const { mutate: createBooksMutation } = useMutation({
    mutationKey: ['books'],
    mutationFn: createBookService,
    onSuccess: (response) => {
      if (!response.success) {
        toast.success(response.message);
      } else {
        queryClient.invalidateQueries({ queryKey: ['books'] });
        toast.success('Buku berhasil ditambahkan');
      }
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const handleSubmit = (data: z.infer<typeof bukuSchema>) => {
    createBooksMutation(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">
          {initialData ? 'Edit Buku' : 'Tambah Buku'}
        </h2>

        <FormField
          control={form.control}
          name="judul"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Judul Buku</FormLabel>
              <FormControl>
                <Input placeholder="Judul Buku" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tgl_terbit"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Tanggal Terbit</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pengarang"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Pengarang</FormLabel>
              <FormControl>
                <Input placeholder="Pengarang" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="penerbit"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Penerbit</FormLabel>
              <FormControl>
                <Input placeholder="Penerbit" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {initialData ? 'Update Buku' : 'Tambah Buku'}
        </Button>
      </form>
    </Form>
  );
}
