// app/api/auth/register/route.ts
import { connectToDatabase } from "@/config/DbConnect";
import { encryptPassword } from "@/lib/bcrypt";
import { signToken } from "@/lib/jwtConfig";
import { setAuthCookie } from "@/lib/setAuthCookie";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDatabase();

    const { name, email, password, confirmPassword } = await req.json();

    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json({ msg: "All fields are required" }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ msg: "Passwords do not match" }, { status: 400 });
    }

    const newPassword = await encryptPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: newPassword,
      profile: "/images/user-default.png", // Default avatar
    });

    const token = await signToken(newUser);
    return setAuthCookie(token);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "fail", msg: "Internal Server Error" }, { status: 500 });
  }
};
