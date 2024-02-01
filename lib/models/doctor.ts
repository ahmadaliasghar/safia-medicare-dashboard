
import { Doctor } from '@/types';
import { Schema, model, Document } from 'mongoose';

const doctorSchema = new Schema<Doctor & Document>({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  speciality: { type: String, required: true },
  degree: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
});

const DoctorModel = model<Doctor & Document>('Doctor', doctorSchema);

export default DoctorModel;
