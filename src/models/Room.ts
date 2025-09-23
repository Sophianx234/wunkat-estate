import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";

export interface IRoom extends mongoose.Document {
  houseId?: Types.ObjectId;
  name: string;
  description?: string;
  price: number;
  status: "available" | "booked" | "pending";
  images: string[];
  beds: number;
  baths: number;
  smartLockEnabled?: boolean; // ✅ Conditional based on house
  lockStatus?: "locked" | "unlocked";
  planType?: "monthly" | "yearly"; // ✅ new field
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema: Schema = new Schema(
  {
    houseId: { type: Schema.Types.ObjectId, ref: "House" },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["available", "booked", "pending"],
      default: "available",
    },
    images: { type: [String] },

    beds: { type: Number, required: true, min: 0 },
    baths: { type: Number, required: true, min: 0 },

    // ✅ Smart lock fields
    smartLockEnabled: { type: Boolean, default: false },
    lockStatus: {
      type: String,
      enum: ["locked", "unlocked"],
      default: "locked",
    },

    // ✅ Plan type field
    planType: {
      type: String,
      enum: ["monthly", "yearly"],
      default: "monthly",
    },
  },
  { timestamps: true }
);

const Room = mongoose.models.Room || mongoose.model<IRoom>("Room", RoomSchema);

export default Room;
