import { connectToDatabase } from "@/config/DbConnect";
import { verifyPassword } from "@/lib/bcrypt";
import { signToken } from "@/lib/jwtConfig";
import { setAuthCookie } from "@/lib/setAuthCookie";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Please provide both email and password." },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist. Please check your credentials." },
        { status: 401 }
      );
    }

    const isPasswordCorrect = await verifyPassword(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Wrong password. Please try again." },
        { status: 401 }
      );
    }

    const token = await signToken(user);
    return setAuthCookie(token); // this should internally return a proper response
  } catch (err) {
    return NextResponse.json(
      {
        message: (err as Error).message || "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
};
