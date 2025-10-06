import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectToDatabase } from "@/config/DbConnect";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    connectToDatabase();
    const deletedUser = await User.findByIdAndDelete(params.id);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}


export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    const body = await req.json();
    const { name, email, role } = body;

    // Build update object dynamically
    const updateFields: Partial<{ name: string; email: string; role: string }> =
      {};

    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (role) {
      if (!["buyer", "seller", "agent", "admin"].includes(role)) {
        return NextResponse.json({ error: "Invalid role" }, { status: 400 });
      }
      updateFields.role = role;
    }

    // Ensure at least one field is being updated
    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided to update" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(params.id, updateFields, {
      new: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
