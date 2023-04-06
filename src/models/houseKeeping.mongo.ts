import mongoose, { Document } from 'mongoose';

export interface Housekeeping extends Document {
  room: mongoose.Types.ObjectId;
  date: Date;
  description: string;
  createdBy: mongoose.Types.ObjectId;
}

const housekeepingSchema = new mongoose.Schema<Housekeeping>(
  {
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
      required: true,
    },
  },
  { timestamps: true }
);

const HousekeepingModel = mongoose.model<Housekeeping>(
  'Housekeeping',
  housekeepingSchema
);

export default HousekeepingModel;
