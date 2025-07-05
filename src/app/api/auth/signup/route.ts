import { connectToDatabase } from "@/config/DbConnect";
import { encryptPassword } from "@/lib/bcrypt";
import { signToken } from "@/lib/jwtConfig";
import { setAuthCookie } from "@/lib/setAuthCookie";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name, password, email, confirmPassword } = body;
    if (password !== confirmPassword)
      return NextResponse.json(
        { msg: "Passwords do not match" },
        { status: 400 }
      );

    const newPassword = await encryptPassword(password);
    const newUser = await User.create({ name, password:newPassword, email });
    const token = await signToken(newUser);
    setAuthCookie(token)

    
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      status: "fail",
      msg: err,
    });
  }
};
