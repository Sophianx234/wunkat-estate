// src/app/api/properties/insights/route.ts
import { NextResponse } from "next/server";
import House from "@/models/House";
import Room from "@/models/Room";
import Payment from "@/models/Payment";
import { connectToDatabase } from "@/config/DbConnect";

export async function GET() {
  try {
    await connectToDatabase();

    const houses = await House.find();

    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const insights = await Promise.all(
      houses.map(async (house) => {
        const rooms = await Room.find({ houseId: house._id });
        const totalRooms = rooms.length;
        const bookedRooms = rooms.filter((r) => r.status === "booked").length;
        const occupancy =
          totalRooms > 0 ? Math.round((bookedRooms / totalRooms) * 100) : 0;

        const roomIds = rooms.map((r) => r._id);

        // Revenue this month
        const paymentsThisMonth = await Payment.find({
          roomId: { $in: roomIds },
          status: "completed",
          createdAt: { $gte: startOfThisMonth },
        });

        // Revenue last month
        const paymentsLastMonth = await Payment.find({
          roomId: { $in: roomIds },
          status: "completed",
          createdAt: { $gte: startOfLastMonth, $lt: startOfThisMonth },
        });

        const revenueThisMonth = paymentsThisMonth.reduce(
          (sum, p) => sum + p.amount,
          0
        );
        const revenueLastMonth = paymentsLastMonth.reduce(
          (sum, p) => sum + p.amount,
          0
        );

        const growth =
          revenueLastMonth > 0
            ? Math.round(
                ((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100
              )
            : 0;

        return {
          _id: house._id,
          name: house.name,
          city: house.location.city,
          occupancy,
          revenue: revenueThisMonth,
          growth,
        };
      })
    );

    // Sort by revenue descending and return top 3
    insights.sort((a, b) => b.revenue - a.revenue);

    return NextResponse.json(insights.slice(0, 3), { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching property insights:", error);
    return NextResponse.json(
      { error: "Failed to load property insights" },
      { status: 500 }
    );
  }
}
