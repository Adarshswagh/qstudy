import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log("Visa Check Form Submission:", body);
    
    // Validate required fields
    const requiredFields = [
      "fullName",
      "emailAddress",
      "dateOfBirth",
      "nationality",
      "passportNumber",
      "passportExpiryDate",
    ];
    
    const missingFields = requiredFields.filter((field) => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }
    
    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Send confirmation email to user
    
    // For now, just return success
    return NextResponse.json(
      {
        success: true,
        message: "Visa check request submitted successfully",
        data: body,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing visa check:", error);
    return NextResponse.json(
      { error: "Failed to process visa check request" },
      { status: 500 }
    );
  }
}


