import { NextResponse } from "next/server";
import Payment from "@/models/Payment";
import { connectToDatabase } from "@/config/DbConnect";

export async function GET() {
  await connectToDatabase();

  const now = new Date();

  // --- 1️⃣ Current active accounts (completed & not expired)
  const activeNow = await Payment.countDocuments({
    status: "completed",
    expiresAt: { $gte: now },
  });

  // --- 2️⃣ Active accounts last month (completed & not expired a month ago)
  const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const activeLastMonth = await Payment.countDocuments({
    status: "completed",
    createdAt: { $gte: firstDayLastMonth, $lt: firstDayThisMonth },
  });

  // --- 3️⃣ Calculate growth rate
  const growthRate =
    activeLastMonth > 0
      ? (((activeNow - activeLastMonth) / activeLastMonth) * 100).toFixed(2)
      : "0.00";

  const trendDirection = parseFloat(growthRate) >= 0 ? "up" : "down";

  // --- 4️⃣ Friendly message
  const note =
    trendDirection === "up"
      ? "Strong user retention"
      : "User activity has dropped — check engagement";

  // --- 5️⃣ Return response
  return NextResponse.json({
    activeAccounts: activeNow,
    growthRate,
    trendDirection,
    note,
  });
}
