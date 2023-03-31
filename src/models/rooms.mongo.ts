import mongoose, { Document } from 'mongoose';
import { Hotel } from './hotels.mongo';

export interface Room extends Document {
  roomNumber: String;
  type: string;
  amenities: string[];
  hotel: Hotel['_id'];
}

const roomSchema = new mongoose.Schema<Room>({
  roomNumber: { type: String, unique: true, required: true },
  type: { type: String, required: true },
  amenities: [{ type: String }],
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
});

const RoomModel = mongoose.model<Room>('Room', roomSchema);

export default RoomModel;
