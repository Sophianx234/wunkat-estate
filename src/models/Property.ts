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

// Room Interface
export interface IRoom extends Document {
  name: string;
  description?: string;
  price: number;
  available: boolean;
  location: LocationType;
  house?: Types.ObjectId; // optional, in case the room belongs to a house
}

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

// Room Schema
const RoomSchema = new Schema<IRoom>(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },
    location: { type: LocationSchema, required: true },
    house: { type: Schema.Types.ObjectId, ref: "House" },
  },
  { timestamps: true }
);

export const RoomModel = mongoose.model<IRoom>("Room", RoomSchema);
