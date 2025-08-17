import mongoose, { Document, Schema, Types } from "mongoose";

export type LocationType = {
  address: string;
  city: string;
  region: string;
  country?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
};

export interface IHouse extends Document {
  name: string;
  description?: string;
  location: LocationType;
  rooms?: Types.ObjectId[];
  owner: string;
  amenities?: string[];
}

const LocationSchema = new Schema<LocationType>({
  address: { type: String, required: true },
  city: { type: String, required: true },
  region: { type: String, required: true },
  country: { type: String, default: "Ghana" },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number },
  },
});

const HouseSchema = new Schema<IHouse>(
  {
    name: { type: String, required: true },
    description: String,
    location: { type: LocationSchema, required: true },
    rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
  },
  { timestamps: true }
);

// ✅ Avoid OverwriteModelError
const House =
  mongoose.models.House || mongoose.model<IHouse>("House", HouseSchema);
export default House;
