import { Patient } from '@/types';
import { Schema, model, Document } from 'mongoose';

const patientSchema = new Schema<Patient & Document>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const PatientModel = model<Patient & Document>('Patient', patientSchema);

export default PatientModel;
