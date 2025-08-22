import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";

export interface IRoom extends mongoose.Document {
  houseId?: Types.ObjectId;
  name: string;
  description?: string;
  price: number;
  available: boolean;
  images: string[];
  beds: number;
  baths: number;
  smartLockEnabled?: boolean;  // ✅ Conditional based on house
  lockStatus?: "locked" | "unlocked";
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

    beds: { type: Number, required: true, min: 0 },
    baths: { type: Number, required: true, min: 0 },

    // ✅ Smart lock fields
    smartLockEnabled: { type: Boolean, default: false },
    lockStatus: { type: String, enum: ["locked", "unlocked"], default: "locked" },
  },
  { timestamps: true }
);

// Middleware: Ensure room smart lock matches house setting
/* RoomSchema.pre("save", async function (next) {
  if (this.houseId) {
    const House = mongoose.model("House");
    const house = await House.findById(this.houseId);

    if (!house?.smartLockSupport) {
      // If house doesn’t support smart locks, force-disable them
      this.smartLockEnabled = false;
      this.lockStatus = undefined;
    }
  }
  next();
}); */

const Room =
  mongoose.models.Room || mongoose.model<IRoom>("Room", RoomSchema);

export default Room;
