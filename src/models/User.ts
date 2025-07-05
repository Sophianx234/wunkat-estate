// models/User.js
import mongoose, { Schema } from "mongoose";

type userDocumentType ={
  name: string;
  email: string;
  password: string;
  role: "buyer" | "seller" | "agent" | "admin";
  phone?: string;
  avatar?: string;
  createdAt: Date;
}


const userSchema = new Schema<userDocumentType>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["buyer", "seller", "agent", "admin"],
    default: "buyer",
  },
  phone: String,
  avatar: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model<userDocumentType>("User", userSchema);
