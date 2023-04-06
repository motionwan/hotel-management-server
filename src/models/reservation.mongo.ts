import mongoose, { Document } from 'mongoose';
import { Room } from './rooms.mongo';

export interface Reservation extends Document {
  guestFirstName: string;
  guestLastName: string;
  checkInDate: Date;
  checkOutDate: Date;
  room: Room['_id'];
}

const reservationSchema = new mongoose.Schema<Reservation>(
  {
    guestFirstName: { type: String, required: true },
    guestLastName: { type: String },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  },
  { timestamps: true }
);

const ReservationModel = mongoose.model<Reservation>(
  'Reservation',
  reservationSchema
);

export default ReservationModel;
