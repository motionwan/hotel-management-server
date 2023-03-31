import mongoose, { Document } from 'mongoose';
import { Hotel } from './hotels.mongo';

interface Staff extends Document {
  name: string;
  email: string;
  password: string;
  hotel: Hotel['_id'];
  role: 'admin' | 'staff';
}

const staffSchema = new mongoose.Schema<Staff>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  role: { type: String, enum: ['admin', 'staff'], default: 'staff' },
});

const StaffModel = mongoose.model<Staff>('Staff', staffSchema);

export default StaffModel;
