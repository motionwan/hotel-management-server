import mongoose, { Document } from 'mongoose';
import { Room } from './rooms.mongo';

export interface Reservation extends Document {
  guestName: string;
  checkInDate: Date;
  checkOutDate: Date;
  room: Room['_id'];
}

const reservationSchema = new mongoose.Schema<Reservation>({
  guestName: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
});

const ReservationModel = mongoose.model<Reservation>(
  'Reservation',
  reservationSchema
);

export default ReservationModel;
