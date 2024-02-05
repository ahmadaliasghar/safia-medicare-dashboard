import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const db = await connectToDatabase();
    const appointmentId = params?.id ? new ObjectId(params.id) : null;

    const query = appointmentId ? { _id: appointmentId } : {};

    let patient = await db.collection('patients').findOne(query);

    if (!patient) {
      return NextResponse.json({
        success: false,
        error: "Patient not found!!!"
      }, { status: 404});
    }

    await db.collection('patients').deleteOne(query);

    return NextResponse.json({
      success: true,
      status: 200,
      error: "Patient Deleted"
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error: "Internal Server Error"
    }, { status: 500 });
  }
};

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
  console.log("🚀 ~ PUT ~ id:", params?.id)
  try {
    const db = await connectToDatabase();
    const req = await request.json();
    console.log("🚀 ~ PUT ~ req:", req)
    const appointmentId = params?.id ? new ObjectId(params.id) : null;

    const query = appointmentId ? { _id: appointmentId } : {};

    let patient = await db.collection('patients').findOne(query);

    if (!patient) {
      return NextResponse.json({
        success: false,
        error: "Patient not found!!!"
      }, {status: 404});
    }

    await db.collection('patients').updateOne(query, { $set: req });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Patient Updated",
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
export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  console.log("🚀 ~ GET ~ id:", params.id)
  try {
    const db = await connectToDatabase();
    const appointmentId = params?.id ? new ObjectId(params.id) : null;

    const query = appointmentId ? { _id: appointmentId } : {};

    let patient = await db.collection('patients').findOne(query);

    if (!patient) {
      return NextResponse.json({
        success: false,
        error: "Patient not found!!!"
      }, {status: 404});
    }

    return NextResponse.json({
      success: true,
      status: 200,
      patient
    });

  } catch (error) {
    console.log("🚀 ~ PUT ~ error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error"
    }, { status: 500 });
  }
};

