// /api/payments/verify.ts
import { NextRequest, NextResponse } from "next/server";
import Payment from "@/models/Payment";
import Room from "@/models/Room";
import { connectToDatabase } from "@/config/DbConnect";
import next from "next";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { reference, userId, roomId, amount, duration } = await req.json();
    console.log('damina')
    console.log(reference,userId,roomId,amount,duration)

    // ✅ Verify with Paystack
    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_LIVE_KEY}` },
    });
    const data = await res.json();

    if (!data.status || data.data.status !== "success") {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    const paymentMethod = data.data.channel;
    console.log("Payment method:", paymentMethod);
    // ✅ Calculate expiry date
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + duration); // e.g. 1 month rent

    // ✅ Save Payment
    const payment = await Payment.create({
      userId,
      roomId,
      amount,
      reference,
      paymentMethod,
      status: "completed",
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

