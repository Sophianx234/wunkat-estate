import { NextResponse } from "next/server"
import Room from "@/models/Room"
import House from "@/models/House"
import { connectToDatabase } from "@/config/DbConnect"


export async function GET(req: Request) {
  try {
    await connectToDatabase()

    const url = new URL(req.url)
    const search = url.searchParams.get("search") || ""
    const location = url.searchParams.get("location") || ""
    const bedrooms = url.searchParams.get("bedrooms")
    const maxPrice = url.searchParams.get("maxPrice")
    const amenities = url.searchParams.get("amenities")

    // ✅ Base query: rooms only
    const query: any = { status: "available" }

    // 🔍 Search across room name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ]
    }

    // 📍 Filter by location (city or region)
    if (location) {
      const houses = await House.find({
        $or: [
          { "location.city": { $regex: location, $options: "i" } },
          { "location.region": { $regex: location, $options: "i" } },
        ],
      }).select("_id")

      const houseIds = houses.map((h) => h._id)
      query.houseId = { $in: houseIds }
    }

    // 🛏 Bedrooms
    if (bedrooms) query.beds = Number(bedrooms)

    // 💰 Max Price
    if (maxPrice) query.price = { $lte: Number(maxPrice) }

    // 🏡 Amenities (look up from houses)
    if (amenities) {
      const amenityList = amenities.split(",").map((a) => a.trim())
      const houses = await House.find({ amenities: { $all: amenityList } }).select("_id")
      const houseIds = houses.map((h) => h._id)
      query.houseId = query.houseId
        ? { $in: query.houseId.$in.filter((id: any) => houseIds.includes(id)) }
        : { $in: houseIds }
    }

    // 🧩 Fetch rooms with their house info
    const rooms = await Room.find(query)
      .populate("houseId", "name location amenities smartLockSupport")
      .sort({ createdAt: -1 })
      .limit(100)
      .lean()

    // Format output for frontend
    const formatted = rooms.map((r: any) => ({
      id: r._id,
      title: r.name,
      description: r.description || "",
      price: r.price,
      beds: r.beds,
      baths: r.baths,
      images: r.images,
      planType: r.planType,
      location: r.houseId?.location?.city
        ? `${r.houseId.location.city}, ${r.houseId.location.region}`
        : "Unknown",
      amenities: r.houseId?.amenities || [],
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    }))

    return NextResponse.json({ success: true, count: formatted.length, data: formatted })
  } catch (error: any) {
    console.error("❌ Error fetching rooms:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
