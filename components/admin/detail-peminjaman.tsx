'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Peminjaman } from './daftar-peminjaman';

interface DetailPeminjamanProps {
  data: Peminjaman;
}

export function DetailPeminjaman({ data }: DetailPeminjamanProps) {
  const router = useRouter();
  const [bukuList, setBukuList] = useState(data.buku);
  const [status, setStatus] = useState(data.status);

  const handleHapusBuku = (id: number) => {
    setBukuList(bukuList.filter((b) => b.id !== id));
  };

  const handleSave = () => {
    alert('Perubahan berhasil disimpan!');
    router.push('/admin/peminjaman');
  };

  const handleApprove = () => {
    setStatus('Disetujui');
  };

  const handleReject = () => {
    setStatus('Ditolak');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Detail Peminjaman</h2>
      <p className="mb-2">
        <strong>Peminjam:</strong> {data.peminjam}
      </p>
      <p className="mb-2">
        <strong>Email:</strong> {data.email}
      </p>
      <p className="mb-2">
        <strong>Status:</strong> {status}
      </p>
      <p className="mb-4">
        <strong>Tanggal Pinjam:</strong> {data.tanggalPinjam}
      </p>

      <h3 className="text-xl font-semibold mb-2">Daftar Buku</h3>
      <ul className="mb-4">
        {bukuList.map((buku) => (
          <li key={buku.id} className="flex justify-between py-1 border-b">
            <span>{buku.judul}</span>
            <button
              onClick={() => handleHapusBuku(buku.id)}
              className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Simpan Perubahan
        </button>
        <button
          onClick={handleApprove}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Setujui Peminjaman
        </button>
        <button
          onClick={handleReject}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Tolak Peminjaman
        </button>
      </div>
    </div>
  );
}
