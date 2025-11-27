import { DaftarBuku } from '@/components/admin/daftar-buku';

const AdminDaftarBukuPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="p-6 bg-white shadow">
        <h1 className="text-2xl font-bold">Manajemen Buku</h1>
      </header>
      <main className="flex-1">
        <DaftarBuku />
      </main>
    </div>
  );
};

export default AdminDaftarBukuPage;
