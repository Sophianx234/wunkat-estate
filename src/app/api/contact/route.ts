import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    console.log("Contact form submission:", { name, email, message });

    // Create transporter using your Gmail SMTP env variables
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
      from: `"WunkatHomes Contact Form" <${process.env.EMAIL_USER}>`, // your SMTP account
      replyTo: email,
      to: process.env.EMAIL_USER, // or CONTACT_EMAIL if different
      subject: `New Contact Message from ${name}`,
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
      <h2 style="margin: 0; font-size: 20px; font-weight: 600;">WunkatHomes Contact Form</h2>
    </div>

    <!-- Content -->
    <div style="padding: 28px;">
      <h3 style="margin: 0 0 8px; color: #111827; font-size: 18px;">New Message Received</h3>
      <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 12px;">
        <strong>Name:</strong> ${name}
      </p>
      <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 12px;">
        <strong>Email:</strong> ${email}
      </p>
      <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 20px;">
        <strong>Message:</strong><br />
        ${message}
      </p>
      <p style="font-size: 14px; color: #6b7280; line-height: 1.5;">
        — The <strong>WunkatHomes</strong> Team
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

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error: any) {
    console.error("Email sending error:", error.message || error);
    return NextResponse.json(
      { success: false, error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}
