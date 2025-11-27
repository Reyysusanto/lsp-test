'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export interface Peminjaman {
  id: number;
  peminjam: string;
  email: string;
  buku: { id: number; judul: string }[];
  status: 'Menunggu' | 'Disetujui' | 'Ditolak' | 'Dikembalikan';
  tanggalPinjam: string;
}

export function DaftarPeminjaman() {
  const router = useRouter();
  const [peminjamanList, setPeminjamanList] = useState<Peminjaman[]>([
    {
      id: 1,
      peminjam: 'Rheinaldy Susanto',
      email: 'rheinaldy@example.com',
      buku: [
        { id: 1, judul: 'Harry Potter' },
        { id: 2, judul: 'Atomic Habits' },
      ],
      status: 'Menunggu',
      tanggalPinjam: '2025-11-27',
    },
    {
      id: 2,
      peminjam: 'Siti Nurhaliza',
      email: 'siti@example.com',
      buku: [{ id: 3, judul: 'Bumi Manusia' }],
      status: 'Disetujui',
      tanggalPinjam: '2025-11-26',
    },
  ]);

  const handleKonfirmasi = (id: number) => {
    setPeminjamanList(
      peminjamanList.map((p) =>
        p.id === id ? { ...p, status: 'Dikembalikan' } : p
      )
    );
  };

  const handleHapus = (id: number) => {
    if (confirm('Apakah yakin ingin menghapus peminjaman ini?')) {
      setPeminjamanList(peminjamanList.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Daftar Peminjaman</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-2 px-4">Peminjam</th>
              <th className="text-left py-2 px-4">Email</th>
              <th className="text-left py-2 px-4">Jumlah Buku</th>
              <th className="text-left py-2 px-4">Status</th>
              <th className="text-left py-2 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {peminjamanList.map((p) => (
              <tr key={p.id} className="border-b last:border-none">
                <td className="py-2 px-4">{p.peminjam}</td>
                <td className="py-2 px-4">{p.email}</td>
                <td className="py-2 px-4">{p.buku.length}</td>
                <td className="py-2 px-4 font-semibold">
                  {p.status === 'Disetujui'
                    ? '✅ Disetujui'
                    : p.status === 'Ditolak'
                    ? '❌ Ditolak'
                    : p.status === 'Dikembalikan'
                    ? '📦 Dikembalikan'
                    : '⏳ Menunggu'}
                </td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    onClick={() => router.push(`/admin/peminjaman/${p.id}`)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Detail
                  </button>
                  {p.status === 'Disetujui' && (
                    <button
                      onClick={() => handleKonfirmasi(p.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      Konfirmasi Pengembalian
                    </button>
                  )}
                  <button
                    onClick={() => handleHapus(p.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {peminjamanList.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  Belum ada peminjaman.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
