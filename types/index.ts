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
    _id?: string;
    title: string;
    date: string;
    time: string;
    status: string;
    patient: string | Person;
    doctor: string;
  }

  export interface Response {
    data?: [];
    status?:number;
    message?: string;
    success?: boolean
  }