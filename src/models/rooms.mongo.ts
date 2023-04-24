import mongoose, { Document } from 'mongoose';
import { Hotel } from './hotels.mongo';
import { Amenity } from './amenities.mongo';

export interface Room extends Document {
  roomNumber: String;
  type: string;
  amenities: Amenity['_id'];
  roomPics: string[];
  hotelId: Hotel['_id'];
}

const roomSchema = new mongoose.Schema<Room>({
  roomNumber: { type: String, unique: true, required: true },
  type: { type: String, required: true },
  amenities: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Amenity', required: true },
  ],
  roomPics: [{ type: String, required: true }],
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
  },
});

const RoomModel = mongoose.model<Room>('Room', roomSchema);

export default RoomModel;
