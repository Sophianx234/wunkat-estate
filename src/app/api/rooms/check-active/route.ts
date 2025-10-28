import { NextRequest, NextResponse } from "next/server";
import Payment from "@/models/Payment";
import { connectToDatabase } from "@/config/DbConnect";
import Room from "@/models/Room";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Missing user ID" },
        { status: 400 }
      );
    }

    // 🔍 Find active (not expired) completed booking and populate room details
    const activeBooking = await Payment.findOne({
      userId,
      status: "completed",
      expiresAt: { $gte: new Date() },
    }).populate("roomId");

    if (activeBooking && activeBooking.roomId) {
      const room = activeBooking.roomId;

      // 🧩 Include more detailed info from the room model
      return NextResponse.json({
        success: true,
        active: true,
        room: {
          id: room._id,
          name: room.name,
          price: room.price,
          planType: room.planType,
          baths: room.baths,
          beds: room.beds,
          size: room.size,
          status: room.status,
          amenities: room.amenities,
          smartLockSupport: room.smartLockSupport,
          images: room.images || [],
          location: room.location
            ? {
                address: room.location.address,
                city: room.location.city,
                region: room.location.region,
              }
            : null,
          bookedUntil: activeBooking.expiresAt,
        },
      });
    }

    // If no active booking found
    return NextResponse.json({
      success: true,
      active: false,
      room: null,
    });
  } catch (error) {
    console.error("❌ Error checking active booking:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
