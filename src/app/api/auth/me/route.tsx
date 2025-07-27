import { DecodedToken, userType } from '@/lib/jwtConfig';
import User, { userDocumentType } from '@/models/User';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  console.log(token)

  if (!token) return NextResponse.json({ user: null });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById((decoded as DecodedToken).userId).select('name password profile')
    
    return NextResponse.json({ user });
  } catch (err) {
    console.log(err)
    return NextResponse.json({ user: null });
  }
}
