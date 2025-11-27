'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface Buku {
  id: number;
  judul: string;
  pengarang: string;
  status: 'Tersedia' | 'Dipinjam';
}

export function DaftarPeminjaman() {
  const router = useRouter();
  const [bukuList, setBukuList] = useState<Buku[]>([]);

  useEffect(() => {
    setBukuList([
      {
        id: 1,
        judul: 'Harry Potter',
        pengarang: 'J.K. Rowling',
        status: 'Tersedia',
      },
      {
        id: 2,
        judul: 'Bumi Manusia',
        pengarang: 'Pramoedya',
        status: 'Dipinjam',
      },
      {
        id: 3,
        judul: 'Atomic Habits',
        pengarang: 'James Clear',
        status: 'Tersedia',
      },
    ]);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Daftar Peminjaman Buku</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-2 px-4">Judul Buku</th>
              <th className="text-left py-2 px-4">Pengarang</th>
              <th className="text-left py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {bukuList.map((buku) => (
              <tr key={buku.id} className="border-b last:border-none">
                <td className="py-2 px-4">{buku.judul}</td>
                <td className="py-2 px-4">{buku.pengarang}</td>
                <td
                  className={`py-2 px-4 font-semibold ${
                    buku.status === 'Tersedia'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {buku.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex gap-10 mt-20 items-center justify-center">
          <Button onClick={() => router.push('/daftar-buku')}>
            Daftar Buku
          </Button>
          <Button onClick={() => router.push('/form-peminjaman')}>
            Form Peminjaman
          </Button>
        </div>
      </div>
    </div>
  );
}
