import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
 try {
    const db = await connectToDatabase();
    const appointmentsCollection = db.collection('appointments');

    const appointments = await appointmentsCollection.find({}).toArray();

    return NextResponse.json({
        status: 200,
        appointments
      });

  } catch (error) {
    console.error(error);

    return NextResponse.json({
        status: 500,
        error: "Internal Server Error"
      });
  }
};
