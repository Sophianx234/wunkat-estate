// /api/payments/verify.ts
import { connectToDatabase } from "@/config/DbConnect";
import House from "@/models/House";
import Payment from "@/models/Payment";
import Room from "@/models/Room";
import { NextRequest, NextResponse } from "next/server";
import Notification from "@/models/Notification";
import { broadcast } from "@/lib/sse"; // ✅ same broadcast function you use in the house route

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const { reference, userId, roomId, amount, duration } = await req.json();

    console.log(reference, userId, roomId, amount, duration);

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

    // 🧩 Create Notification
    const notification = await Notification.create({
      title: "New Payment Completed",
      message: `A payment of ₵${amount} has been received for room ${roomId}.`,
      type: "payment",
      audience: "admin", // or "all" if users should see it too
    });

    // 🧩 Broadcast via SSE
    broadcast(
      JSON.stringify({
       notification
      })
    );

    // ✅ Return response
    return NextResponse.json(
      {
        message: "Payment verified and recorded successfully",
        payment,
        notification,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



export async function GET(req: NextRequest) {
  await connectToDatabase();



  const transactions = await Payment.find()
  .sort({ createdAt: -1 }).populate('userId')
  .populate({
    path: "roomId",
    model: Room, // 👈 explicitly tell mongoose which model
    populate: {
      path: "houseId",
      model: House, // 👈 nested populate House
    },
  });

    
    

  return NextResponse.json(transactions, { status: 200 });
}
