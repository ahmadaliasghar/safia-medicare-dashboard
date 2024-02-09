import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
      const db = await connectToDatabase();
      const req = await request.json();
      const patientId = params?.id ? new ObjectId(params.id) : null;

      console.log("🚀 ~ POST ~ req:", req)
      
      if (!patientId) {
          return NextResponse.json({
              success: false,
              status: 400,
              error: "Invalid patient ID"
          });
      }

      req.patientId = params?.id;
      req.time = new Date();

      console.log("🚀 ~ POST ~ req:", req)
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

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
    console.log(params?.id);
  try {
      const db = await connectToDatabase();
      const diagnosis = await db.collection('diagnoses').find({"patientId": params?.id}).toArray();
      console.log("🚀 ~ GET ~ diagnosis:", diagnosis)

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
