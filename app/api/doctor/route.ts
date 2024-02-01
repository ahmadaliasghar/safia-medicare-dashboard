import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
    const db = await connectToDatabase();
    const doctorsCollection = db.collection('doctors');

    const doctors = await doctorsCollection.find({}).toArray();

    return NextResponse.json({
        success: true,
        status: 200,
        doctors
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

        let doctor = await db.collection('doctors').findOne({ email });

        if(doctor) {
            return NextResponse.json({
                success: false,
                status: 409,
                error: "Doctor with this email already exists!!!"
            })
        }

        let newDoctor = await db.collection('doctors').insertOne(req)

        return NextResponse.json({
            success: true,
            status: 200,
            message: "Doctor Created",
            data: newDoctor
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
