import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Payment from "@/models/Payment";
import User from "@/models/User";
import Room from "@/models/Room";
import House from "@/models/House";
import { connectToDatabase } from "@/config/DbConnect";

export async function GET() {
  try {
    await connectToDatabase();

    // 🧩 Populate the relationships
    const transactions = await Payment.find()
      .populate({
        path: "userId",
        select: "name avatar profile", // tenant details
      })
      .populate({
        path: "roomId",
        populate: {
          path: "houseId",
          select: "name location",
        },
      })
      .sort({ createdAt: -1 }) // latest first
      .limit(5); // recent 5 transactions

    // 🧠 Map into frontend-friendly format
    const formatted = transactions.map((tx) => ({
      id: tx._id.toString(),
      name: tx.userId?.name || "Unknown Tenant",
      avatar: tx.userId?.avatar || tx.userId?.profile || "/images/user-default.png",
      date: new Date(tx.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      propertyType: tx.roomId?.planType === "yearly" ? "Commercial" : "Residential",
      propertyName:
        tx.roomId?.houseId?.name ||
        tx.roomId?.name ||
        "Unnamed Property",
      status: tx.status === "completed" ? "Paid" : "Cancel",
      price: `${tx.currency === "Cedi" ? "₵" : "$"}${tx.amount.toLocaleString()}`,
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to load transactions", details: error.message },
      { status: 500 }
    );
  }
}
