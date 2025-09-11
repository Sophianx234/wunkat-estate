import { connectToDatabase } from "@/config/DbConnect";
import Room from "@/models/Room";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const { id } = params;
    console.log("idxxx", id);

    if (!id) {
      return NextResponse.json(
        { msg: "could not find ID:" },
        { status: 400 }
      );
    }

    const room = await Room.findById(id);
    if (!room) {
      return NextResponse.json(
        { msg: "could not fetch room with specified ID:" },
        { status: 400 }
      );
    }

    return NextResponse.json(room, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
