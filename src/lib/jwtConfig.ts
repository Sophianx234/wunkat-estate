import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export type userType = {
  id: string;
  name: string;
  profile:string
};
type DecodedToken = {
  userId: string;
  email: string;
  name?: string;
  iat: number;
  exp: number;
};
const jwtSecret = process.env.JWT_SECRET as string;
const jwtExpires = process.env.JWT_EXPIRES;
export const signToken = async (user: userType) => {
  if (jwtSecret && jwtExpires)
    return jwt.sign({ userId: user.id, name: user.name,profile:user.profile }, jwtSecret, {
      expiresIn: Number(jwtExpires)*60*60,
    });
  else {
    throw new Error("JWT_EXPIRES is not defined in environment variables");
  }
};




export async function getTokenFromRequest(req: NextRequest): Promise<DecodedToken | null> {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, jwtSecret) as DecodedToken;
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

