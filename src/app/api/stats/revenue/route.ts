import { NextRequest, NextResponse } from "next/server";
import House from "@/models/House";
import Room from "@/models/Room";
import { connectToDatabase } from "@/config/DbConnect";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    console.log("Connected to database");

    // ✅ Calculate date 6 months ago
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    // ✅ Group houses created in the last 6 months
    const houses = await House.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo, $type: "date" },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          totalHouses: { $sum: 1 },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    // ✅ Group rooms created in the last 6 months
    const rooms = await Room.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo, $type: "date" },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          totalRooms: { $sum: 1 },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    // ✅ Month names
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // ✅ Get last 6 months dynamically
    const currentMonthIndex = now.getMonth();
    const lastSixMonths = Array.from({ length: 6 }, (_, i) =>
      (currentMonthIndex - 5 + i + 12) % 12
    );

    // ✅ Merge data for those months only
    const merged = lastSixMonths.map((monthIndex) => {
      const monthNum = monthIndex + 1;
      const houseCount =
        houses.find((h) => h._id.month === monthNum)?.totalHouses || 0;
      const roomCount =
        rooms.find((r) => r._id.month === monthNum)?.totalRooms || 0;
      return {
        month: months[monthIndex],
        houses: houseCount,
        rooms: roomCount,
      };
    });

    return NextResponse.json({ success: true, data: merged });
  } catch (error: any) {
    console.error("Revenue API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
