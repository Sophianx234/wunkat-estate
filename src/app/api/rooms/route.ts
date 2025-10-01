import { connectToDatabase } from "@/config/DbConnect";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";
import Room, { IRoom } from "@/models/Room";
import "@/models/House"; // ensures House model is registered
import { UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import House from "@/models/House";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await req.formData();

    const houseId = formData.get("houseId") as string;
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const available = formData.get("available") === "true";
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
      available,
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

    // ✅ extract query params
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const type: boolean = Boolean(searchParams.get("type")) || false;
    const city = searchParams.get("city") || "";
    const status = searchParams.get("status") || "";

    // ✅ build filter dynamically

    const filter: any = {};

    if (search) {
      // fuzzy match on description or name
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      filter.status = status; // e.g. available / booked / pending
    }

    if (type !== undefined) {
      console.log("type", type);
      filter.smartLockEnabled = type;
    }

    console.log("filter", filter);

    // ✅ query database
    let rooms:room[];
    if (filter) {
      rooms = await Room.find(filter)
        .populate({
          path: "houseId",
          select: "name location smartLockEnabled",
          ...(city && { match: { "location.region": city } }), // ✅ only when city exists
        })
        .lean();
      rooms = await Room.find()
        .populate({
          path: "houseId",
          select: "name location smartLockEnabled",
          ...(city && { match: { "location.region": city } }), // ✅ only when city exists
        })
        .lean();
    } else {
    }
    const filteredRooms = city ? rooms.filter((r) => r.houseId) : rooms;
    console.log("filteredRooms", filteredRooms);

    return NextResponse.json(filteredRooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json(
      { error: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}
