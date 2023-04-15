import mongoose, { Document } from 'mongoose';

export interface Hotel extends Document {
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  logo: string;
  email: string;
  country: string;
  createdAt: Date;
  timestamps: Date;
  settings: {
    host: string;
    service: string;
    senderEmail: string;
    emailPassword: string;
    hubtelApiSecret: string;
    hubtelClientId: string;
  };
}

const hotelSchema = new mongoose.Schema<Hotel>(
  {
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    phone: { type: String, required: true },
    logo: { type: String },
    email: { type: String, required: true, lowercase: true, unique: true },
    country: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    settings: {
      host: { type: String },
      service: { type: String },
      senderEmail: { type: String },
      emailPassword: { type: String },
      sendGridApiKey: { type: String },
      hubtelApiSecret: { type: String },
      hubtelClientId: { type: String },
    },
  },
  { timestamps: true }
);

const HotelModel = mongoose.model<Hotel>('Hotel', hotelSchema);

export default HotelModel;
