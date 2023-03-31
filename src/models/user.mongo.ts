import mongoose, { Document } from 'mongoose';
import { Hotel } from './hotels.mongo';

interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  hotel: Hotel['_id'];
  createdAt: Date;
}

const userSchema = new mongoose.Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['guest', 'staff', 'admin', 'superadmin'],
    default: 'guest',
  },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  createdAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
