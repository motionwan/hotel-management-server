import mongoose, { Document } from 'mongoose';
import { Hotel } from './hotels.mongo';
import { Room } from './rooms.mongo';

export interface Amenity extends Document {
  name: String;
  condition: string;
  //type: string;
  // roomId: Room['_id'];
  hotelId: Hotel['_id'];
}

const roomSchema = new mongoose.Schema<Amenity>({
  name: { type: String, unique: true, required: true },
  condition: { type: String, required: true },
  //type: { type: String, required: true },
  // amenities: [{ type: String }],
  // roomId: [
  //   { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  // ],
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
  },
});

const AmenityModel = mongoose.model<Amenity>('Amenity', roomSchema);

export default AmenityModel;
