import { Schema } from "mongoose";
import mongoose, { Schema, Document, Types } from "mongoose";

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


// House Interface
export interface IHouse extends Document {
  name: string;
  description?: string;
  price: number; // price for the whole house
  location: LocationType;
  rooms?: Types.ObjectId[]; // references to Room
  owner: string; // or ObjectId if you have a User collection
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
// House Schema
const HouseSchema = new Schema<IHouse>(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    location: { type: LocationSchema, required: true },
    rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
    owner: { type: String, required: true },
    amenities: [String],
  },
  { timestamps: true }
);

export const HouseModel = mongoose.model<IHouse>("House", HouseSchema);