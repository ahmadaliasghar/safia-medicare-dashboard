import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const db = await connectToDatabase();
    const appointmentId = params?.id ? new ObjectId(params.id) : null;

    const query = appointmentId ? { _id: appointmentId } : {};

    let doctor = await db.collection('doctors').findOne(query);

    if (!doctor) {
      return NextResponse.json({
        success: false,
        error: "Doctor not found!!!"
      }, { status: 404});
    }

    await db.collection('doctors').deleteOne(query);

    return NextResponse.json({
      success: true,
      status: 200,
      error: "Doctor Deleted"
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error: "Internal Server Error"
    }, { status: 500 });
  }
};

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const db = await connectToDatabase();
    const req = await request.json();
    const appointmentId = params?.id ? new ObjectId(params.id) : null;

    const query = appointmentId ? { _id: appointmentId } : {};

    let doctor = await db.collection('doctors').findOne(query);

    if (!doctor) {
      return NextResponse.json({
        success: false,
        error: "Doctor not found!!!"
      }, {status: 404});
    }

    await db.collection('doctors').updateOne(query, { $set: req });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Doctor Updated",
      appointment: req
    });

  } catch (error) {
    console.log("🚀 ~ PUT ~ error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error"
    }, { status: 500 });
  }
};
