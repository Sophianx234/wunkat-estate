import { verifyPassword } from "@/lib/bcrypt";
import { signToken } from "@/lib/jwtConfig";
import { setAuthCookie } from "@/lib/setAuthCookie";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();
    if (!email || !password)
      throw new Error("Please provide email or password");
    
    const user = await User.findOne({email});
    console.log("boruto")
    if (!user)
      throw new Error("user do not exist. please enter correct information");
    const isPasswordCorrect =  await verifyPassword(password, user.password);
    console.log('user',user)
    console.log('iscorrect',isPasswordCorrect)
    if (!isPasswordCorrect)
      throw new Error("wrong password. please enter correct password");
    const token = await signToken(user);
    return setAuthCookie(token);
  } catch (err) {
    return NextResponse.json({
      status: "fail",
      msg: err,
    });
  }
};
