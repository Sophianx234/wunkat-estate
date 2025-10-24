// src/app/api/dashboard/lock-status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/config/DbConnect";
import Room from "@/models/Room";
import House from "@/models/House";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    // ✅ Populate houseId to get location
    const rooms = await Room.find()
      .select("name smartLockEnabled lockStatus houseId")
      .populate("houseId", "location name") // populate only location and house name
      .lean();

    console.log("✅ Fetched room lock statuses successfully");

    const formatted = rooms.map((room: any) => ({
      id: room._id.toString(),
      name: room.name,
      smartLock: room.smartLockEnabled,
      status: room.smartLockEnabled
        ? room.lockStatus === "locked"
          ? "Locked"
          : "Unlocked"
        : "Manually Locked",
      // ✅ Attach location from house
      location: room.houseId?.location
        ? {
            address: room.houseId.location.address,
            city: room.houseId.location.city,
            region: room.houseId.location.region,
          }
        : { address: "N/A", city: "N/A", region: "N/A" },
      houseName: room.houseId?.name || "Unknown House",
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
