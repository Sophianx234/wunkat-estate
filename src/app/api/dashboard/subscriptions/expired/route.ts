// /app/api/subscription/check-expired/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/config/DbConnect";
import Payment from "@/models/Payment";
import Room from "@/models/Room";
import Notification from "@/models/Notification";
import { broadcast } from "@/lib/sse";
import { sendMail } from "@/lib/mail";

export async function GET() {
  try {
    await connectToDatabase();

    const now = new Date();
    const threeDaysAgo = new Date(now);
    threeDaysAgo.setDate(now.getDate() - 3);

    // ✅ Find completed payments that have expired but not yet marked as expired
    const expiredPayments = await Payment.find({
      expiresAt: { $lte: now },
      status: "completed",
    }).populate("userId roomId");

    if (expiredPayments.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No expired subscriptions found.",
      });
    }

    for (const payment of expiredPayments) {
      const user = payment.userId as any;
      const room = payment.roomId as any;
      if (!user || !room) continue;

      // Mark payment as expired
      payment.status = "expired";
      await payment.save();

      const expiredAt = new Date(payment.expiresAt);
      const daysSinceExpiry =
        Math.floor((now.getTime() - expiredAt.getTime()) / (1000 * 60 * 60 * 24));

      // ⚙️ If expired for 3+ days, mark the room as available again
      if (daysSinceExpiry >= 3) {
        await Room.findByIdAndUpdate(room._id, {
          status: "available",
          lockStatus: "locked",
        });

        // 🧩 Create forfeiture notification
        const forfeitNotification = await Notification.create({
          title: "Room Booking Forfeited",
          message: `Your booking for "${room.name}" has been forfeited after 3 days without renewal. The room is now available for new bookings.`,
          type: "payment",
          audience: "user",
          userId: user._id,
        });

        broadcast(JSON.stringify({ notification: forfeitNotification }), {
          audience: "user",
          userId: user._id.toString(),
        });

        // 💌 Send forfeiture email
        const html = `
          <div style="font-family:'Segoe UI', Arial, sans-serif; background-color:#f9fafb; padding:40px 0; color:#333;">
            <div style="max-width:600px; margin:auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 3px 10px rgba(0,0,0,0.08);">
              
              <!-- Header -->
              <div style="background:linear-gradient(135deg, #991b1b, #b91c1c); color:#fff; padding:30px 20px; text-align:center;">
                <img 
                  src="https://res.cloudinary.com/dtytb8qrc/image/upload/v1761591015/home_yevjdg.png" 
                  alt="WunkatHomes Logo" 
                  style="width:60px; height:60px; margin-bottom:10px; border-radius:8px; background:#fff; padding:6px;"
                />
                <h1 style="margin:0; font-size:22px; font-weight:600;">WunkatHomes</h1>
                <p style="margin:6px 0 0; font-size:14px; opacity:0.9;">Booking Forfeited</p>
              </div>

              <!-- Content -->
              <div style="padding:32px;">
                <h2 style="font-size:18px; margin:0 0 12px; color:#111827;">Hi ${user.name},</h2>
                <p style="margin:0 0 16px; font-size:15px; line-height:1.6;">
                  Your subscription for <strong>${room.name}</strong> expired on 
                  <strong>${expiredAt.toDateString()}</strong> and has not been renewed within the 3-day grace period.
                </p>

                <p style="margin:0 0 18px; font-size:15px; line-height:1.6;">
                  Your booking has now been <strong>forfeited</strong>, and the room has been made available for new tenants.
                </p>

                <a href="https://wunkathomes.com/dashboard" 
                  style="display:inline-block; background:#991b1b; color:#fff; text-decoration:none; 
                  padding:12px 28px; border-radius:6px; font-weight:500; margin:10px 0;">
                  Browse Available Rooms
                </a>

                <p style="margin-top:24px; font-size:14px; color:#6b7280;">
                  If this was a mistake or you wish to rebook, please contact our support team.
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
          to: user.email,
          subject: "Room Booking Forfeited - WunkatHomes",
          html,
        });
      } else {
        // 💌 Send standard "subscription expired" email if within 3 days
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
                <p style="margin:6px 0 0; font-size:14px; opacity:0.9;">Subscription Expired</p>
              </div>

              <!-- Content -->
              <div style="padding:32px;">
                <h2 style="font-size:18px; margin:0 0 12px; color:#111827;">Hi ${user.name},</h2>
                <p style="margin:0 0 16px; font-size:15px; line-height:1.6;">
                  Your subscription for <strong>${room.name}</strong> expired on 
                  <strong>${expiredAt.toDateString()}</strong>.
                </p>

                <p style="margin:0 0 18px; font-size:15px; line-height:1.6;">
                  Please renew within the next <strong>${3 - daysSinceExpiry} day(s)</strong> 
                  to avoid forfeiting your booking.
                </p>

                <a href="https://wunkathomes.com/dashboard/renewal" 
                  style="display:inline-block; background:#111827; color:#fff; text-decoration:none; 
                  padding:12px 28px; border-radius:6px; font-weight:500; margin:10px 0;">
                  Renew Subscription
                </a>
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
          to: user.email,
          subject: "Subscription Expired - Renew Now to Keep Your Room",
          html,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${expiredPayments.length} expired subscriptions.`,
    });
  } catch (error) {
    console.error("❌ Error checking expired subscriptions:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
