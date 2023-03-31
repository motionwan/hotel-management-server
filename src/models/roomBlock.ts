import mongoose, { Document } from 'mongoose';
import { Hotel } from './hotels.mongo';

export interface RoomBlock extends Document {
  hotel: Hotel['_id'];
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  rooms: { room: string; quantity: number }[];
}

const roomBlockSchema = new mongoose.Schema<RoomBlock>({
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  name: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  rooms: [
    {
      room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

const RoomBlockModel = mongoose.model<RoomBlock>('RoomBlock', roomBlockSchema);

export default RoomBlockModel;
