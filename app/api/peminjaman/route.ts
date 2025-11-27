import prisma from '@/lib/db';
import { Status_pinjam } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface DetailPeminjamanBody {
  bukuId: string;
}

interface PeminjamanBody {
  peminjamId: string;
  tgl_ambil?: string;
  tgl_wajibKembali?: string;
  detailPeminjaman: DetailPeminjamanBody[];
}

export async function POST(req: NextRequest) {
  try {
    const body: PeminjamanBody = await req.json();
    const { peminjamId, tgl_ambil, tgl_wajibKembali, detailPeminjaman } = body;

    if (!peminjamId || !detailPeminjaman || detailPeminjaman.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Peminjam dan daftar buku wajib diisi' },
        { status: 400 }
      );
    }

    const peminjaman = await prisma.peminjaman_buku.create({
      data: {
        peminjamId,
        tgl_ambil: tgl_ambil ? new Date(tgl_ambil) : null,
        tgl_wajibKembali: tgl_wajibKembali ? new Date(tgl_wajibKembali) : null,
        status_pinjam: Status_pinjam.DIPROSES,
        detailPeminjaman: {
          create: detailPeminjaman.map((item) => ({
            bukuId: item.bukuId,
          })),
        },
      },
      include: {
        detailPeminjaman: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: peminjaman,
        message: 'Pengajuan peminjaman berhasil dibuat',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Gagal membuat pengajuan', error },
      { status: 500 }
    );
  }
}
