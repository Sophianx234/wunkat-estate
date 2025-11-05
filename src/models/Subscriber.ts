import mongoose, { Schema, model, models } from "mongoose";

interface ISubscriber {
  name?: string;
  email: string;
  subscribedAt: Date;
  status: "active" | "unsubscribed";
}

const subscriberSchema = new Schema<ISubscriber>({
  
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  subscribedAt: { type: Date, default: () => new Date() },
  status: { type: String, enum: ["active", "unsubscribed"], default: "active" },
});

// Prevent model overwrite on hot reload in dev
const Subscriber = models.Subscriber || model<ISubscriber>("Subscriber", subscriberSchema);

export default Subscriber;
