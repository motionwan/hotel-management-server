import mongoose, { Document } from 'mongoose';
import { Hotel } from './hotels.mongo';

interface Staff extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role:
    | 'admin'
    | 'staff'
    | 'super-admin'
    | 'house-keeper'
    | 'facility-manager'
    | 'store-manager'
    | 'restaurant-manager'
    | 'accountant';
  hotelId: Hotel['_id'];
  verified: boolean;
  accessToken: string;
  refreshToken: string;
  createdAt: Date;
}

const staffSchema = new mongoose.Schema<Staff>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, lowercase: true, required: true, unique: true },
  password: { type: String, required: true },
  accessToken: { type: String },
  refreshToken: { type: String },
  role: {
    type: String,
    enum: [
      'super-admin',
      'admin',
      'house-keeper',
      'facility-manager',
      'accountant',
      'staff',
      'restaurant-manager',
      'store-manager',
    ],
    default: 'staff',
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
  },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const StaffModel = mongoose.model<Staff>('Staff', staffSchema);

export default StaffModel;
