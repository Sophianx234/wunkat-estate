// /app/api/user/route.ts
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connectToDatabase } from "@/config/DbConnect";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    // 🔑 Extract query params
    const { search, role, date } = Object.fromEntries(
      new URL(req.url).searchParams
    );

    const filter: any = {};

    // 🔎 Role filter
    if (role) {
      filter.role = role;
    }

    // 🔎 Search filter (name, email, phone)
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    // 🔎 Date filter (match createdAt day)
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      filter.createdAt = { $gte: start, $lte: end };
    }

    const users = await User.find(filter).sort({ createdAt: -1 });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
