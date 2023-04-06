import mongoose, { Document } from 'mongoose';

export interface IRoomAccess extends Document {
  roomId: mongoose.Types.ObjectId;
  userEmail: string;
  checkIn: Date;
  checkOut: Date | null;
}

const RoomAccessSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
      default: Date.now,
    },
    checkOut: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const RoomAccess = mongoose.model<IRoomAccess>('RoomAccess', RoomAccessSchema);

export default RoomAccess;
