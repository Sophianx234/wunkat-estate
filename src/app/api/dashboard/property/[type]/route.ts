import { NextResponse } from "next/server";
import House from "@/models/House";
import Room from "@/models/Room";
import { connectToDatabase } from "@/config/DbConnect";

export async function GET(
  req: Request,
  { params }: { params: { type: string } }
) {
  try {
    await connectToDatabase();
    const { type } = params;

    let data = [];
    let description = "";

    switch (type) {
      case "houses":
        data = await House.find().limit(5);
        description =
          "A list of houses currently managed under the WunkatHomes platform. This includes active and inactive properties.";
        break;

      case "rooms":
        data = await Room.find().limit(5);
        description =
          "All registered rooms across all properties. Each record contains details such as room number, occupancy status, and associated house.";
        break;

      case "smartlocks":
        data = await Room.find({ smartLockSupport: true }).limit(5);
        description =
          "Rooms equipped with smart locks that allow remote access and monitoring of lock status.";
        break;

      case "booked":
        data = await Room.find({ status: "booked" }).limit(5);
        description =
          "These rooms are currently booked by tenants. Each record shows booking details and tenant info.";
        break;

      case "available":
        data = await Room.find({ status: "available" }).limit(5);
        description =
          "Available rooms that are open for new bookings. These are ready for occupancy or awaiting approval.";
        break;

      case "pending":
        data = await Room.find({ status: "pending" }).limit(5);
        description =
          "Rooms pending confirmation. These may include rooms awaiting booking approval or administrative review.";
        break;

      case "locked":
        data = await Room.find({ lockStatus: "manual" }).limit(5);
        description =
          "Rooms that have been manually locked by administrators for maintenance, security, or administrative reasons.";
        break;

      default:
        return NextResponse.json({
          success: false,
          message: "Invalid data type specified.",
        });
    }

    console.log(`✅ Fetched ${data.length} records for type: ${type}`);
    return NextResponse.json({
      success: true,
      data: { description, items: data },
    });
  } catch (err) {
    console.error("Error fetching modal data:", err);
    return NextResponse.json({
      success: false,
      message: "Failed to load data",
    });
  }
}
