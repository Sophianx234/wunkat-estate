import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  console.log(token)

  if (!token) return NextResponse.json({ user: null });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({ user });
  } catch (err) {
    console.log(err)
    return NextResponse.json({ user: null });
  }
}
