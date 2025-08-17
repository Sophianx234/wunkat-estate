import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";

export interface IRoom extends mongoose.Document {
  houseId?: Types.ObjectId; // Optional if standalone
  name: string;
  description?: string;
  price: number;
  available: boolean;
  images: string[];
  beds: number;
  baths: number;
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema: Schema = new Schema(
  {
    houseId: { type: Schema.Types.ObjectId, ref: "House" },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },
    images: { type: [String] },

    // ✅ New fields
    beds: { type: Number, required: true, min: 0 },
    baths: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const Room =
  mongoose.models.Room || mongoose.model<IRoom>("Room", RoomSchema);

export default Room;
