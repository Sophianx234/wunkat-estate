import { connectToDatabase } from "@/config/DbConnect";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";
import { broadcast } from "@/lib/sse"; // ✅ same SSE helper used elsewhere
import "@/models/House"; // ensures House model is registered
import House from "@/models/House";
import Notification from "@/models/Notification";
import Room from "@/models/Room";
import { UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

import { sendMail } from "@/lib/mail";
import "@/models/House";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await req.formData();

    const houseId = formData.get("houseId") as string;
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const status = formData.get("status");
    const description = formData.get("description") as string;

    const beds = Number(formData.get("beds")) || 0;
    const baths = Number(formData.get("baths")) || 0;
    const planType = formData.get("planType") as string;

    // ✅ Upload images
    const images: string[] = [];
    const imageFiles = formData.getAll("images") as File[];
    for (const file of imageFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await uploadBufferToCloudinary(buffer, undefined, "rooms");
      images.push((result as UploadApiResponse).secure_url);
    }

    // ✅ Verify house exists
    const house = await House.findById(houseId).select("name smartLockSupport location");
    if (!house) {
      return NextResponse.json({ error: "House not found" }, { status: 404 });
    }

    // ✅ Create room
    const room = await Room.create({
      houseId,
      name,
      price,
      status,
      description,
      images,
      beds,
      baths,
      planType,
      smartLockEnabled: house.smartLockSupport || false,
      lockStatus: house.smartLockSupport ? "locked" : null,
    });

    // 🧩 Create notification
    const notification = await Notification.create({
      title: "New Room Added",
      message: `A new room named "${room.name}" has been added to the house "${house.name}" in ${house.location?.city || "unknown city"}.`,
      type: "system",
      audience: "all",
    });

    // 🧩 Broadcast via SSE
    broadcast(JSON.stringify({ notification }));

    // 📨 Send email to all users
    const users = await User.find({}, "email");
    const emailList = users.map((u) => u.email).filter(Boolean);

    const subject = "New Room Available at WunkatHomes";
    const html = `
  <div style="font-family:'Segoe UI',Arial,sans-serif;background-color:#f9fafb;padding:40px 0;color:#333;">
    <div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 3px 10px rgba(0,0,0,0.05);">
      
      <!-- Header -->
      <div style="background:linear-gradient(135deg,#111827,#1f2937);color:#fff;padding:24px 20px;text-align:center;">
        <img 
          src="https://res.cloudinary.com/dtytb8qrc/image/upload/v1761591015/home_yevjdg.png"
          alt="WunkatHomes Logo"
          style="display:block;margin:0 auto 10px auto;width:80px;max-width:100px;height:auto;border-radius:10px;object-fit:contain;"
        />
        <h1 style="margin:0;font-size:22px;font-weight:600;">WunkatHomes</h1>
        <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">Discover your next comfort space</p>
      </div>

      <!-- Content -->
      <div style="padding:28px 32px;">
        <h2 style="font-size:18px;margin:0 0 12px;">A New Room Has Been Added!</h2>
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
          We’re excited to announce that a new room has just been added to our listings.
        </p>

        <div style="background:#f3f4f6;border-left:4px solid #2563eb;padding:14px 16px;border-radius:8px;margin:18px 0;">
          <strong style="display:block;color:#111827;">Room Name:</strong> {{roomName}}<br/>
          <strong style="display:block;color:#111827;">House:</strong> {{houseName}}<br/>
          <strong style="display:block;color:#111827;">Location:</strong> {{location}}
        </div>

        <img 
          src="{{imageUrl}}" 
          alt="New Room Image" 
          style="width:100%;border-radius:10px;margin:18px 0;object-fit:cover;max-height:300px;"
        />

        <a href="{{link}}" 
           style="display:inline-block;background:#111827;color:#fff;text-decoration:none;padding:12px 24px;border-radius:6px;font-weight:500;">
          View Room
        </a>

        <p style="margin-top:22px;font-size:14px;color:#555;">
          Thank you for choosing <strong>WunkatHomes</strong>. We’re committed to helping you find your ideal home.
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#f3f4f6;text-align:center;padding:14px 10px;font-size:12px;color:#6b7280;">
        © ${new Date().getFullYear()} WunkatHomes. All rights reserved.<br/>
        <a href="https://wunkathomes.com" style="color:#1d4ed8;text-decoration:none;">Visit our website</a>
      </div>
    </div>
  </div>
`

    await Promise.all(
      emailList.map((email) =>
        sendMail({
          to: email,
          subject,
          html,
          text: `A new room named ${room.name} has been added to the house ${house.name}.`,
        })
      )
    );

    return NextResponse.json(
      {
        message: "Room created successfully",
        room,
        notification,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error adding room:", error);
    return NextResponse.json({ error: "Failed to add room" }, { status: 500 });
  }
}



// ✅ Optional GET to list all rooms
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);

    // ✅ Extract query params
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type");
    const smartLock = searchParams.get("smartLock");
    const city = searchParams.get("city") || "";
    const status = searchParams.get("status") || "";
    const houseId = searchParams.get("houseId"); // ✅ new

    // ✅ build filter dynamically
    const filter: any = {};

    if (houseId) {
      filter.houseId = houseId; // fetch rooms for specific house
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      filter.status = status; // e.g. available / booked / pending
    }

    if (smartLock) {
      filter.smartLockEnabled = smartLock === "true"; // ensure boolean
    }

    if (type) {
      filter.type = type; // e.g. bedroom, studio etc.
    }

    console.log("filter", filter);

    // ✅ query database
    const rooms = await Room.find(filter)
      .populate({
        path: "houseId",
        select: "name location smartLockSupport",
        ...(city && { match: { "location.region": city } }),
      })
      .sort({ createdAt: -1 })
      .lean();

    const filteredRooms = city ? rooms.filter((r) => r.houseId) : rooms;

    return NextResponse.json(filteredRooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json(
      { error: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}
