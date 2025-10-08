import { connectToDatabase } from "@/config/DbConnect";
import House from "@/models/House";
import Room from "@/models/Room";
import { NextResponse } from "next/server";

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
