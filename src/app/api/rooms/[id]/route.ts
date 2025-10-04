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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;
    const formData = await req.formData();

    // Grab all possible fields
    const houseId = formData.get("houseId") as string | null;
    const name = formData.get("name") as string | null;
    const price = formData.get("price") as string | null;
    const available = formData.get("available") === "true";
    const description = formData.get("description") as string | null;
    const beds = formData.get("beds") as string | null;
    const baths = formData.get("baths") as string | null;
    const planType = formData.get("planType") as string | null;

    // ✅ Handle deleted images
    const deletedImages = formData.getAll("deletedImages") as string[];

    // ✅ Handle new uploads
    const images: string[] = [];
    const imageFiles = formData.getAll("images") as File[];
    for (const file of imageFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await uploadBufferToCloudinary(buffer, undefined, "rooms");
      images.push((result as UploadApiResponse).secure_url);
    }

    // ✅ Start update object (only add what user provided)
    const updateData: any = {};

    if (houseId && houseId.trim() !== "") {
      const house = await House.findById(houseId).select("smartLockSupport");
      if (!house) {
        return NextResponse.json({ error: "House not found" }, { status: 404 });
      }
      updateData.houseId = houseId;
      updateData.smartLockEnabled = house.smartLockSupport || false;
      updateData.lockStatus = house.smartLockSupport ? "locked" : null;
    }

    if (name && name.trim() !== "") updateData.name = name;
    if (price && !isNaN(Number(price))) updateData.price = Number(price);
    if (formData.has("available")) updateData.available = available;
    if (description && description.trim() !== "") updateData.description = description;
    if (beds && !isNaN(Number(beds))) updateData.beds = Number(beds);
    if (baths && !isNaN(Number(baths))) updateData.baths = Number(baths);
    if (planType && planType.trim() !== "") updateData.planType = planType;

    // ✅ Remove deleted images
    if (deletedImages.length > 0) {
      await Room.findByIdAndUpdate(id, {
        $pull: { images: { $in: deletedImages } },
      });
    }

    // ✅ Push new images
    if (images.length > 0) {
      updateData.$push = { images: { $each: images } };
    }

    // ✅ Update room
    const updatedRoom = await Room.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedRoom) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(updatedRoom, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating room:", error);
    return NextResponse.json({ error: "Failed to update room" }, { status: 500 });
  }
}
