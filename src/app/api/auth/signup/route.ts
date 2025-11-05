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
      }),{audience: notification.audience}
    );
    
     // ✅ Send Welcome Email
    const html = `
      <div style="font-family:'Segoe UI', Arial, sans-serif; background-color:#f9fafb; padding:40px 0; color:#333;">
        <div style="max-width:600px; margin:auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 3px 10px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <div style="background:linear-gradient(135deg, #111827, #1f2937); color:#fff; padding:30px 20px; text-align:center;">
            <img 
              src="https://res.cloudinary.com/dtytb8qrc/image/upload/v1761591015/home_yevjdg.png" 
              alt="WunkatHomes Logo" 
              style="width:60px; height:60px; margin-bottom:10px; border-radius:8px; background:#fff; padding:6px;"
            />
            <h1 style="margin:0; font-size:22px; font-weight:600;">Welcome to WunkatHomes</h1>
            <p style="margin:6px 0 0; font-size:14px; opacity:0.9;">Find your next comfort space</p>
          </div>

          <!-- Content -->
          <div style="padding:32px;">
            <h2 style="font-size:18px; margin:0 0 12px; color:#111827;">Hi ${newUser.name},</h2>
            <p style="margin:0 0 18px; font-size:15px; line-height:1.6;">
              Welcome to <strong>WunkatHomes</strong>! 🎉 We're excited to have you onboard.
            </p>

            <p style="margin:0 0 18px; font-size:15px; line-height:1.6;">
              Start exploring your next home, manage your bookings, and stay updated with new listings — all in one place.
            </p>

            <a href="https://wunkathomes.com/dashboard" 
              style="display:inline-block; background:#111827; color:#fff; text-decoration:none; 
              padding:12px 28px; border-radius:6px; font-weight:500; margin:10px 0;">
              Go to Dashboard
            </a>

            <p style="margin:22px 0 0; font-size:14px; color:#555; line-height:1.6;">
              Need help? Contact our support team anytime at 
              <a href="mailto:support@wunkathomes.com" style="color:#1d4ed8;">support@wunkathomes.com</a>.
            </p>
          </div>

          <!-- Footer -->
          <div style="background:#f3f4f6; text-align:center; padding:16px 10px; font-size:12px; color:#6b7280;">
            <p style="margin:4px 0;">© ${new Date().getFullYear()} WunkatHomes. All rights reserved.</p>
            <a href="https://wunkathomes.com" style="color:#1d4ed8; text-decoration:none;">Visit our website</a>
          </div>
        </div>
      </div>
    `;

    await sendMail({
      to: newUser.email,
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
