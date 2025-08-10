import { Schema, model, models, Types } from 'mongoose';

interface IPayment {
  rentedId: Types.ObjectId; // Ref to Rented
  amount: number;
  date: Date;
  receiptNo: string;
  description?: string;
}

const PaymentSchema = new Schema<IPayment>({
  rentedId: { type: Schema.Types.ObjectId, ref: 'Rented', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  receiptNo: { type: String, required: true, unique: true },
  description: String,
});

export default models.Payment || model<IPayment>('Payment', PaymentSchema);
