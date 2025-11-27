import { DaftarPeminjaman } from '@/components/peminjam/daftar-peminjaman';

export default function AdminPeminjamanPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="p-6 bg-white shadow">
        <h1 className="text-2xl font-bold">Manajemen Peminjaman</h1>
      </header>
      <main className="flex-1">
        <DaftarPeminjaman />
      </main>
    </div>
  );
}
