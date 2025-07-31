import { connectToDatabase } from "@/config/DbConnect";
import cloudinary from "@/lib/cloudinary";
import { getTokenFromRequest } from "@/lib/jwtConfig";
import User from "@/models/User";
import { UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";

// Disable body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// 🔄 Convert Buffer to Stream
function bufferToStream(buffer: Buffer) {
  return Readable.from(buffer);
}

// 📤 Upload to Cloudinary from buffer stream
function uploadBufferToCloudinary(buffer: Buffer,userId:string){
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "wunkathomes/users",
         public_id: userId, // 👈 This ensures uniqueness
        overwrite: true,   // 👈 Overwrites existing image
        invalidate: true, },
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

    // 🔐 Get user token
    const token = await getTokenFromRequest(req);
    if (!token || !token.userId) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }


    // 📦 Parse the image from FormData
    const form = await req.formData();
    const image = form.get("image") as File;

    if (!image) {
      return NextResponse.json({ msg: "No image provided" }, { status: 400 });
    }

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ☁ Upload to Cloudinary
    const result = await uploadBufferToCloudinary(buffer,token.userId);

    // 🧠 Update DB
    const updatedUser = await User.findByIdAndUpdate(
      token.userId,
      { profile: (result as UploadApiResponse).secure_url },
      { new: true }
    );

    return NextResponse.json({ msg: "Profile updated", user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json({ msg: "Failed to update profile" }, { status: 500 });
  }
};
