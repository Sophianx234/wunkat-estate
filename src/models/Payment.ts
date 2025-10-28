import mongoose, { Schema, Types } from "mongoose";

export interface IPayment extends mongoose.Document {
  _id:string
  userId: Types.ObjectId;
  roomId: Types.ObjectId;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed"|'expired';
  paymentMethod: "card" | "mobile_money" | "paypal";
  reference: string;
  expiresAt: Date
  updatedAt: Date;
  createdAt: Date;
}

const PaymentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "Cedi" },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["card", "mobile_money"],
      required: true,
    },
    reference: { type: String, unique: true, required: true },
    expiresAt: {
      type: Date,
      required: [true,'expires at required ']
    }
  },
  { timestamps: true }
);

const Payment =
  mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;
