import { connectToDatabase } from "@/config/DbConnect";
import House from "@/models/House";
import Room from "@/models/Room";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const house = await House.findById(params.id);
    if (!house) {
      return NextResponse.json({ error: "House not found" }, { status: 404 });
    }

    // Optionally delete associated rooms
    await Room.deleteMany({ houseId: params.id });

    // Delete house
    await House.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "House deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
// app/api/houses/[id]/route.ts


// ✅ GET house by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const house = await House.findById(params.id);

    if (!house) {
      return NextResponse.json({ error: "House not found" }, { status: 404 });
    }

    return NextResponse.json(house, { status: 200 });
  } catch (error) {
    console.error("Error fetching house:", error);
    return NextResponse.json({ error: "Failed to fetch house" }, { status: 500 });
  }
}

// ✅ PUT (update house)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const {id} = await params;
    console.log("Updating house with ID:", id);
    const reqUrl = req.url;
    console.log("Request URL:", reqUrl);
    const body = await req.json();
    console.log("Update body:", body);

    const updated = await House.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "House not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Error updating house:", error);
    return NextResponse.json({ error: "Failed to update house" }, { status: 500 });
  }
}


