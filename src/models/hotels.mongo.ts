import mongoose, { Document } from 'mongoose';

export interface Hotel extends Document {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  createdAt: Date;
}

const hotelSchema = new mongoose.Schema<Hotel>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const HotelModel = mongoose.model<Hotel>('Hotel', hotelSchema);

export default HotelModel;
