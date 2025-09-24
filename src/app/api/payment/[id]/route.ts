import { connectToDatabase } from "@/config/DbConnect";
import Payment from "@/models/Payment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,context: { params: { id: string } }){
  connectToDatabase()
  const { id:userId } = await context.params;
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  
  console.log('userId',userId)
// Get all transactions for a user
const transactions = await Payment.find({ userId })
  .sort({ createdAt: -1 }) // newest first
  .populate({
    path: "roomId",
    populate: {
      path: "houseId", // populate house inside room
    }
  }); // if you want room details
console.log('transactions',transactions)
return NextResponse.json(transactions,{status:200})
}
