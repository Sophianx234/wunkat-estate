// models/User.js
import mongoose, { Schema } from "mongoose";

export type userDocumentType ={
  _id?:string
  name: string;
  email: string;
  profile?:string;
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
    select: false
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
  profile:{
    type:String,
    default:'/images/user-default.png'
  }
});

export default mongoose.models.User || mongoose.model<userDocumentType>("User", userSchema);
