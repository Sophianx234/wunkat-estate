import { connectToDatabase } from "@/config/DbConnect";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";
import Room from "@/models/Room";
import "@/models/House"; // ensures House model is registered
import { UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import House from "@/models/House";

// ✅ Handle POST (Add Room)
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await req.formData();

    const houseId = formData.get("houseId") as string;
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const available = formData.get("available") === "true";
    const description = formData.get("description") as string;

    const beds = Number(formData.get("beds"));
    const baths = Number(formData.get("baths"));

    // ✅ Smart lock fields
    const smartLockEnabled = formData.get("smartLockEnabled") === "true";
    const lockStatus = (formData.get("lockStatus") as "locked" | "unlocked") || "locked";
    console.warn('x1x2x3',smartLockEnabled,lockStatus)

    // Handle images
    const images: string[] = [];
    const imageFiles = formData.getAll("images") as File[];

    for (const file of imageFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await uploadBufferToCloudinary(buffer, undefined, "rooms");
      images.push((result as UploadApiResponse).secure_url);
    }

    const house = await House.findById(houseId).select('smartLockSupport')

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
      smartLockEnabled: house.smartLockSupport || undefined,
      lockStatus: 'locked' 
      

    });

    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    console.error("Error adding room:", error);
    return NextResponse.json({ error: "Failed to add room" }, { status: 500 });
  }
}

// ✅ Optional GET to list all rooms
export async function GET() {
  try {
    await connectToDatabase();
    const rooms = await Room.find().populate("houseId", "name location smartLockEnabled");
    return NextResponse.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 });
  }
}
