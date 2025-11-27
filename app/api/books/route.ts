import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const bukuList = await prisma.buku.findMany({
      orderBy: { tgl_terbit: 'desc' },
    });
    return NextResponse.json(
      { success: true, data: bukuList },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil buku', error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { judul, tgl_terbit, pengarang, penerbit } = body;

    if (!judul || !tgl_terbit || !pengarang || !penerbit) {
      return NextResponse.json(
        { success: false, message: 'Data tidak lengkap' },
        { status: 400 }
      );
    }

    const newBuku = await prisma.buku.create({
      data: {
        judul,
        tgl_terbit: new Date(tgl_terbit),
        pengarang,
        penerbit,
      },
    });

    return NextResponse.json(
      { success: true, data: newBuku, message: 'Buku berhasil ditambahkan' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal menambahkan buku', error },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, judul, tgl_terbit, pengarang, penerbit } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID buku diperlukan' },
        { status: 400 }
      );
    }

    const updatedBuku = await prisma.buku.update({
      where: { id },
      data: {
        ...(judul && { judul }),
        ...(tgl_terbit && { tgl_terbit: new Date(tgl_terbit) }),
        ...(pengarang && { pengarang }),
        ...(penerbit && { penerbit }),
      },
    });

    return NextResponse.json(
      { success: true, data: updatedBuku, message: 'Buku berhasil diupdate' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal mengupdate buku', error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID buku diperlukan' },
        { status: 400 }
      );
    }

    const deletedBook = await prisma.buku.delete({ where: { id } });

    return NextResponse.json(
      { success: true, data: deletedBook, message: 'Buku berhasil dihapus' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal menghapus buku', error },
      { status: 500 }
    );
  }
}
