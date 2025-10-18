// app/api/auth/register/route.ts
import { connectToDatabase } from "@/config/DbConnect";
import { encryptPassword } from "@/lib/bcrypt";
import { signToken } from "@/lib/jwtConfig";
import { setAuthCookie } from "@/lib/setAuthCookie";
import User from "@/models/User";
import Notification from "@/models/Notification";
import { broadcast } from "@/lib/sse";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDatabase();

    const { name, email, password, confirmPassword } = await req.json();

    // 🧩 Basic validation
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { msg: "All fields are required" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { msg: "Passwords do not match" },
        { status: 400 }
      );
    }

    // 🧩 Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { msg: "Email already in use" },
        { status: 400 }
      );
    }

    // ✅ Encrypt password and create user
    const newPassword = await encryptPassword(password);
    const newUser = await User.create({
      name,
      email,
      password: newPassword,
      avatar:
        "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(name) +
        "&background=random",
    });

    // 🧩 Save notification in DB
    const notification = await Notification.create({
      title: "New User Registered",
      message: `A new user named "${newUser.name}" has joined the platform.`,
      type: "system", // ✅ valid enum value
      audience: "admin", // only admins should see this
    });

    // 🧩 Then broadcast it via SSE
    broadcast(
      JSON.stringify({
        notification
      })
    );

    // ✅ Generate token and set cookie
    const token = await signToken(newUser);
    return setAuthCookie(token);

  } catch (err) {
    console.error("❌ Registration error:", err);
    return NextResponse.json(
      { status: "fail", msg: "Internal Server Error" },
      { status: 500 }
    );
  }
};
