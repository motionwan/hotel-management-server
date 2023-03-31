import mongoose, { Document } from 'mongoose';

export interface Report extends Document {
  type: 'daily' | 'weekly' | 'monthly';
  date: Date;
  description: string;
  createdBy: mongoose.Types.ObjectId | null;
  data: any;
}

const reportSchema = new mongoose.Schema<Report>({
  type: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: false,
  },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
});

const ReportModel = mongoose.model<Report>('Report', reportSchema);

export default ReportModel;
