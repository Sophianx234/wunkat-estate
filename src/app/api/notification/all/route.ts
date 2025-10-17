import { NextResponse } from "next/server";
import Notification from "@/models/Notification"; // your Mongoose model
import { connectToDatabase } from "@/config/DbConnect";

export async function GET() {
  try {
    await connectToDatabase();

    const notifications = await Notification.find({})
      .sort({ createdAt: -1 }) // newest first
      .lean();

    return NextResponse.json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}
