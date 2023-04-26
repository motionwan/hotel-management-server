import mongoose, { Document } from 'mongoose';
import { Hotel } from './hotels.mongo';

export interface Amenity extends Document {
  name: String;
  condition: string;
  hotelId: Hotel['_id'];
}

const aminitySchema = new mongoose.Schema<Amenity>({
  name: { type: String, required: true },
  condition: { type: String, required: true },

  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
  },
});

const AmenityModel = mongoose.model<Amenity>('Amenity', aminitySchema);

export default AmenityModel;
