import { connectToDatabase } from "@/config/DbConnect";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";
import Room from "@/models/Room";
import "@/models/House";
import { UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

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

    // ✅ Beds and Baths
    const beds = Number(formData.get("beds")) ;
    const baths = Number(formData.get("baths"));
    
    // Handle images
    const images: string[] = [];
    const imageFiles = formData.getAll("images") as File[];

    for (const file of imageFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());
      
      // Upload to Cloudinary (unique ID to avoid overwriting)
      const result = await uploadBufferToCloudinary(buffer, undefined, "rooms");
      
      images.push((result as UploadApiResponse).secure_url);
    }
    
    // Create the room
    console.log('beds and baths:',typeof(beds), typeof(baths))
    const room = await Room.create({
      houseId,
      name,
      price,
      available,
      description,
      images,
      beds,
      baths, // ✅ include here
    });

    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    console.error("Error adding room:", error);
    return NextResponse.json(
      { error: "Failed to add room" },
      { status: 500 }
    );
  }
}

// ✅ Optional GET to list all rooms
export async function GET() {
  try {
    await connectToDatabase();
    const rooms = await Room.find().populate("houseId", "name location");
    console.log("room", rooms);
    return NextResponse.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json(
      { error: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}
