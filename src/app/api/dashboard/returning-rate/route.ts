// src/app/api/insights/returning-rate/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/config/DbConnect";
import Payment from "@/models/Payment";

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const selectedYear = parseInt(searchParams.get("year") || "2025", 10);
    const previousYear = selectedYear - 1;

    // Helper to fetch monthly totals for a given year
    const getYearlyRevenue = async (year: number) => {
      const result = await Payment.aggregate([
        {
          $match: {
            status: "completed",
            createdAt: {
              $gte: new Date(`${year}-01-01`),
              $lt: new Date(`${year + 1}-01-01`),
            },
          },
        },
        {
          $group: {
            _id: { month: { $month: "$createdAt" } },
            total: { $sum: "$amount" },
          },
        },
        { $sort: { "_id.month": 1 } },
      ]);

      const months = Array.from({ length: 12 }, (_, i) => i + 1);
      return months.map((m) => {
        const found = result.find((r) => r._id.month === m);
        return found ? found.total : 0;
      });
    };

    // Fetch both years in parallel
    const [currentYearData, previousYearData] = await Promise.all([
      getYearlyRevenue(selectedYear),
      getYearlyRevenue(previousYear),
    ]);

    const labels = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    return NextResponse.json({
      labels,
      datasets: [
        {
          label: `Monthly rent revenue for ${selectedYear}`,
          data: currentYearData,
          borderColor: "#000000",
          backgroundColor: "#000000",
        },
        {
          label: `Monthly rent revenue for ${previousYear}`,
          data: previousYearData,
          borderColor: "#9CA3AF",
          backgroundColor: "#9CA3AF",
        },
      ],
    });
  } catch (error) {
    console.error("Error fetching returning rate:", error);
    return NextResponse.json(
      { message: "Failed to fetch returning rate" },
      { status: 500 }
    );
  }
}
