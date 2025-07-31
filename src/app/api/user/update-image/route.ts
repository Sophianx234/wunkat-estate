import { connectToDatabase } from "@/config/DbConnect";
import cloudinary from "@/lib/cloudinary";
import { getTokenFromRequest } from "@/lib/jwtConfig";
import User from "@/models/User";
import { UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";

// 🔄 Convert Buffer to Stream
function bufferToStream(buffer: Buffer) {
  return Readable.from(buffer);
}

// 📤 Upload to Cloudinary from buffer stream
function uploadBufferToCloudinary(buffer: Buffer, userId: string) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "wunkathomes/users",
        public_id: userId,
        overwrite: true,
        invalidate: true,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result as UploadApiResponse);
      }
    );

    bufferToStream(buffer).pipe(stream);
  });
}

export const PATCH = async (req: NextRequest) => {
  try {
    await connectToDatabase();

    const token = await getTokenFromRequest(req);
    if (!token || !token.userId) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    const form = await req.formData();
    const image = form.get("image") as File | null;
    const email = form.get("email")?.toString();
    const name = form.get("name")?.toString();

    if (!image && !email && !name) {
      return NextResponse.json({ msg: "No data provided" }, { status: 400 });
    }

    const updateData: Partial<{ name: string; email: string; profile: string }> = {};

    if (email) updateData.email = email;
    if (name) updateData.name = name;

    if (image) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const result = await uploadBufferToCloudinary(buffer, token.userId);
      updateData.profile = (result as UploadApiResponse).secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(token.userId, updateData, {
      new: true,
    });

    return NextResponse.json({ msg: "Profile updated", user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json({ msg: "Failed to update profile" }, { status: 500 });
  }
};
