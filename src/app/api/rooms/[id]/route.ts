import { connectToDatabase } from "@/config/DbConnect";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";
import House from "@/models/House";
import Room from "@/models/Room";
import { UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  req: NextRequest,
  
  context: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const { id } = await context.params;
    console.log("idxxx:", id);

    if (!id) {
      return NextResponse.json(
        { msg: "could not find ID" },
        { status: 400 }
      );
    }

    const room = await Room.findById(id);
    if (!room) {
      return NextResponse.json(
        { msg: "could not fetch room with specified ID" },
        { status: 404 }
      );
    }

    return NextResponse.json(room, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    const { id } = params; // ✅ room ID from URL
    const formData = await req.formData();

    const houseId = formData.get("houseId") as string;
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const available = formData.get("available") === "true";
    const description = formData.get("description") as string;

    const beds = Number(formData.get("beds")) || 0;
    const baths = Number(formData.get("baths")) || 0;
    const planType = formData.get("planType") as string;

    // ✅ Handle images (optional: only if new ones are uploaded)
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

    // ✅ Update the room
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      {
        houseId,
        name,
        price,
        available,
        description,
        ...(images.length > 0 && { images }), // only update if new images uploaded
        beds,
        baths,
        planType,
        smartLockEnabled: house.smartLockSupport || false,
        lockStatus: house.smartLockSupport ? "locked" : null,
      },
      { new: true } // return updated doc
    );

    if (!updatedRoom) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(updatedRoom, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating room:", error);
    return NextResponse.json({ error: "Failed to update room" }, { status: 500 });
  }
}
