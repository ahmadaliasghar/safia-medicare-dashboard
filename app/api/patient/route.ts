import { connectToDatabase } from "@/lib/db";
import PatientModel from "@/lib/models/patient";
import { Patient } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
    const db = await connectToDatabase();
    const patientsCollection = db.collection('patients');

    const patients = await patientsCollection.find({}).toArray();

    return NextResponse.json({
        success: true,
        status: 200,
        patients
      });

  } catch (error) {
    console.error(error);

    return NextResponse.json({
        success: false,
        status: 500,
        error: "Internal Server Error"
      });
  }
};

export const POST = async (request: NextRequest) => {
    try {
        const db = await connectToDatabase();
        const req = await request.json();

        const { email } = req;

        let patient = await db.collection('patients').findOne({ email });

        if(patient) {
            return NextResponse.json({
                success: false,
                status: 409,
                error: "Patient with this email already exists!!!"
            })
        }

        let newPatient = await db.collection('patients').insertOne(req)

        return NextResponse.json({
            success: true,
            status: 200,
            message: "Patient Created",
            data: newPatient
            });
   
     } catch (error) {
       console.error(error);
   
       return NextResponse.json({
           success: false,
           status: 500,
           error: "Internal Server Error"
         });
     }
   };
