import mongoose, { Schema, Document, models, model } from "mongoose";

export interface INotification extends Document {
  title: string;
  message: string;
  type: "system" | "maintenance" | "payment" | "booking";
  audience: "all" | "user" | "admin"; // who should see it
  userId?: mongoose.Types.ObjectId; // if specific user
  isReadBy?: mongoose.Types.ObjectId[]; // users who have read it
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["system", "maintenance", "payment", "booking"],
      default: "system",
    },
    audience: {
      type: String,
      enum: ["all", "user", "admin"],
      default: "all",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isReadBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export default models.Notification ||
  model<INotification>("Notification", NotificationSchema);
