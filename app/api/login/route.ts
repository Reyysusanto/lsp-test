import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { signToken } from '@/lib/auth';
import { LoginSchema } from '@/schema/loginSchema';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = LoginSchema.parse(body);

    const { username, password } = data;

    const user = await prisma.peminjam.findUnique({
      where: { user: username },
    });

    if (user) {
      const matchPassword = await bcrypt.compare(password, user.pass);
      if (!matchPassword) {
        return NextResponse.json(
          { message: 'Password salah', success: false },
          { status: 401 }
        );
      }

      const token = signToken({ id: user.id, role: 'ADMIN' });

      return NextResponse.json(
        {
          success: true,
          role: 'ADMIN',
          token,
          message: 'Login admin berhasil',
        },
        { status: 200 }
      );
    }

    const peminjam = await prisma.peminjam.findUnique({
      where: { user: username },
    });

    if (!peminjam) {
      return NextResponse.json(
        { message: 'User tidak ditemukan', success: false },
        { status: 404 }
      );
    }

    if (peminjam.pass !== password) {
      return NextResponse.json(
        { message: 'Password salah', success: false },
        { status: 401 }
      );
    }

    const token = signToken({ id: peminjam.id, role: 'PEMINJAM' });

    return NextResponse.json(
      {
        success: true,
        data: token,
        message: 'Login peminjam berhasil',
      },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Data tidak valid', errors: 'gagal login' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
