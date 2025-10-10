import { NextResponse } from "next/server";
import Payment from "@/models/Payment";
import { connectToDatabase } from "@/config/DbConnect";

export async function GET() {
  try {
    await connectToDatabase();

    // ---------- TOTAL REVENUE ----------
    const totalRevenue = await Payment.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // ---------- GROWTH CALCULATION ----------
    const now = new Date();
    const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const thisMonthRevenue = await Payment.aggregate([
      { $match: { status: "completed", createdAt: { $gte: firstDayThisMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const lastMonthRevenue = await Payment.aggregate([
      { 
        $match: { 
          status: "completed", 
          createdAt: { $gte: firstDayLastMonth, $lt: firstDayThisMonth } 
        } 
      },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const growthRate =
      lastMonthRevenue[0]?.total
        ? (((thisMonthRevenue[0]?.total || 0) - lastMonthRevenue[0]?.total) /
            lastMonthRevenue[0]?.total) * 100
        : 0;

    const trendDirection = growthRate >= 0 ? "up" : "down";
    const trendMessage =
      growthRate >= 0 ? "Trending up this month" : "Trending down this month";

    return NextResponse.json({
      totalRevenue: totalRevenue[0]?.total || 0,
      growthRate: growthRate.toFixed(2),
      trendDirection,
      trendMessage
    });
  } catch (error) {
    console.error("❌ Total Revenue stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch total revenue stats" },
      { status: 500 }
    );
  }
}
