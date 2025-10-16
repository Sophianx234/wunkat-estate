import { NextRequest, NextResponse } from "next/server";
import { broadcast } from "@/lib/sse";
import Notification from "@/models/Notification";
import { connectToDatabase } from "@/config/DbConnect";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const newNotif = await Notification.create({
      title: body.title,
      message: body.message,
      type: body.type || "system",
      audience: body.audience || "all",
      userId: body.userId || null,
    });

    // Broadcast the new notification
    broadcast(JSON.stringify({
      title: newNotif.title,
      message: newNotif.message,
      type: newNotif.type,
      createdAt: newNotif.createdAt,
    }));

    return NextResponse.json({ success: true, notification: newNotif });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 });
  }
}
