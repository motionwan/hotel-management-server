import mongoose, { Document } from 'mongoose';
import { Reservation } from './reservation.mongo';

interface Payment extends Document {
  amount: number;
  reservationId: Reservation['_id'];
  status: 'pending' | 'completed' | 'cancelled';
}

const paymentSchema = new mongoose.Schema<Payment>(
  {
    amount: { type: Number, required: true },
    reservationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reservation',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      required: true,
    },
  },
  { timestamps: true }
);

const PaymentModel = mongoose.model<Payment>('Payment', paymentSchema);

export default PaymentModel;
