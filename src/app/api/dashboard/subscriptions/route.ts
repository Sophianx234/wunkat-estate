import { NextResponse } from "next/server";
import { connectToDatabase } from "@/config/DbConnect";
import User from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();

    const now = new Date();
    const currentYear = now.getFullYear();
    const lastYear = currentYear - 1;

    // 🧩 Fetch all users created in current and previous year
    const users = await User.find({
      createdAt: {
        $gte: new Date(`${lastYear}-01-01`),
        $lte: new Date(`${currentYear}-12-31`),
      },
    }).select("createdAt");

    const currentYearData = Array(12).fill(0);
    const previousYearData = Array(12).fill(0);

    users.forEach((user) => {
      const date = new Date(user.createdAt);
      const month = date.getMonth();
      const year = date.getFullYear();

      if (year === currentYear) currentYearData[month] += 1;
      else if (year === lastYear) previousYearData[month] += 1;
    });

    // 🧾 Calculate total and growth
    const totalThisYear = currentYearData.reduce((a, b) => a + b, 0);
    const totalLastYear = previousYearData.reduce((a, b) => a + b, 0);

    const growthRate =
      totalLastYear === 0
        ? 100
        : (((totalThisYear - totalLastYear) / totalLastYear) * 100).toFixed(1);

    return NextResponse.json({
      success: true,
      data: {
        currentYear,
        lastYear,
        totalThisYear,
        totalLastYear,
        growthRate,
        currentYearData,
        previousYearData,
      },
    });
  } catch (error) {
    console.error("Error fetching monthly stats:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch monthly stats" },
      { status: 500 }
    );
  }
}
