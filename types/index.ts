import { Schema } from "mongoose";

export interface Patient {
    _id?:string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    contact: string;
    email: string;
}

export interface Doctor {
    name: string;
    contact: string;
    speciality: string;
    degree: string;
    email: string;
    username: string;
}

export interface Appointment {
    title: string;
    date: Date;
    time: string;
    status: string;
    patient: Schema.Types.ObjectId;
    doctor: Schema.Types.ObjectId;
  }