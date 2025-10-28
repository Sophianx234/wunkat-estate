import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/config/DbConnect";
import Notification from "@/models/Notification";
import { broadcast } from "@/lib/sse";
import mongoose from "mongoose";
// adjust this to your JWT verification util

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role") || "user";
    const userId = searchParams.get("userId");

    let filter: any = {};

    if (role === "admin") {
      // Admins see only admin or global notifications
      filter = { audience: { $in: ["admin", "all"] } };
    } else {
      // Regular users:
      // Show notifications intended for "user"
      // Where userId is either not set (global user message) or matches this user
      filter = {
        audience: "user",
        $or: [
          { userId: { $exists: false } },
          { userId: { $eq: null } },
          { userId: userId ? new mongoose.Types.ObjectId(userId) : undefined },
        ].filter(Boolean),
      };
    }

    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, notifications });
  } catch (error) {
    console.error("❌ Error fetching notifications:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch notifications" },
      { status: 500 }
    );
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
    
        // 🧩 Broadcast the message to connected clients via SSE
       broadcast(JSON.stringify({
      notification
    }),{audience: notification.audience});

    return NextResponse.json({ success: true, notification });
  } catch (error) {
    console.error("Error creating notification:", error);
    return NextResponse.json({ success: false, error: "Failed to create notification" }, { status: 500 });
  }
}


