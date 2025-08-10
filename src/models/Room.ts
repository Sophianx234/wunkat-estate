import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";

export interface IRoom extends mongoose.Document {
  houseId?: Types.ObjectId; // Optional if standalone
  name: string;
  location: string;
  description?: string;
  price: number;
  available: boolean;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema: Schema = new Schema(
  {
    houseId: { type: Schema.Types.ObjectId, ref: "House" },
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },
    images: { type: [String]},
  },
  { timestamps: true }
);

export default mongoose.model<IRoom>("Room", RoomSchema);
