import { connectToDatabase } from "@/config/DbConnect";
import Feedback from "@/models/Feedback";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    await connectToDatabase();

    const newFeedback = new Feedback({ name, email, message });
    await newFeedback.save();

       const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false, // false for port 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter connection
    await transporter.verify();

    // Email options
    const mailOptions = {
      from: `"Complaint Form" <${email}>`,
      replyTo: email,
      to: process.env.EMAIL_USER, // Admin email (your inbox)
      subject: `New Complaint from ${name}`,
      html: `
<div style="font-family: 'Segoe UI', Roboto, Arial, sans-serif; background-color: #f8fafc; padding: 32px 0;">
  <div style="max-width: 640px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.06);">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #0f172a, #1e293b); color: #fff; padding: 24px 20px; text-align: center;">
      <img 
        src="https://res.cloudinary.com/dtytb8qrc/image/upload/v1761591015/home_yevjdg.png"
        alt="WunkatHomes Logo"
        style="width: 56px; height: 56px; margin-bottom: 10px; border-radius: 8px; background: #fff; padding: 5px;"
      />
      <h2 style="margin: 0; font-size: 20px; font-weight: 600;">New Complaint Received</h2>
    </div>

    <!-- Content -->
    <div style="padding: 28px;">
      <h3 style="margin: 0 0 8px; color: #111827; font-size: 18px;">Complaint Details</h3>
      <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 12px;">
        <strong>Name:</strong> ${name}
      </p>
      <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 12px;">
        <strong>Email:</strong> ${email}
      </p>
      <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 20px;">
        <strong>Message:</strong><br />
        <span style="background:#f9fafb; padding: 12px; border-radius: 8px; display: inline-block; margin-top: 6px;">${message}</span>
      </p>
      <p style="font-size: 14px; color: #6b7280; line-height: 1.5;">
        Submitted on ${new Date().toLocaleString()}
      </p>
    </div>

    <!-- Footer -->
    <div style="background: #f3f4f6; padding: 14px; text-align: center; font-size: 12px; color: #6b7280;">
      <p style="margin: 4px 0;">© ${new Date().getFullYear()} WunkatHomes. All rights reserved.</p>
      <a href="https://wunkathomes.com" style="color: #1d4ed8; text-decoration: none;">Visit our website</a>
    </div>

  </div>
</div>
`,
    };

    // Send email
    await transporter.sendMail(mailOptions);


    return NextResponse.json(
      { message: "Complaint submitted successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting complaint:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}


// ✅ Get all feedbacks
export async function GET() {
  try {
    await connectToDatabase();
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    return NextResponse.json(feedbacks, { status: 200 });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return NextResponse.json({ error: "Failed to fetch feedbacks" }, { status: 500 });
  }
}


