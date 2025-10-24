import { NextResponse } from "next/server";
import { connectToDatabase } from "@/config/DbConnect";
import Notification from "@/models/Notification";

// GET — fetch all notifications
export async function GET() {
  try {
    await connectToDatabase();

    const notifications = await Notification.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch notifications" }, { status: 500 });
  }
}

// POST — create a new notification
export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { title, message, type, audience } = await request.json();

    if (!title || !message)
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });

    const notification = await Notification.create({
      title,
      message,
      type: type || "system",
      audience: audience || "all",
    });

    return NextResponse.json({ success: true, notification });
  } catch (error) {
    console.error("Error creating notification:", error);
    return NextResponse.json({ success: false, error: "Failed to create notification" }, { status: 500 });
  }
}
