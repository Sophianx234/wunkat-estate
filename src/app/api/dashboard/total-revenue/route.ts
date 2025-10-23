// src/app/api/dashboard/total-revenue/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/config/DbConnect";
import Payment from "@/models/Payment";
import Room from "@/models/Room";
const monthNames = [
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

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const yearParam = searchParams.get("year");
    const year = yearParam ? parseInt(yearParam, 10) : new Date().getFullYear();

    // Fetch all completed payments within selected year
    const payments = await Payment.find({
      status: "completed",
      createdAt: {
        $gte: new Date(`${year}-01-01`),
        $lte: new Date(`${year}-12-31`),
      },
    }).populate("roomId");

    const monthlySmart = new Array(12).fill(0);
    const monthlyManual = new Array(12).fill(0);

    for (const p of payments) {
      const room: any = p.roomId;
      if (!room) continue;
      const month = new Date(p.createdAt).getMonth();
      const isSmart = room.smartLockEnabled;
      if (isSmart) monthlySmart[month] += p.amount;
      else monthlyManual[month] += p.amount;
    }

    const datasets = [
      {
        label: "Smart Lock Rooms",
        data: monthlySmart.slice(0, 6),
        backgroundColor: "#6B7280",
        borderRadius: 6,
        barThickness: 24,
      },
      {
        label: "Manual Lock Rooms",
        data: monthlyManual.slice(0, 6),
        backgroundColor: "#000000",
        borderRadius: 6,
        barThickness: 24,
      },
    ];

    const totalSmart = monthlySmart.reduce((a, b) => a + b, 0);
    const totalManual = monthlyManual.reduce((a, b) => a + b, 0);

    return NextResponse.json({
      labels: monthNames.slice(0, 6),
      datasets,
      totals: {
        smart: totalSmart,
        manual: totalManual,
      },
      year,
    });
  } catch (error) {
    console.error("Error fetching total revenue data:", error);
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}
