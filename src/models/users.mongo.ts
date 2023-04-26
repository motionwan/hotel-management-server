import mongoose, { Document } from 'mongoose';
import { Hotel } from './hotels.mongo';
export interface Customer extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  hotelId: Hotel['_id'];
  verified: boolean;
  accessToken: string;
  refreshToken: string;
  createdAt: Date;
}

const Customer = new mongoose.Schema<Customer>({
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
      'staff',
      'house-keeper',
      'store-manager',
      'restaurant-manager',
      'guest',
    ],
    default: 'guest',
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
  },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const CustomerSchema = mongoose.model<Customer>('Customer', Customer);

export default CustomerSchema;
