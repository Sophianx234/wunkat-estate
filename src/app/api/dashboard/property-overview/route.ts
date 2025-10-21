import { NextResponse } from "next/server";
import House from "@/models/House";
import Room from "@/models/Room";
import Payment from "@/models/Payment";
import { connectToDatabase } from "@/config/DbConnect";

export async function GET() {
  try {
    await connectToDatabase();

    // Fetch all houses
    const houses = await House.find();

    const results = [];

    for (const house of houses) {
      // ✅ Get all rooms belonging to this house
      const rooms = await Room.find({ houseId: house._id });
      const totalRooms = rooms.length;

      // ✅ Count booked rooms
      const bookedRooms = rooms.filter((r) => r.status === "booked").length;

      // ✅ Occupancy rate
      const occupancyRate =
        totalRooms > 0 ? Math.round((bookedRooms / totalRooms) * 100) : 0;

      // ✅ Get total revenue for rooms in this house
      const payments = await Payment.find({
        roomId: { $in: rooms.map((r) => r._id) },
        status: "completed",
      });

      const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

      // ✅ Push formatted data
      results.push({
        name: house.name,
        city: house.location.city,
        smartLock: house.smartLockSupport || false,
        occupancy: `${occupancyRate}%`,
        units: `${bookedRooms} / ${totalRooms}`,
        revenue: `₵${totalRevenue.toLocaleString()}`,
      });
    }

    return NextResponse.json(results, { status: 200 });
  } catch (err) {
    console.error("❌ Error fetching property overview:", err);
    return NextResponse.json(
      { error: "Failed to load property overview" },
      { status: 500 }
    );
  }
}
