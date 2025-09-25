
import { connectToDatabase } from "@/config/DbConnect";
import House from "@/models/House";
import Payment from "@/models/Payment";
import Room from "@/models/Room";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  await connectToDatabase();

  const { id: userId } = await context.params;
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const transactions = await Payment.find({ userId })
  .sort({ createdAt: -1 })
  .populate({
    path: "roomId",
    model: Room, // 👈 explicitly tell mongoose which model
    populate: {
      path: "houseId",
      model: House, // 👈 nested populate House
    },
  });

    
    

  return NextResponse.json(transactions, { status: 200 });
}
