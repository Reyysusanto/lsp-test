import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { JwtPayload, Role } from './types/auth.type';

const SECRET = process.env.JWT_SECRET!;

export const middleware = (req: NextRequest) => {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  let payload: JwtPayload;
  try {
    payload = jwt.verify(token, SECRET) as JwtPayload;
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (pathname.startsWith('/mahasiswa') && payload.role !== Role.MAHASISWA) {
    return NextResponse.redirect(new URL('/dosen/dashboard', req.url));
  }

  if (pathname.startsWith('/dosen') && payload.role !== Role.DOSEN) {
    return NextResponse.redirect(new URL('/mahasiswa/dashboard', req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/mahasiswa/:path*', '/dosen/:path*', '/dashboard/:path*'],
};
