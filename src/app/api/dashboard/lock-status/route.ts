import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/config/DbConnect";
import Room from "@/models/Room";

export async function GET(req:NextRequest) {
  try {
    await connectToDatabase();

    // Fetch all rooms with relevant fields only
    const rooms = await Room.find().select("name smartLockEnabled lockStatus").lean();
    console.log("✅ Fetched room lock statuses successfully");

    // Map data into frontend-friendly format
    const formatted = rooms.map((room: any, index: number) => ({
      id: room._id.toString(),
      name: room.name,
      smartLock: room.smartLockEnabled,
      status:
        room.smartLockEnabled
          ? room.lockStatus === "locked"
            ? "Locked"
            : "Unlocked"
          : "Manually Locked",
    }));

    return NextResponse.json({ success: true, rooms: formatted });
  } catch (error) {
    console.error("❌ Error fetching room lock statuses:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load room lock statuses" },
      { status: 500 }
    );
  }
}
