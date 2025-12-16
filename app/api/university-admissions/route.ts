import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log("University Admissions Form Submission:", body);
    
    // Validate required fields
    const requiredFields = [
      "fullName",
      "emailAddress",
      "contactNumber",
      "preferredProgram",
      "highestAcademicQualification",
      "typeOfQualification",
      "universityCategory",
      "preferredUniversity",
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
        message: "Application submitted successfully",
        data: body,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing university admission:", error);
    return NextResponse.json(
      { error: "Failed to process application" },
      { status: 500 }
    );
  }
}

