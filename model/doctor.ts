// lib/models/doctor.ts

import { Schema, model, Document } from 'mongoose';

interface Doctor {
  name: string;
  contact: string;
  speciality: string;
  degree: string;
  email: string;
  username: string;
}

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
