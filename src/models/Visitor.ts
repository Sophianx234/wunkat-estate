import { Schema, model, models, Document } from "mongoose";

export interface IVisitor extends Document {
  visitorId: string;
  firstVisit: Date;
  lastVisit: Date;
  visits: number;
}

const VisitorSchema = new Schema<IVisitor>(
  {
    visitorId: { type: String, required: true, unique: true },
    firstVisit: { type: Date, default: Date.now },
    lastVisit: { type: Date, default: Date.now },
    visits: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Visitor = models.Visitor || model<IVisitor>("Visitor", VisitorSchema);
export default Visitor;
