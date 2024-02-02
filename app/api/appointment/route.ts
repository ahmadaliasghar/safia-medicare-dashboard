import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
 try {
    const db = await connectToDatabase();
    const appointmentsCollection = db.collection('appointments');

    const appointments = await appointmentsCollection.find({}).toArray();

    return NextResponse.json({
        success: true,
        status: 200,
        appointments
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

      console.log("🚀 ~ POST ~ req:", req)
      if(!req?.patient) {
      return NextResponse.json({
        success: false,
        status: 400,
        error: "Patient is Missing!!!",
      });
    }

      let newAppointment = await db.collection('appointments').insertOne(req)
      console.log("🚀 ~ POST ~ newAppointment:", newAppointment)

      return NextResponse.json({
          success: true,
          status: 200,
          message: "Appointment Created",
          data: newAppointment
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

 export const DELETE = async (request: NextRequest) => {
  try {
      const db = await connectToDatabase();
      const req = await request.json();

      console.log("🚀 ~ POST ~ req:", req)
      if(!req?.patient) {
      return NextResponse.json({
        success: false,
        status: 400,
        error: "Patient is Missing!!!",
      });
    }

      let newAppointment = await db.collection('appointments').insertOne(req)

      return NextResponse.json({
          success: true,
          status: 200,
          message: "Appointment Created",
          data: newAppointment
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
