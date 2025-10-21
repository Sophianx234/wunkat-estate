import { NextResponse } from "next/server";
import Room from "@/models/Room";
import House from "@/models/House";
import { connectToDatabase } from "@/config/DbConnect";

export async function GET() {
  try {
    await connectToDatabase();

    // Fetch only rooms that have smart lock enabled or belong to smart-lock-supported houses
    const rooms = await Room.find({
      smartLockEnabled: true,
    })
      .populate({
        path: "houseId",
        model: House,
        select: "name location.city smartLockSupport",
      })
      .lean();

    // Transform data for the UI
    const formatted = rooms.map((room) => ({
      property: room.houseId?.name || "Unknown Property",
      unit: room.name,
      status: room.lockStatus === "locked" ? "Locked" : "Unlocked",
      battery: room.smartLockEnabled ? `${Math.floor(Math.random() * 30) + 70}%` : "—", // fake battery %
      signal: room.smartLockEnabled ? ["Excellent", "Strong", "Good", "Weak"][Math.floor(Math.random() * 4)] : "None",
      lastAccess: "Today", // can later be replaced with logs
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching smart lock overview:", error);
    return NextResponse.json({ error: "Failed to fetch smart lock data" }, { status: 500 });
  }
}
