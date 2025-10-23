import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/config/DbConnect";
import Visitor from "@/models/Visitor";
import User from "@/models/User";
import dayjs from "dayjs";

// Month labels
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];


export async function GET(req:NextRequest) {
  await connectToDatabase();

  const thisYear = new Date().getFullYear();
  const lastYear = thisYear - 1;

  // 🧮 Aggregate counts per day
  const [thisYearData, lastYearData] = await Promise.all([
    Visitor.aggregate([
      { $match: { createdAt: { $gte: new Date(`${thisYear}-01-01`), $lte: new Date() } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]),
    Visitor.aggregate([
      { $match: { createdAt: { $gte: new Date(`${lastYear}-01-01`), $lte: new Date(`${lastYear}-12-31`) } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]),
  ]);

  // 🗓 Create all dates for this year
  const startDate = dayjs(`${thisYear}-01-01`);
  const endDate = dayjs();
  const days = [];

  for (let d = startDate; d.isBefore(endDate) || d.isSame(endDate, "day"); d = d.add(1, "day")) {
    days.push(d.format("YYYY-MM-DD"));
  }

  // 📊 Merge both datasets with missing dates filled as 0
  const lastYearMap = Object.fromEntries(lastYearData.map(d => [d._id, d.count]));
  const thisYearMap = Object.fromEntries(thisYearData.map(d => [d._id, d.count]));

  const merged = days.map(date => ({
    date,
    lastYear: lastYearMap[dayjs(date).subtract(1, "year").format("YYYY-MM-DD")] || 0,
    thisYear: thisYearMap[date] || 0,
  }));

  return NextResponse.json(merged);
}




export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing visitor ID" }, { status: 400 });
    }

    // Find the visitor by ID
    const existingVisitor = await Visitor.findOne({ visitorId: id });

    if (existingVisitor) {
      // Update returning visitor
      existingVisitor.visits += 1;
      existingVisitor.lastVisit = new Date();
      await existingVisitor.save();

      return NextResponse.json({
        message: "Returning visitor updated",
        visitor: existingVisitor,
      });
    }

    // Create a new visitor
    const newVisitor = await Visitor.create({
      visitorId: id,
      firstVisit: new Date(),
      lastVisit: new Date(),
      visits: 1,
    });

    return NextResponse.json({
      message: "New visitor recorded",
      visitor: newVisitor,
    });
  } catch (error) {
    console.error("Error tracking visitor:", error);
    return NextResponse.json({ error: "Failed to track visitor" }, { status: 500 });
  }
}
