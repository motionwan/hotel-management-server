import mongoose, { Document } from 'mongoose';
import { Room } from './rooms.mongo';
import { Customer } from './customers.mongo';

export interface Booking extends Document {
  roomId: Room['_id'];
  checkInDate: Date;
  checkOutDate: Date;
  additionalServices: string[];
  customer: Customer['_id'];
  // hotelId: Hotel['_id'];
  totalPrice: number;
}

const userSchema = new mongoose.Schema<Booking>({
  roomId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Room' },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  additionalServices: { type: [String], default: [] },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  totalPrice: { type: Number },
});

const UserModel = mongoose.model<Booking>('User', userSchema);

export default UserModel;
