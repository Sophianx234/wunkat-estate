import { connectToDatabase } from "@/config/DbConnect";
import Feedback from "@/models/Feedback";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const deleted = await Feedback.findByIdAndDelete(params.id);

    if (!deleted)
      return NextResponse.json({ error: "Feedback not found" }, { status: 404 });

    return NextResponse.json({ message: "Feedback deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    return NextResponse.json({ error: "Failed to delete feedback" }, { status: 500 });
  }
}
