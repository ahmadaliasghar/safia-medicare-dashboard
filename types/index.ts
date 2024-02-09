import { Schema } from "mongoose";

export interface Person {
  _id?: string;
  name: string;
}

export interface Patient {
    _id?:string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    contact: string;
    email: string;
    gender: string;
}

export interface Doctor {
    name: string;
    contact: string;
    speciality: string;
    degree: string;
    email: string;
    username: string;
    status: string;
}

export interface Appointment {
    _id?: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
    patient: string | Person;
    doctor: string | Person;
  }

  export interface Response {
    data?: [];
    status?:number;
    message?: string;
    success?: boolean
  }

  export interface Diagnose {
    id?: string;
    status: string;
    diagnosis: string;
    disease: string;
  }