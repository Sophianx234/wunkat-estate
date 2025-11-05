import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/config/DbConnect";
import Notification from "@/models/Notification";
import { broadcast } from "@/lib/sse";
<<<<<<< HEAD
import User from "@/models/User";
import { sendMail } from "@/lib/mail";
=======
import mongoose from "mongoose";
>>>>>>> feature
// adjust this to your JWT verification util

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role") || "user";
    const userId = searchParams.get("userId");

    let filter: any = {};

    if (role === "admin") {
      // Admins see only admin or global notifications
      filter = { audience: { $in: ["admin", "all"] } };
    } else {
      // Regular users:
      // Show notifications intended for "user"
      // Where userId is either not set (global user message) or matches this user
      filter = {
        audience: "user",
        $or: [
          { userId: { $exists: false } },
          { userId: { $eq: null } },
          { userId: userId ? new mongoose.Types.ObjectId(userId) : undefined },
        ].filter(Boolean),
      };
    }

    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, notifications });
  } catch (error) {
    console.error("❌ Error fetching notifications:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}


<<<<<<< HEAD
// POST — create a new notificatio // ✅ Ensure this exists and works

=======

// POST — create a new notification
>>>>>>> feature
export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { title, message, type, audience, sendEmail } = await request.json();

    if (!title || !message)
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });

    // ✅ Save notification in DB
    const notification = await Notification.create({
      title,
      message,
      type: type || "system",
      audience: audience || "all",
    });

    // ✅ Broadcast via SSE
    broadcast(
      JSON.stringify({ notification }),
      { audience: notification.audience }
    );

    // ✉️ Optional: Send email to the correct audience
    if (sendEmail) {
      let recipients: string[] = [];

      // Determine who should get the email
      if (audience === "all") {
        const allUsers = await User.find({}, "email");
        recipients = allUsers.map((u) => u.email);
      } else if (audience === "user") {
        const users = await User.find({ role: "user" }, "email");
        recipients = users.map((u) => u.email);
      } else if (audience === "admin") {
        const admins = await User.find({ role: "admin" }, "email");
        recipients = admins.map((u) => u.email);
      }

      // ✅ Construct a clean, branded HTML email
      const html = `
        <div style="font-family: 'Segoe UI', Roboto, Arial, sans-serif; background-color: #f8fafc; padding: 32px 0;">
          <div style="max-width: 640px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.06);">
            
            <div style="background: linear-gradient(135deg, #0f172a, #1e293b); color: #fff; padding: 24px 20px; text-align: center;">
              <img 
                src="https://res.cloudinary.com/dtytb8qrc/image/upload/v1761591015/home_yevjdg.png"
                alt="WunkatHomes Logo"
                style="width: 56px; height: 56px; margin-bottom: 10px; border-radius: 8px; background: #fff; padding: 5px;"
              />
              <h2 style="margin: 0; font-size: 20px; font-weight: 600;">WunkatHomes Notification</h2>
            </div>

            <div style="padding: 28px;">
              <h3 style="margin: 0 0 8px; color: #111827; font-size: 18px;">${title}</h3>
              <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 20px;">
                ${message}
              </p>
              <p style="font-size: 14px; color: #6b7280; line-height: 1.5;">
                — The <strong>WunkatHomes</strong> Team
              </p>
            </div>

            <div style="background: #f3f4f6; padding: 14px; text-align: center; font-size: 12px; color: #6b7280;">
              <p style="margin: 4px 0;">© ${new Date().getFullYear()} WunkatHomes. All rights reserved.</p>
              <a href="https://wunkathomes.com" style="color: #1d4ed8; text-decoration: none;">Visit our website</a>
            </div>
          </div>
        </div>
      `;

      if (recipients.length > 0) {
        // Send in small batches (to avoid SMTP limits)
        const batchSize = 50;
        for (let i = 0; i < recipients.length; i += batchSize) {
          const batch = recipients.slice(i, i + batchSize);
          await sendMail({
            to: batch.join(","),
            subject: title,
            html,
          });
        }
      }

      console.log(`✉️ Email sent to ${recipients.length} recipient(s).`);
    }

    return NextResponse.json({ success: true, notification });
  } catch (error) {
    console.error("❌ Error creating notification:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create notification" },
      { status: 500 }
    );
  }
}



