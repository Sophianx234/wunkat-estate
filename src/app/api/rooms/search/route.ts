import { NextResponse } from "next/server"
import { connectToDatabase } from "@/config/DbConnect"
import Room from "@/models/Room"

export async function GET(req: Request) {
  await connectToDatabase()

  const { searchParams } = new URL(req.url)
  const city = searchParams.get("city") || ""
  const maxPrice = searchParams.get("maxPrice")
  const description = searchParams.get("description") || ""

  try {
    const query: any = {}

    // 🔹 Filter by city
    if (city) {
      query["location.city"] = { $regex: city, $options: "i" }
    }

    // 🔹 Filter by max price
    if (maxPrice) {
      query.price = { $lte: Number(maxPrice) }
    }

    // 🔹 Filter by description or keyword
    if (description) {
      const regex = { $regex: description, $options: "i" }
      query.$or = [{ description: regex }, { name: regex }]
    }

    // 🔹 Fetch only rooms, with house details if available
    const rooms = await Room.find(query)
      .populate("houseId", "name location amenities") // optional
      .limit(30)
      .lean()

    return NextResponse.json({
      success: true,
      count: rooms.length,
      data: rooms,
    })
  } catch (error: any) {
    console.error("Search API error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch rooms" },
      { status: 500 }
    )
  }
}
