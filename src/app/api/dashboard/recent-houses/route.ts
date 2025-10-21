import { NextResponse } from "next/server";
import House from "@/models/House";
import { connectToDatabase } from "@/config/DbConnect";

// ✅ GET: Fetch recently added houses
export async function GET() {
  try {
    await connectToDatabase();

    // Fetch the 5 most recently added houses
    const houses = await House.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const formatted = houses.map((house: any) => ({
      id: house._id,
      name: house.name,
      location: `${house.location?.address || ""}, ${house.location?.city || ""}`.trim(),
      smartlock: house.smartLockSupport || false,
      createdAt: house.createdAt,
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (error) {
    console.error("Error fetching recent houses:", error);
    return NextResponse.json(
      { error: "Failed to load recent houses" },
      { status: 500 }
    );
  }
}
