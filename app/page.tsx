import Link from 'next/link';

const LandingPage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Selamat Datang di BookBorrow App
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Sistem peminjaman buku untuk Admin dan Peminjam.
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Daftar
        </Link>
      </div>
    </main>
  );
};

export default LandingPage;
