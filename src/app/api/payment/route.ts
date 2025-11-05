// /api/payments/verify.ts
import { connectToDatabase } from "@/config/DbConnect";
import House from "@/models/House";
import Payment from "@/models/Payment";
import Room from "@/models/Room";
import { NextRequest, NextResponse } from "next/server";
import Notification from "@/models/Notification";
import { broadcast } from "@/lib/sse"; // ✅ same broadcast function you use in the house route
import User from "@/models/User";
import { sendMail } from "@/lib/mail";

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
   const room = await Room.findByIdAndUpdate(roomId, {
      status: 'booked',
      expiresAt,
    });

    // 🧩 Create Notification
    const notification = await Notification.create({
      title: "New Payment Completed",
      message: `A payment of ₵${amount} has been received for room ${room.name}.`,
      type: "payment",
      audience: "user", // or "all" if users should see it too
      userId,
    });

    // 🧩 Broadcast via SSE
    broadcast(
      JSON.stringify({
       notification
      }),{audience: notification.audience, userId }

    );

    // ✅ Get user details
const user = await User.findById(userId);
if (!user) {
  console.warn("⚠️ User not found for payment email:", userId);
}


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
        <h1 style="margin:0; font-size:22px; font-weight:600;">Payment Confirmation</h1>
        <p style="margin:6px 0 0; font-size:14px; opacity:0.9;">WunkatHomes</p>
      </div>

      <!-- Content -->
      <div style="padding:32px;">
        <h2 style="font-size:18px; margin:0 0 12px; color:#111827;">Hi ${user?.name || "Valued Customer"},</h2>
        <p style="margin:0 0 18px; font-size:15px; line-height:1.6;">
          We’re happy to inform you that your payment of 
          <strong>₵${amount}</strong> for your room booking has been successfully received and verified.
        </p>

        <div style="background:#f9fafb; padding:16px; border-radius:8px; margin:18px 0; border:1px solid #e5e7eb;">
          <p style="margin:6px 0; font-size:14px;"><strong>Payment Reference:</strong> ${reference}</p>
          <p style="margin:6px 0; font-size:14px;"><strong>Payment Method:</strong> ${paymentMethod}</p>
          <p style="margin:6px 0; font-size:14px;"><strong>Duration:</strong> ${duration} month(s)</p>
          <p style="margin:6px 0; font-size:14px;"><strong>Expires On:</strong> ${expiresAt.toDateString()}</p>
        </div>

        <p style="font-size:15px; line-height:1.6;">
          Thank you for choosing <strong>WunkatHomes</strong>. You can view your booking details anytime by logging into your dashboard.
        </p>

        <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/bookings"
           style="display:inline-block; background:#111827; color:#fff; text-decoration:none; 
           padding:12px 28px; border-radius:6px; font-weight:500; margin-top:20px;">
          View Booking
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

if (user?.email) {
  try {
    await sendMail({
      to: user.email,
      subject: "Payment Confirmation - WunkatHomes",
      html,
    });
    console.log(`✅ Payment confirmation email sent to ${user.email}`);
  } catch (err) {
    console.error("❌ Failed to send payment confirmation email:", err);
  }
}


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
