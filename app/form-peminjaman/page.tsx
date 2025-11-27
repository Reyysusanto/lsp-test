import { FormPeminjaman } from '@/components/peminjam/form-peminjaman';

export default function PeminjamanPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="p-6 bg-white shadow">
        <h1 className="text-2xl font-bold">Form Peminjaman Buku</h1>
      </header>
      <main className="flex-1">
        <FormPeminjaman />
      </main>
    </div>
  );
}
