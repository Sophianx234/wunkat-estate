import { NextResponse } from "next/server";
import { connectToDatabase } from "@/config/DbConnect";
import Room from "@/models/Room";
import Payment from "@/models/Payment";

export async function GET() {
  try {
    await connectToDatabase();

    const now = new Date();
    const year = now.getFullYear();
    const prevYear = year - 1;

    // 1️⃣ Get total number of rooms (for percentage calculations)
    const totalRooms = await Room.countDocuments();

    if (totalRooms === 0) {
      return NextResponse.json({
        labels: [],
        current: [],
        previous: [],
        message: "No rooms found in the system.",
      });
    }

    // Helper: function to compute monthly booked rooms for a given year
    const getMonthlyOccupancy = async (targetYear: number) => {
      const monthlyRates: number[] = [];

      for (let month = 0; month < 12; month++) {
        const start = new Date(targetYear, month, 1);
        const end = new Date(targetYear, month + 1, 1);

        // Find completed payments for rooms booked within this month
        const bookedRooms = await Payment.find({
          status: "completed",
          createdAt: { $gte: start, $lt: end },
        }).distinct("roomId");

        const occupancyRate = ((bookedRooms.length / totalRooms) * 100).toFixed(2);
        monthlyRates.push(parseFloat(occupancyRate));
      }

      return monthlyRates;
    };

    // 2️⃣ Compute rates for current and previous year
    const currentYearRates = await getMonthlyOccupancy(year);
    const previousYearRates = await getMonthlyOccupancy(prevYear);

    // 3️⃣ Prepare month labels
    const monthLabels = [
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

    // 4️⃣ Compute growth rate vs same month last year
    const latest = currentYearRates[now.getMonth()];
    const previous = previousYearRates[now.getMonth()] || 0;
    const growthRate =
      previous > 0 ? (((latest - previous) / previous) * 100).toFixed(2) : "0.00";

    const isUp = parseFloat(growthRate) >= 0;

    const trendMessage = isUp
      ? `Occupancy is up ${growthRate}% compared to last year.`
      : `Occupancy is down ${Math.abs(parseFloat(growthRate))}% compared to last year.`;

    // 5️⃣ Return data
    return NextResponse.json({
      labels: monthLabels,
      current: currentYearRates,
      previous: previousYearRates,
      growthRate,
      trendDirection: isUp ? "up" : "down",
      trendMessage,
      latestRate: latest,
    });
  } catch (error) {
    console.error("❌ Occupancy Trend API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch occupancy trend data" },
      { status: 500 }
    );
  }
}
