import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/config/DbConnect";
import { getTokenFromRequest } from "@/lib/jwtConfig";
import { encryptPassword, verifyPassword } from "@/lib/bcrypt";
import User from "@/models/User";

export async function PATCH(req: NextRequest) {
  try {
    await connectToDatabase();
    const token = await getTokenFromRequest(req);
    if (!token || !token.userId) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    const { newPassword, oldPassword } = await req.json();
    if (!newPassword || !oldPassword)
      return NextResponse.json(
        { msg: "Please provide both old and new passwords" },
        { status: 400 }
      );

    console.warn(newPassword, oldPassword);
    const user = await User.findById(token.userId).select("+password");
    const isPasswordCorrect = await verifyPassword(oldPassword, user.password);
    if (!isPasswordCorrect)
      return NextResponse.json({ msg: "Wrong password" }, { status: 400 });
    const encryptedPass = await encryptPassword(newPassword);
    user.password = encryptedPass;
    await user.save();
    return NextResponse.json(
      { msg: "Password updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}
