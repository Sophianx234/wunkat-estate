// 📁 src/app/api/dashboard/overview/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/config/DbConnect";
import House from "@/models/House";
import Room from "@/models/Room";
import Payment from "@/models/Payment";

export async function GET() {
  try {
    await connectToDatabase();

    // ✅ Fetch counts in parallel for better performance
    const [
      totalHouses,
      totalRooms,
      smartLockRooms,
      availableRooms,
      bookedRooms,
      pendingRooms,
      manuallyLockedRooms,
    ] = await Promise.all([
      // 🏠 Count total houses
      House.countDocuments(),

      // 🛏️ Count total rooms
      Room.countDocuments(),

      // 🧠 Rooms that have smart lock enabled
      Room.countDocuments({ smartLockEnabled: true }),

      // ✅ Available rooms
      Room.countDocuments({ status: "available" }),

      // ✅ Booked rooms
      Room.countDocuments({ status: "booked" }),

      // ✅ Pending rooms
      Room.countDocuments({ status: "pending" }),

      // 🔒 Manually locked rooms (smartLockEnabled false but lockStatus locked)
      Room.countDocuments({
        smartLockEnabled: false,
        lockStatus: "locked",
      }),
    ]);

    // 💰 Optional — total completed payments
    const totalCompletedPayments = await Payment.countDocuments({
      status: "completed",
    });

    // 📊 Build summary object
    const summary = {
      totalHouses,
      totalRooms,
      smartLockRooms,
      availableRooms,
      bookedRooms,
      pendingRooms,
      manuallyLockedRooms,
      totalCompletedPayments,
    };

    return NextResponse.json({ success: true, data: summary });
  } catch (error: any) {
    console.error("❌ Error fetching overview stats:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch overview stats" },
      { status: 500 }
    );
  }
}
