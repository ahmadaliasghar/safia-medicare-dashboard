import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const db = await connectToDatabase();
      const req = await request.json();
      const patientId = params?.id ? new ObjectId(params.id) : null;
  
      if (!patientId) {
        return NextResponse.json({
          success: false,
          status: 400,
          error: "Invalid patient ID"
        });
      }
  
      // Add patient ID to the diagnosis data
      req.patientId = patientId;
  
      // Save the diagnosis
      await db.collection('diagnoses').insertOne(req);
  
      return NextResponse.json({
        success: true,
        status: 200,
        message: "Diagnosis saved successfully"
      });
  
    } catch (error) {
      console.log("Error saving diagnosis:", error);
  
      return NextResponse.json({
        success: false,
        error: "Internal Server Error"
      }, { status: 500 });
    }
  };

  export const GET = async ({ params }: { params: { id: string } }) => {
    console.log("🚀 ~ GET ~ params:", params)
    try {
      const db = await connectToDatabase();
      const patientId = params?.id ? new ObjectId(params.id) : null;
      console.log("🚀 ~ GET ~ patientId:", patientId)
  
      if (!patientId) {
        return NextResponse.json({
          success: false,
          status: 400,
          error: "Invalid patient ID"
        });
      }
  
      const patient = await db.collection('patients').findOne({ _id: patientId });
  
      if (!patient) {
        return NextResponse.json({
          success: false,
          status: 404,
          error: "Patient not found"
        });
      }
  
      return NextResponse.json({
        success: true,
        status: 200,
        patient
      });
  
    } catch (error) {
      console.log("Error searching patient:", error);
  
      return NextResponse.json({
        success: false,
        error: "Internal Server Error"
      }, { status: 500 });
    }
  };