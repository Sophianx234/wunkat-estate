import { NextRequest, NextResponse } from "next/server";
import Payment from "@/models/Payment";
import Room from "@/models/Room";
import House from "@/models/House";
import User from "@/models/User";
import { connectToDatabase } from "@/config/DbConnect";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { search = "", rentStatus = "", lockStatus = "" } = body;

    const now = new Date();
    const soon = new Date();
    soon.setDate(now.getDate() + 7);

    // 🔎 Step 1: Build base query (only on Payment fields)
    let query: any = {};

    if (rentStatus === "active") {
      query.expiresAt = { $gte: now };
    } else if (rentStatus === "due_soon") {
      query.expiresAt = { $gte: now, $lte: soon };
    } else if (rentStatus === "expired") {
      query.expiresAt = { $lt: now };
    }

    // 🔎 Step 2: Fetch + populate
    let payments = await Payment.find(query)
      .sort({ createdAt: -1 })
      .populate({
        path: "roomId",
        model: Room,
        populate: { path: "houseId", model: House },
      })
      .populate({ path: "userId", model: User });

    // 🔎 Step 3: Apply search + lockStatus filtering on populated docs
    if (search) {
      const regex = new RegExp(search, "i");
      payments = payments.filter(
        (p) =>
          regex.test(p.userId?.name || "") ||
          regex.test(p.userId?.email || "") ||
          regex.test(p.roomId?.name || "")
      );
    }

    if (lockStatus) {
      payments = payments.filter(
        (p) => p.roomId?.lockStatus === lockStatus
      );
    }
    console.log('body',body)
    console.log('filtered payments',payments)

    return NextResponse.json(payments, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching payments:", error);
    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}
