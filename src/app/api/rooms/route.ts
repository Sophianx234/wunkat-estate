import { connectToDatabase } from "@/config/DbConnect";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";
import "@/models/House"; // ensures House model is registered
import House from "@/models/House";
import Room from "@/models/Room";
import { UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await req.formData();

    const houseId = formData.get("houseId") as string;
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const status = formData.get("status") ;
    const description = formData.get("description") as string;

    const beds = Number(formData.get("beds")) || 0;
    const baths = Number(formData.get("baths")) || 0;

    // ✅ New: plan type
    const planType = formData.get("planType") as string;

    // ✅ Handle images
    const images: string[] = [];
    const imageFiles = formData.getAll("images") as File[];
    for (const file of imageFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await uploadBufferToCloudinary(buffer, undefined, "rooms");
      images.push((result as UploadApiResponse).secure_url);
    }

    // ✅ Fetch house to check smart lock support
    const house = await House.findById(houseId).select("smartLockSupport");
    if (!house) {
      return NextResponse.json({ error: "House not found" }, { status: 404 });
    }

    // ✅ Create the room
    const room = await Room.create({
      houseId,
      name,
      price,
      status,
      description,
      images,
      beds,
      baths,
      planType, // <-- added here
      smartLockEnabled: house.smartLockSupport || false,
      lockStatus: house.smartLockSupport ? "locked" : null,
    });

    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    console.error("❌ Error adding room:", error);
    return NextResponse.json({ error: "Failed to add room" }, { status: 500 });
  }
}

// ✅ Optional GET to list all rooms
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);

    // ✅ Extract query params
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type");
    const smartLock = searchParams.get("smartLock");
    const city = searchParams.get("city") || "";
    const status = searchParams.get("status") || "";
    const houseId = searchParams.get("houseId"); // ✅ new

    // ✅ build filter dynamically
    const filter: any = {};

    if (houseId) {
      filter.houseId = houseId; // fetch rooms for specific house
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      filter.status = status; // e.g. available / booked / pending
    }

    if (smartLock) {
      filter.smartLockEnabled = smartLock === "true"; // ensure boolean
    }

    if (type) {
      filter.type = type; // e.g. bedroom, studio etc.
    }

    console.log("filter", filter);

    // ✅ query database
    const rooms = await Room.find(filter)
      .populate({
        path: "houseId",
        select: "name location smartLockSupport",
        ...(city && { match: { "location.region": city } }),
      })
      .sort({ createdAt: -1 })
      .lean();

    const filteredRooms = city ? rooms.filter((r) => r.houseId) : rooms;

    return NextResponse.json(filteredRooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json(
      { error: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}
