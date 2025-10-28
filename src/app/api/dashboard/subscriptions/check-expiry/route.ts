// src/app/api/subscription/check-expiry/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/config/DbConnect";
import Payment from "@/models/Payment";
import Notification from "@/models/Notification";
import { broadcast } from "@/lib/sse";
import { sendMail } from "@/lib/mail";

export async function GET() {
  try {
    await connectToDatabase();

    const now = new Date();
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(now.getDate() + 3);

    // ✅ Find active payments expiring in 3 days
    const expiringPayments = await Payment.find({
      expiresAt: { $lte: threeDaysFromNow, $gt: now },
      status: "completed",
    }).populate("userId");

    if (expiringPayments.length === 0) {
      return NextResponse.json({ success: true, message: "No expiring subscriptions." });
    }

    for (const payment of expiringPayments) {
      const user = payment.userId as any;
      if (!user?._id) continue;

      // Check if user already has this notification
      const existing = await Notification.findOne({
        userId: user._id,
        type: "payment",
        "message": { $regex: "expiring soon", $options: "i" },
      });

      if (existing) continue;

      // ✅ Create the notification
      const notification = await Notification.create({
        title: "Subscription Expiring Soon",
        message: `Hi ${user.name}, your subscription will expire on ${new Date(payment.expiresAt).toDateString()}. Please renew to keep access.`,
        type: "payment",
        audience: "user",
        userId: user._id,
      });

      // ✅ Broadcast via SSE (live delivery)
      broadcast(JSON.stringify({ notification }), {
        audience: "user",
        userId: user._id.toString(),
      });

       if (user.email) {
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
        <h2 style="font-size:18px; margin:0 0 12px; color:#111827;">Your Subscription is Expiring Soon</h2>

        <p style="margin:0 0 16px; font-size:15px; line-height:1.6;">
          Hello <strong>${user.name || "there"}</strong>,
        </p>

        <p style="margin:0 0 18px; font-size:15px; line-height:1.6;">
          We noticed that your current subscription for <strong>WunkatHomes</strong> 
          will expire on <strong>${new Date(payment.expiresAt).toDateString()}</strong>.
        </p>

        <p style="margin:0 0 22px; font-size:15px; line-height:1.6;">
          To avoid interruption of your stay and access to our services, please renew your subscription before it expires.
        </p>

        <a href="https://wunkathomes.com/renew" 
           style="display:inline-block; background:#111827; color:#fff; text-decoration:none; 
           padding:12px 28px; border-radius:6px; font-weight:500; margin:10px 0;">
          Renew Subscription
        </a>

        <p style="margin:22px 0 0; font-size:14px; color:#555; line-height:1.6;">
          If you've already renewed, kindly disregard this message. Thank you for staying with us!
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

        try {
         await sendMail({
  to: user.email,
  subject: "Your Subscription is Expiring Soon - WunkatHomes",
  html,
});;
          console.log(`📧 Email sent to ${user.email}`);
        } catch (mailErr) {
          console.error("❌ Failed to send expiry email:", mailErr);
        }
      }
    }
    



    return NextResponse.json({
      success: true,
      message: `Processed ${expiringPayments.length} expiring payments.`,
    });
  } catch (error) {
    console.error("Error checking subscription expiry:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
