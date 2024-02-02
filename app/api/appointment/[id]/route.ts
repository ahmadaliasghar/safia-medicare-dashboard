import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const db = await connectToDatabase();
    const req = await request.json();
    const appointmentId = params?.id ? new ObjectId(params.id) : null;

    const query = appointmentId ? { _id: appointmentId } : {};

    let appointment = await db.collection('appointments').findOne(query);

    if (!appointment) {
      return NextResponse.json({
        success: false,
        status: 404,
        error: "Appointment not found!!!"
      });
    }

    await db.collection('appointments').deleteOne(query);

    return NextResponse.json({
      success: true,
      status: 200,
      error: "Appointment Deleted"
    });

  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);

    return NextResponse.json({
      success: false,
      status: 500,
      error: "Internal Server Error"
    });
  }
};
