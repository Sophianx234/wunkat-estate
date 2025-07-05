import { connectToDatabase } from "@/config/DbConnect";
import { signToken } from "@/lib/jwtConfig";
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

    const newUser = await User.create({ name, password, email });
    const token = await signToken(newUser);
    console.log(token)
    const response = NextResponse.json(
      {
        message: "login successful",
        token,
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      status: "fail",
      msg: err,
    });
  }
};
