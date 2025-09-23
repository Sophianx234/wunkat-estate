import { connectToDatabase } from "@/config/DbConnect";
import Payment from "@/models/Payment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{ params }: { params: { id: string } }){
  connectToDatabase()
  const { id: userId } = params;
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  
// Get all transactions for a user
const transactions = await Payment.find({ userId })
  .sort({ createdAt: -1 }) // newest first
  .populate("roomId", "name price city"); // if you want room details
console.log('transactions',transactions)
return NextResponse.json(transactions,{status:200})
}
