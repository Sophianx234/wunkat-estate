import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectToDatabase } from "@/config/DbConnect";

export async function GET() {
  try {
    await connectToDatabase();

    const now = new Date();
    const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // 🔹 Count new customers this month
    const thisMonthCustomers = await User.countDocuments({
      createdAt: { $gte: firstDayThisMonth }
    });

    // 🔹 Count new customers last month
    const lastMonthCustomers = await User.countDocuments({
      createdAt: { $gte: firstDayLastMonth, $lt: firstDayThisMonth }
    });

    // 🔹 Growth calculation
    const growthRate =
      lastMonthCustomers > 0
        ? ((thisMonthCustomers - lastMonthCustomers) / lastMonthCustomers) * 100
        : 0;

    const trendDirection = growthRate >= 0 ? "up" : "down";
    const trendMessage =
      growthRate >= 0
        ? `Up ${growthRate.toFixed(2)}% this period`
        : `Down ${Math.abs(growthRate).toFixed(2)}% this period`;

    return NextResponse.json({
      newCustomers: thisMonthCustomers,
      growthRate: growthRate.toFixed(2),
      trendDirection,
      trendMessage,
      note:
        trendDirection === "down"
          ? "customer acquisition dropped compared to last month"
          : "new customers increased compared to last month"
    });
  } catch (error) {
    console.error("❌ New Customers stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch new customers stats" },
      { status: 500 }
    );
  }
}
