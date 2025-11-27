'use client';

import { useState } from 'react';
import { Buku, FormBuku } from './form-buku';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllBooksService } from '@/lib/books/getAllBooks';
import { deleteBookService } from '@/lib/books/deleteBook';
import { toast } from 'sonner';

export function DaftarBuku() {
  const queryClient = useQueryClient();
  const [bukuList, setBukuList] = useState<Buku[]>([]);
  const [editBuku, setEditBuku] = useState<Buku | null>(null);

  const handleAddOrUpdate = (data: Buku) => {
    console.log('Form data', data);
  };

  const { data: booksData } = useQuery({
    queryKey: ['books'],
    queryFn: getAllBooksService,
  });

  const { mutate: deleteBookMutation } = useMutation({
    mutationKey: ['books'],
    mutationFn: deleteBookService,
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message);
        queryClient.invalidateQueries({ queryKey: ['books'] });
      } else {
        toast.error(response.message);
      }
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  if (!booksData?.success || !booksData.data) {
    return <div>Gagal memuat data buku.</div>;
  }

  const handleDelete = (id: string) => {
    deleteBookMutation(id);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <FormBuku
        onSubmit={handleAddOrUpdate}
        initialData={editBuku || undefined}
      />

      <h2 className="text-2xl font-bold mb-4">Daftar Buku</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-2 px-4">Judul Buku</th>
              <th className="text-left py-2 px-4">Tanggal Terbit</th>
              <th className="text-left py-2 px-4">Pengarang</th>
              <th className="text-left py-2 px-4">Penerbit</th>
              <th className="text-left py-2 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {booksData.data.map((buku) => (
              <tr key={buku.id} className="border-b last:border-none">
                <td className="py-2 px-4">{buku.judul}</td>
                <td className="py-2 px-4">
                  {new Date(buku.tgl_terbit).toLocaleDateString()}
                </td>
                <td className="py-2 px-4">{buku.pengarang}</td>
                <td className="py-2 px-4">{buku.penerbit}</td>
                <td className="py-2 px-4 flex gap-2">
                  {/* <button
                    onClick={() => setEditBuku(buku.id)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button> */}
                  <button
                    onClick={() => handleDelete(buku.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {bukuList.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  Belum ada buku.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
