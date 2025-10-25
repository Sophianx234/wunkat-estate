// src/app/api/subscription/check-expiry/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/config/DbConnect";
import Payment from "@/models/Payment";
import Notification from "@/models/Notification";
import { broadcast } from "@/lib/sse";

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
