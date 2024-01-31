// lib/models/appointment.ts

import { Schema, model, Document } from 'mongoose';

interface Appointment {
  title: string;
  date: Date;
  time: string;
  status: string;
  patient: Schema.Types.ObjectId;
  doctor: Schema.Types.ObjectId;
}

const appointmentSchema = new Schema<Appointment & Document>({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, required: true },
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
});

const AppointmentModel = model<Appointment & Document>('Appointment', appointmentSchema);

export default AppointmentModel;
