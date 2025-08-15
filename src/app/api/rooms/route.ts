import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Room from "@/models/Room";
import { writeFile } from "fs/promises";
import path from "path";

// ✅ Handle POST (Add Room)
export async function POST(req: Request) {
  try {
    await dbConnect();

    const formData = await req.formData();

    const houseId = formData.get("houseId") as string;
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const available = formData.get("available") === "true";
    const description = formData.get("description") as string;

    // Handle images
    const images: string[] = [];
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    const imageFiles = formData.getAll("images") as File[];
    for (const file of imageFiles) {
      const bytes = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, bytes);
      images.push(`/uploads/${fileName}`);
    }

    const room = await Room.create({
      houseId,
      name,
      price,
      available,
      description,
      images,
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
    await dbConnect();
    const rooms = await Room.find().populate("houseId", "name location");
    return NextResponse.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 });
  }
}
