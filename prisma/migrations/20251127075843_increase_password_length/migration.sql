-- CreateEnum
CREATE TYPE "Status_peminjam" AS ENUM ('AKTIF', 'TIDAK_AKTIF');

-- CreateEnum
CREATE TYPE "Status_pinjam" AS ENUM ('DIPROSES', 'DISETUJUI', 'DITOLAK', 'SELESAI');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "nama" VARCHAR(40) NOT NULL,
    "user" VARCHAR(20) NOT NULL,
    "pass" VARCHAR(255) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Peminjam" (
    "id" TEXT NOT NULL,
    "nama" VARCHAR(40) NOT NULL,
    "tgl_daftar" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user" VARCHAR(20) NOT NULL,
    "pass" VARCHAR(255) NOT NULL,
    "foto" VARCHAR(100),
    "status" "Status_peminjam" NOT NULL DEFAULT 'AKTIF',

    CONSTRAINT "Peminjam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Peminjaman_buku" (
    "kode_pinjam" TEXT NOT NULL,
    "tgl_pesan" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tgl_ambil" TIMESTAMP(3),
    "tgl_wajibKembali" TIMESTAMP(3),
    "tgl_kembali" TIMESTAMP(3),
    "status_pinjam" "Status_pinjam" NOT NULL DEFAULT 'DIPROSES',
    "adminId" TEXT,
    "peminjamId" TEXT,

    CONSTRAINT "Peminjaman_buku_pkey" PRIMARY KEY ("kode_pinjam")
);

-- CreateTable
CREATE TABLE "Buku" (
    "id" TEXT NOT NULL,
    "judul" VARCHAR(100) NOT NULL,
    "tgl_terbit" TIMESTAMP(3) NOT NULL,
    "pengarang" VARCHAR(50) NOT NULL,
    "penerbit" VARCHAR(50) NOT NULL,

    CONSTRAINT "Buku_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Detail_peminjaman" (
    "id" TEXT NOT NULL,
    "peminjamanBukuId" TEXT NOT NULL,
    "bukuId" TEXT NOT NULL,

    CONSTRAINT "Detail_peminjaman_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_user_key" ON "Admin"("user");

-- CreateIndex
CREATE UNIQUE INDEX "Peminjam_user_key" ON "Peminjam"("user");

-- AddForeignKey
ALTER TABLE "Peminjaman_buku" ADD CONSTRAINT "Peminjaman_buku_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peminjaman_buku" ADD CONSTRAINT "Peminjaman_buku_peminjamId_fkey" FOREIGN KEY ("peminjamId") REFERENCES "Peminjam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail_peminjaman" ADD CONSTRAINT "Detail_peminjaman_peminjamanBukuId_fkey" FOREIGN KEY ("peminjamanBukuId") REFERENCES "Peminjaman_buku"("kode_pinjam") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail_peminjaman" ADD CONSTRAINT "Detail_peminjaman_bukuId_fkey" FOREIGN KEY ("bukuId") REFERENCES "Buku"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
