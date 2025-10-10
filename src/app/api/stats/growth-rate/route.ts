import { NextResponse } from "next/server";
import Payment from "@/models/Payment";
import { connectToDatabase } from "@/config/DbConnect";

export async function GET() {
  await connectToDatabase();

  const now = new Date();

  // --- 1️⃣ Define date boundaries
  const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  // --- 2️⃣ Get total revenue for this month
  const thisMonthRevenue = await Payment.aggregate([
    {
      $match: {
        status: "completed",
        createdAt: { $gte: firstDayThisMonth },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);

  // --- 3️⃣ Get total revenue for last month
  const lastMonthRevenue = await Payment.aggregate([
    {
      $match: {
        status: "completed",
        createdAt: {
          $gte: firstDayLastMonth,
          $lt: firstDayThisMonth,
        },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);

  const thisMonth = thisMonthRevenue[0]?.total || 0;
  const lastMonth = lastMonthRevenue[0]?.total || 0;

  // --- 4️⃣ Compute growth rate
  const growthRate =
    lastMonth > 0 ? ((thisMonth - lastMonth) / lastMonth) * 100 : 0;

  const trendDirection = growthRate >= 0 ? "up" : "down";

  // --- 5️⃣ Friendly note based on trend
  const note =
    trendDirection === "up"
      ? "Steady performance increase"
      : "Revenue decreased this month";

  // --- 6️⃣ Return JSON response
  return NextResponse.json({
    growthRate: growthRate.toFixed(2),
    trendDirection,
    note,
    thisMonthRevenue: thisMonth,
    lastMonthRevenue: lastMonth,
  });
}
