// app/api/auth/register/route.ts
import { connectToDatabase } from "@/config/DbConnect";
import { encryptPassword } from "@/lib/bcrypt";
import { signToken } from "@/lib/jwtConfig";
import { setAuthCookie } from "@/lib/setAuthCookie";
import User from "@/models/User";
import Notification from "@/models/Notification";
import { broadcast } from "@/lib/sse";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

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
      }),
      {audience: notification.audience}
    );
    const html = `
  <div style="font-family:'Segoe UI', Roboto, Arial, sans-serif; background-color:#f8fafc; padding:40px 0; color:#111827;">
    <div style="max-width:620px; margin:auto; background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.06);">
      
      <!-- Header -->
      <div style="background:linear-gradient(135deg, #0f172a, #1e293b); color:#fff; padding:36px 24px; text-align:center;">
        <img 
          src="https://res.cloudinary.com/dtytb8qrc/image/upload/v1761591015/home_yevjdg.png" 
          alt="WunkatHomes Logo" 
          style="width:64px; height:64px; margin-bottom:12px; border-radius:8px; background:#fff; padding:6px;"
        />
        <h1 style="margin:0; font-size:24px; font-weight:600;">Welcome to WunkatHomes</h1>
        <p style="margin:8px 0 0; font-size:14px; opacity:0.85;">Your trusted partner in finding comfort and class.</p>
      </div>

      <!-- Content -->
      <div style="padding:36px 32px;">
        <p style="font-size:16px; margin:0 0 18px;">Dear <strong>${newUser.name || "Valued Member"}</strong>,</p>
        
        <p style="font-size:15px; line-height:1.7; margin:0 0 18px; color:#374151;">
          We’re delighted to welcome you to <strong>WunkatHomes</strong> — where comfort meets reliability.
          Your account has been successfully created, and you now have access to our curated listings and premium housing services.
        </p>

        <p style="font-size:15px; line-height:1.7; margin:0 0 24px; color:#374151;">
          Explore verified properties, save your favorite homes, and stay informed about the latest offers in your area.
        </p>

        <div style="text-align:center;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/login" 
             style="display:inline-block; background:#0f172a; color:#ffffff; text-decoration:none; 
             padding:14px 32px; border-radius:8px; font-weight:500; font-size:15px;">
            Access Your Dashboard
          </a>
        </div>

        <p style="margin:28px 0 0; font-size:14px; color:#6b7280; line-height:1.6;">
          If you did not create this account, please disregard this email. No further action is required.
        </p>
      </div>

      <!-- Divider -->
      <div style="height:1px; background:#e5e7eb;"></div>

      <!-- Footer -->
      <div style="background:#f9fafb; text-align:center; padding:20px 10px; font-size:12px; color:#6b7280;">
        <p style="margin:4px 0;">© ${new Date().getFullYear()} WunkatHomes. All rights reserved.</p>
        <p style="margin:4px 0;">
          <a href="https://wunkathomes.com" style="color:#1d4ed8; text-decoration:none;">Visit Our Website</a> 
          • 
          <a href="mailto:support@wunkathomes.com" style="color:#1d4ed8; text-decoration:none;">Contact Support</a>
        </p>
      </div>
    </div>
  </div>
`;

    
    await sendMail({
     to: email,
     subject: "Welcome to WunkatHomes 🎉",
     html,
   });
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
