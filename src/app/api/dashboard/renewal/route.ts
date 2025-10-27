import { NextResponse } from "next/server";
import { connectToDatabase } from "@/config/DbConnect";
import Payment from "@/models/Payment";
import Room from "@/models/Room";
import House from "@/models/House";

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId parameter" },
        { status: 400 }
      );
    }

    // 🔹 Find the latest completed payment (even if expired)
    const latestPayment = await Payment.findOne({
      userId,
      status: "completed",
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "roomId",
        populate: {
          path: "houseId",
          model: House,
          select: "name location amenities smartLockSupport",
        },
      });

    if (!latestPayment) {
      return NextResponse.json({ active: false, room: null, payment: null });
    }

    const room = latestPayment.roomId as any;
    const house = room?.houseId as any;

    // 🔹 Determine if payment has expired
    const isExpired = new Date(latestPayment.expiresAt) < new Date();

    return NextResponse.json({
      active: !isExpired,
      expired: isExpired,
      room: {
        _id: room._id,
        name: room.name,
        price: room.price,
        status: room.status,
        beds: room.beds,
        baths: room.baths,
        smartLockEnabled: room.smartLockEnabled,
        lockStatus: room.lockStatus,
        planType: room.planType,
        images: room.images,
      },
      house: house
        ? {
            _id: house._id,
            name: house.name,
            location: house.location,
            amenities: house.amenities || [],
            smartLockSupport: house.smartLockSupport || false,
          }
        : null,
      payment: {
        _id: latestPayment._id,
        expiresAt: latestPayment.expiresAt,
        amount: latestPayment.amount,
        reference: latestPayment.reference,
        createdAt: latestPayment.createdAt,
      },
    });
  } catch (error: any) {
    console.error("❌ Error fetching renewal data:", error);
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}
