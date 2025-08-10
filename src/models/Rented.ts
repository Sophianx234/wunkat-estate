import { Schema, model, models, Types } from 'mongoose';

interface IRented {
  tenantId: Types.ObjectId; // Ref to User
  propertyId: Types.ObjectId; // Ref to Property
  leaseType: 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date;
  status: 'active' | 'ended';
}

const RentedSchema = new Schema<IRented>({
  tenantId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  propertyId: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
  leaseType: { type: String, enum: ['monthly', 'yearly'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'ended'], default: 'active' },
});

export default models.Rented || model<IRented>('Rented', RentedSchema);
