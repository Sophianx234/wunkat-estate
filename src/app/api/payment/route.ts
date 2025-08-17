// /api/payments/verify.ts
import { NextRequest, NextResponse } from "next/server";
import Payment from "@/models/Payment";
import Room from "@/models/Room";
import { connectToDatabase } from "@/config/DbConnect";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { reference, userId, roomId, amount, duration } = await req.json();

    // ✅ Verify with Paystack
    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    });
    const data = await res.json();

    if (!data.status || data.data.status !== "success") {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    // ✅ Calculate expiry date
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + duration); // e.g. 1 month rent

    // ✅ Save Payment
    const payment = await Payment.create({
      userId,
      roomId,
      amount,
      reference,
      status: "success",
      expiresAt,
    });

    // ✅ Update Room
    await Room.findByIdAndUpdate(roomId, {
      available: false,
      expiresAt,
    });

    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
