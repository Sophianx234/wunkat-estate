import { NextResponse } from "next/server";
import User from "@/models/User";
import Room from "@/models/Room";
import Payment from "@/models/Payment";
import { connectToDatabase } from "@/config/DbConnect";

export async function GET() {
  try {
    await connectToDatabase();

    const now = new Date();
    const last30Days = new Date(now);
    last30Days.setDate(now.getDate() - 30);

    // 1️⃣ NEW SUBSCRIPTIONS (Users created recently)
    const newUsersCount = await User.countDocuments({
      createdAt: { $gte: last30Days },
    });
    const totalUsers = await User.countDocuments();

    const userChangePercent =
      totalUsers === 0
        ? 0
        : ((newUsersCount / totalUsers) * 100).toFixed(2);

    // 2️⃣ TOTAL REVENUE (only completed payments)
    const payments = await Payment.find({ status: "completed" });
    const totalRevenue = payments.reduce(
      (sum, payment) => sum + (payment.amount || 0),
      0
    );

    // Compare last 30 days revenue with the previous 30 days
    const recentRevenue = payments
      .filter((p) => new Date(p.createdAt) >= last30Days)
      .reduce((sum, p) => sum + p.amount, 0);

    const oldRevenue = totalRevenue - recentRevenue;
    const revenueChange =
      oldRevenue === 0 ? 100 : ((recentRevenue - oldRevenue) / oldRevenue) * 100;

    // 3️⃣ AVG RENT PER ROOM
    const rooms = await Room.find();
    const avgRent =
      rooms.length > 0
        ? rooms.reduce((sum, room) => sum + (room.price || 0), 0) / rooms.length
        : 0;

    // Generate random rent change % (you can later compute this based on historical data)
    const rentChange = Math.random() * 15 - 7.5; // between -7.5% and +7.5%

    // Helper: generate mock trend data (for your line chart)
    const generateTrend = (base: number) =>
      Array.from({ length: 7 }, (_, i) =>
        Math.max(0, Math.round(base + (Math.random() - 0.5) * base * 0.15))
      );

    // Build API response
    const data = {
      newSubscriptions: {
        title: "New Subscriptions",
        value: newUsersCount,
        trendData: generateTrend(newUsersCount || 5),
        changePercent: parseFloat(userChangePercent as string),
      },
      totalRevenue: {
        title: "Total Revenue",
        value: totalRevenue,
        trendData: generateTrend(totalRevenue / 100 || 10),
        changePercent: parseFloat(revenueChange.toFixed(2)),
      },
      avgRent: {
        title: "Avg Rent per Room",
        value: parseFloat(avgRent.toFixed(2)),
        trendData: generateTrend(avgRent || 1000),
        changePercent: parseFloat(rentChange.toFixed(2)),
      },
    };

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    return NextResponse.json(
      { message: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
