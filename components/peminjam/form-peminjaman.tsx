'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function FormPeminjaman() {
  const router = useRouter();
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [buku, setBuku] = useState('');
  const [tanggalPinjam, setTanggalPinjam] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi API submit
    console.log({ nama, email, buku, tanggalPinjam });
    alert('Peminjaman berhasil dibuat!');
    router.push('/peminjam/daftar-peminjaman');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Form Peminjaman Buku
      </h2>
      <input
        type="text"
        placeholder="Nama"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        placeholder="Judul Buku"
        value={buku}
        onChange={(e) => setBuku(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="date"
        value={tanggalPinjam}
        onChange={(e) => setTanggalPinjam(e.target.value)}
        className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Submit Peminjaman
      </button>
    </form>
  );
}
