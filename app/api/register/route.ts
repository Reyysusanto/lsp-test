import { NextRequest, NextResponse } from 'next/server';
import { Status_peminjam } from '@prisma/client';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
  const { name, username, password } = await req.json();

  const existingUser = await prisma.peminjam.findUnique({
    where: { user: username },
  });
  if (existingUser) {
    return NextResponse.json({
      success: false,
      message: 'Username sudah digunakan',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.peminjam.create({
    data: {
      nama: name,
      user: username,
      pass: hashedPassword,
      tgl_daftar: new Date(),
      status: Status_peminjam.AKTIF,
    },
  });

  return NextResponse.json({
    success: true,
    message: 'Registrasi berhasil. Silakan login.',
    data: { id: user.id, nama: user.nama, user: user.user },
  });
}
