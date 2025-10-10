import { connectToDatabase } from "@/config/DbConnect";
import House from "@/models/House";
import { NextRequest, NextResponse } from "next/server";

// MongoDB connection helper

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);

    const name = searchParams.get("name") || "";
    const city = searchParams.get("city") || "";
    const region = searchParams.get("region") || "";
    const country = searchParams.get("country") || "";
    const smartLockSupport = searchParams.get("smartLockSupport");
    const amenities = searchParams.getAll("amenities"); // multiple amenities

    const query: any = {};

    // 🔎 Name (partial match, case insensitive)
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    // 📍 Location filters
    if (city) query["location.city"] = city;
    if (region) query["location.region"] = region;
    if (country) query["location.country"] = country;

    // 🔐 Smart lock support
    // Smart lock support
    // 🔐 Smart lock support
if (smartLockSupport && ["true", "false"].includes(smartLockSupport.toLowerCase())) {
  query.smartLockSupport = smartLockSupport.toLowerCase() === "true";
}


    // Amenities
    if (amenities.length > 0) {
      query.amenities = { $all: amenities }; // OR use $all if you want "must have all"
    }

    const houses = await House.find(query).populate("rooms");

    return NextResponse.json(houses, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching houses:", error);
    return NextResponse.json(
      { error: "Failed to fetch houses" },
      { status: 500 }
    );
  }
}

// POST: Create a new house
export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();

    const {
      name,
      description,
      location,
      amenities,
      smartLockSupport,
      lockStatus,
    } = body;

    // Basic validation
    if (!name || !location?.address || !location?.city || !location?.region) {
      return NextResponse.json(
        { error: "Name, address, city, and region are required" },
        { status: 400 }
      );
    }

    // ✅ If smart lock is enabled, include lockStatus
    const newHouse = new House({
      name,
      description,
      location,
      amenities,
      smartLockSupport,
      lockStatus: smartLockSupport ? lockStatus : undefined,
    });

    await newHouse.save();

    return NextResponse.json(
      { message: "House created successfully", house: newHouse },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating house:", error);
    return NextResponse.json(
      { error: "Failed to create house" },
      { status: 500 }
    );
  }
}
