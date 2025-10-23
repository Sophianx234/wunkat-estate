import { NextResponse } from "next/server";
import { connectToDatabase } from "@/config/DbConnect";
import Payment from "@/models/Payment";
import Room from "@/models/Room";

export async function GET() {
  try {
    await connectToDatabase();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // 💰 Total Revenue (all time)
    const totalRevenueAgg = await Payment.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    // 📅 This Month’s Revenue
    const monthlyRevenueAgg = await Payment.aggregate([
      {
        $match: {
          status: "completed",
          createdAt: { $gte: startOfMonth },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const monthlyRevenue = monthlyRevenueAgg[0]?.total || 0;

    // 🗓️ Last Month’s Revenue
    const lastMonthRevenueAgg = await Payment.aggregate([
      {
        $match: {
          status: "completed",
          createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const lastMonthRevenue = lastMonthRevenueAgg[0]?.total || 0;

    // 📈 Monthly Growth
    const monthlyGrowth =
      lastMonthRevenue === 0
        ? 100
        : ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;

    // 🔑 Active Subscriptions (rooms currently booked)
    const activeSubscriptions = await Room.countDocuments({ status: "booked" });

    // 🕒 Expired Subscriptions (rooms pending or available again)
    const expiredSubscriptions = await Room.countDocuments({
      status: { $in: ["available", "pending"] },
    });

    // 🔒 Auto-Locked Rooms
    const autoLockedRooms = await Room.countDocuments({ lockStatus: "locked" });

    return NextResponse.json({
      success: true,
      data: {
        totalRevenue,
        monthlyRevenue,
        activeSubscriptions,
        expiredSubscriptions,
        autoLockedRooms,
        monthlyGrowth: monthlyGrowth.toFixed(1),
      },
    });
  } catch (error: any) {
    console.error("Error fetching financial stats:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
