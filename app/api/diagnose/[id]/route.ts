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
      req.patientId = params?.id;
      req.time = new Date();

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
  try {
      const db = await connectToDatabase();
      
      const diagnosis = await db.collection('diagnoses').find({"patientId": params?.id}).toArray();

      if (!diagnosis) {
          return NextResponse.json({
              success: false,
              status: 404,
              error: "Diagnosis not found"
          });
      }

      return NextResponse.json({
          success: true,
          status: 200,
          diagnosis
      });

  } catch (error) {
      console.log("Error searching diagnosis:", error);

      return NextResponse.json({
          success: false,
          error: "Internal Server Error"
      }, { status: 500 });
  }
};
