import { Peminjaman } from '@/components/admin/daftar-peminjaman';
import { DetailPeminjaman } from '@/components/admin/detail-peminjaman';

export default function DetailPeminjamanPage() {
  const data: Peminjaman = {
    id: 1,
    peminjam: 'Rheinaldy Susanto',
    email: 'rheinaldy@example.com',
    buku: [
      { id: 1, judul: 'Harry Potter' },
      { id: 2, judul: 'Atomic Habits' },
    ],
    status: 'Menunggu',
    tanggalPinjam: '2025-11-27',
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="p-6 bg-white shadow">
        <h1 className="text-2xl font-bold">Detail Peminjaman</h1>
      </header>
      <main className="flex-1">
        <DetailPeminjaman data={data} />
      </main>
    </div>
  );
}
