import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const db = await connectToDatabase();
    const appointmentId = params?.id ? new ObjectId(params.id) : null;

    const query = appointmentId ? { _id: appointmentId } : {};

    let appointment = await db.collection('appointments').findOne(query);

    if (!appointment) {
      return NextResponse.json({
        success: false,
        error: "Appointment not found!!!"
      }, { status: 404});
    }

    await db.collection('appointments').deleteOne(query);

    return NextResponse.json({
      success: true,
      status: 200,
      error: "Appointment Deleted"
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

    let appointment = await db.collection('appointments').findOne(query);

    if (!appointment) {
      return NextResponse.json({
        success: false,
        status: 404,
        error: "Appointment not found!!!"
      });
    }

    await db.collection('appointments').updateOne(query, { $set: req });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Appointment Updated",
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

export const PATCH = async (request: NextRequest, { params }: { params: { id: string } }) => {
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

    await db.collection('appointments').updateOne(query, { $set: req });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Appointment Patched",

    });

  } catch (error) {
    console.log("🚀 ~ PATCH ~ error:", error);

    return NextResponse.json({
      success: false,
      status: 500,
      error: "Internal Server Error"
    });
  }
};
