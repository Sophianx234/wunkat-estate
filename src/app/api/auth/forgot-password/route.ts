import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connectToDatabase } from "@/config/DbConnect";
import crypto from "crypto";
import { sendMail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Generate and hash reset token
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  // Save hashed token + expiry to DB
  user.resetToken = hashedToken;
  user.resetTokenExpire = Date.now() + 60 * 60 * 1000; // 1 hour
  await user.save();

  // const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;


  // Email template (keep your styled version)
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
        <h1 style="margin:0; font-size:22px; font-weight:600;">WunkatHomes</h1>
        <p style="margin:6px 0 0; font-size:14px; opacity:0.9;">Find your next comfort space</p>
      </div>

      <!-- Content -->
      <div style="padding:32px;">
        <h2 style="font-size:18px; margin:0 0 12px; color:#111827;">Reset Your Password</h2>
        <p style="margin:0 0 16px; font-size:15px; line-height:1.6;">
          Hello <strong>${user.name || "there"}</strong>,
        </p>
        <p style="margin:0 0 18px; font-size:15px; line-height:1.6;">
          We received a request to reset your password for your <strong>WunkatHomes</strong> account.
          Click the button below to set a new password.
        </p>

        <a href="${resetUrl}" 
           style="display:inline-block; background:#111827; color:#fff; text-decoration:none; 
           padding:12px 28px; border-radius:6px; font-weight:500; margin:10px 0;">
          Reset Password
        </a>

        <p style="margin:22px 0 0; font-size:14px; color:#555; line-height:1.6;">
          If you didn’t request this, please ignore this email. Your password will remain unchanged.
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
    to: email,
    subject: "Reset Your Password - WunkatHomes",
    html,
  });

  return NextResponse.json({ message: "Reset email sent" });
}
