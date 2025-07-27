// app/api/auth/register/route.ts
import { connectToDatabase } from "@/config/DbConnect";
import { encryptPassword } from "@/lib/bcrypt";
import cloudinary from "@/lib/cloudinary";
import { signToken } from "@/lib/jwtConfig";
import { setAuthCookie } from "@/lib/setAuthCookie";
import User from "@/models/User";
import { Fields, Files, IncomingForm } from "formidable";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";

// Tell Next.js not to parse the body
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to parse multipart form



export async function parseForm(req: NextRequest): Promise<{ fields: Fields; files: Files }> {
  const form = new IncomingForm({ keepExtensions: true });

  const buffer = await req.arrayBuffer();
  const stream = Readable.from(Buffer.from(buffer));

  return new Promise((resolve, reject) => {
    form.parse(stream, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}


// Upload to cloudinary
const uploadToCloudinary = async (file: Files) => {
  return await cloudinary.uploader.upload(file?.filepath, {
    folder: "dasa_users",
  });
};

export const POST = async (req: NextRequest) => {
  try {
    await connectToDatabase();

    const { fields, files } = await parseForm(req);
    const { name, email, password, confirmPassword } = fields;

    if (password !== confirmPassword) {
      return NextResponse.json({ msg: "Passwords do not match" }, { status: 400 });
    }

    let imageUrl = "/images/user-default.png"; // fallback
    if (files.image) {
      const result = await uploadToCloudinary(files.image);
      imageUrl = result.secure_url;
    }

    const newPassword = await encryptPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: newPassword,
      profile: imageUrl, // Save image URL in MongoDB
    });

    const token = await signToken(newUser);
    return setAuthCookie(token);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "fail", msg: err }, { status: 500 });
  }
};
