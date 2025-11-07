import mongoose, { Schema, models } from "mongoose";

const FeedbackSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Feedback = models.Feedback || mongoose.model("Feedback", FeedbackSchema);

export default Feedback;
