import { connectDB } from "@/lib/mongodb";
import Result from "@/models/Result";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const results = await Result.find();

    return NextResponse.json({
      message: "Fetched results successfully",
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error("Error fetching results:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
