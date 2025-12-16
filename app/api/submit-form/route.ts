import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import type { FormSubmissionData, FormSubmissionResponse, VisaFormData } from "@shared/api";

// Create transporter for email with SMTP configuration
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER || "info@qstudyworld.com";
  const emailPassword = process.env.EMAIL_PASSWORD;
  const smtpHost = process.env.SMTP_HOST || "smtpout.secureserver.net";
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465;
  const smtpSecure = process.env.SMTP_SECURE === "true" || process.env.SMTP_ENCRYPTION === "ssl";

  if (!emailPassword) {
    throw new Error("EMAIL_PASSWORD environment variable is not set. Please configure it in your .env.local file.");
  }

  console.log("Creating SMTP transporter...");
  console.log("Host:", smtpHost);
  console.log("Port:", smtpPort);
  console.log("Secure:", smtpSecure);
  console.log("User:", emailUser);

  // Use custom SMTP configuration
  // For GoDaddy/secure server (smtpout.secureserver.net)
  const transporterConfig: any = {
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure, // true for 465 (SSL), false for 587 (TLS)
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
    tls: {
      // Do not fail on invalid certs
      rejectUnauthorized: false,
    },
    // Add connection timeout
    connectionTimeout: 30000, // 30 seconds
    greetingTimeout: 30000,
    socketTimeout: 30000,
    debug: true, // Enable debug output
    logger: true, // Enable logging
  };

  return nodemailer.createTransport(transporterConfig);
};

// Format form data into HTML email
const formatFormDataToHTML = (data: FormSubmissionData): string => {
  let html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
        New ${data.formType.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} Form Submission
      </h2>
      <div style="margin-top: 20px;">
  `;

  // Format based on form type
  switch (data.formType) {
    case "apply-now":
      html += `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Program Looking For:</strong> ${data.programLookingFor}</p>
        <p><strong>Highest Qualification:</strong> ${data.highestQualification}</p>
        <p><strong>Type of Qualification:</strong> ${data.typeOfQualification}</p>
        <p><strong>University Type:</strong> ${data.universityType}</p>
        <p><strong>Selected University:</strong> ${data.selectedUniversity || "Not selected"}</p>
      `;
      break;

    case "check-eligibility":
      html += `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Gender:</strong> ${data.gender}</p>
        <p><strong>Nationality:</strong> ${data.nationality}</p>
        <p><strong>Program Looking For:</strong> ${data.programLookingFor}</p>
        <p><strong>Highest Qualification:</strong> ${data.highestQualification}</p>
        <p><strong>Type of Qualification:</strong> ${data.typeOfQualification}</p>
        <p><strong>University Type:</strong> ${data.universityType}</p>
        <p><strong>Selected University:</strong> ${data.selectedUniversity || "Not selected"}</p>
      `;
      break;

    case "check-visa":
      html += `
        <p><strong>Full Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Date of Birth:</strong> ${data.dob}</p>
        <p><strong>Nationality:</strong> ${data.nationality}</p>
        <p><strong>Passport Number:</strong> ${data.passportNumber}</p>
        <p><strong>Passport Expiry:</strong> ${data.passportExpiry}</p>
        ${data.course ? `<p><strong>Course:</strong> ${data.course}</p>` : ""}
        ${data.institution ? `<p><strong>Institution:</strong> ${data.institution}</p>` : ""}
        ${data.qualification ? `<p><strong>Qualification:</strong> ${data.qualification}</p>` : ""}
        ${data.englishLevel ? `<p><strong>English Level:</strong> ${data.englishLevel}</p>` : ""}
        ${data.funding ? `<p><strong>Funding:</strong> ${data.funding}</p>` : ""}
      `;
      break;

    case "accommodation":
      html += `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.address ? `<p><strong>Address:</strong> ${data.address}</p>` : ""}
        ${data.guardianDetails ? `<p><strong>Guardian Details:</strong> ${data.guardianDetails}</p>` : ""}
        <p><strong>Accommodation Type:</strong> ${data.accommodationType}</p>
        <p><strong>Preferred Accommodation:</strong> ${data.preferredAccommodation}</p>
        <p><strong>Start Date:</strong> ${data.startDate}</p>
        <p><strong>End Date:</strong> ${data.endDate}</p>
        ${data.universityType ? `<p><strong>University Type:</strong> ${data.universityType}</p>` : ""}
        ${data.selectedUniversity ? `<p><strong>Selected University:</strong> ${data.selectedUniversity}</p>` : ""}
      `;
      break;

    case "transportation":
      html += `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Date of Arrival:</strong> ${data.dateOfArrival}</p>
        <p><strong>Contact Number:</strong> ${data.contactNumber}</p>
        <p><strong>Flight Detail:</strong> ${data.flightDetail}</p>
        <p><strong>Flight Number:</strong> ${data.flightNumber}</p>
        <p><strong>Number of Luggage:</strong> ${data.numberOfLuggage}</p>
        <p><strong>Number of Person:</strong> ${data.numberOfPerson}</p>
        <p><strong>Needs Airport Pickup:</strong> ${data.needsAirportPickup ? "Yes" : "No"}</p>
        ${data.universityType ? `<p><strong>University Type:</strong> ${data.universityType}</p>` : ""}
        ${data.selectedUniversity ? `<p><strong>Selected University:</strong> ${data.selectedUniversity}</p>` : ""}
        ${data.flightTicketFileName ? `<p><strong>Flight Ticket File:</strong> ${data.flightTicketFileName}</p>` : ""}
      `;
      break;
  }

  html += `
      </div>
      <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
        This email was sent from the QStudy website form submission system.
      </p>
    </div>
  `;

  return html;
};

export async function POST(request: NextRequest): Promise<NextResponse<FormSubmissionResponse>> {
  console.log("=== FORM SUBMISSION API CALLED ===");
  console.log("Timestamp:", new Date().toISOString());
  
  try {
    const body: FormSubmissionData = await request.json();
    // Get name based on form type (visa uses fullName, others use name)
    const submitterName = body.formType === "check-visa" 
      ? (body as VisaFormData).fullName 
      : (body as Exclude<FormSubmissionData, VisaFormData>).name;
    console.log("Form data received:", {
      formType: body.formType,
      name: submitterName,
      email: body.email,
    });

    // Validate required fields based on form type
    if (!body.formType) {
      return NextResponse.json(
        { success: false, message: "Form type is required" },
        { status: 400 }
      );
    }

    // Basic validation for all forms
    // Visa form uses fullName, others use name
    const hasName = body.formType === "check-visa" 
      ? !!(body as VisaFormData).fullName 
      : !!(body as Exclude<FormSubmissionData, VisaFormData>).name;
    
    if (!body.email || !hasName) {
      return NextResponse.json(
        { success: false, message: "Name and email are required" },
        { status: 400 }
      );
    }

    // Check if email password is configured
    const emailPassword = process.env.EMAIL_PASSWORD;
    if (!emailPassword) {
      console.error("EMAIL_PASSWORD environment variable is not set");
      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured. Please contact the administrator.",
        },
        { status: 500 }
      );
    }

    // Create email transporter
    console.log("=== CREATING EMAIL TRANSPORTER ===");
    let transporter;
    try {
      transporter = createTransporter();
      console.log("Transporter created successfully");
    } catch (error: any) {
      console.error("=== ERROR CREATING TRANSPORTER ===");
      console.error("Error:", error);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      return NextResponse.json(
        {
          success: false,
          message: error.message || "Email service configuration error. Please contact the administrator.",
        },
        { status: 500 }
      );
    }

    // Format email content
    const htmlContent = formatFormDataToHTML(body);
    const subject = `New ${body.formType.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} Form Submission - ${submitterName}`;

    // Send email
    const emailUser = process.env.EMAIL_USER || "info@qstudyworld.com";
    const fromName = process.env.MAIL_FROM_NAME || "QStudy World";
    
    console.log("=== EMAIL CONFIGURATION ===");
    console.log("From:", emailUser);
    console.log("To:", emailUser);
    console.log("Subject:", subject);
    console.log("SMTP Host:", process.env.SMTP_HOST);
    console.log("SMTP Port:", process.env.SMTP_PORT);
    console.log("SMTP Secure:", process.env.SMTP_SECURE);
    console.log("SMTP Encryption:", process.env.SMTP_ENCRYPTION);
    console.log("===========================");
    
    try {
      console.log("=== ATTEMPTING TO SEND EMAIL ===");
      console.log("SMTP Configuration:");
      console.log("- Host:", process.env.SMTP_HOST);
      console.log("- Port:", process.env.SMTP_PORT);
      console.log("- Secure:", process.env.SMTP_SECURE);
      console.log("- User:", emailUser);
      console.log("- From:", `"${fromName}" <${emailUser}>`);
      console.log("- To:", emailUser);
      console.log("- Subject:", subject);
      
      const emailResult = await transporter.sendMail({
        from: `"${fromName}" <${emailUser}>`,
        to: emailUser, // Send to the same email address
        subject: subject,
        html: htmlContent,
      });

      console.log("=== EMAIL SEND RESULT ===");
      console.log("Status: SUCCESS");
      console.log("Message ID:", emailResult.messageId);
      console.log("Response:", emailResult.response);
      console.log("Accepted:", JSON.stringify(emailResult.accepted));
      console.log("Rejected:", JSON.stringify(emailResult.rejected));
      console.log("Pending:", JSON.stringify(emailResult.pending));
      console.log("Full result:", JSON.stringify(emailResult, null, 2));
      console.log("=========================");

      // Verify email was actually accepted
      if (emailResult.accepted && emailResult.accepted.length > 0) {
        console.log("✅ Email accepted by SMTP server!");
        return NextResponse.json({
          success: true,
          message: "Form submitted successfully. We will get back to you within 24 hours.",
        });
      } else {
        console.error("❌ Email was NOT accepted by server!");
        console.error("Accepted array:", emailResult.accepted);
        console.error("Rejected array:", emailResult.rejected);
        return NextResponse.json({
          success: false,
          message: "Email server did not accept the email. Please check SMTP configuration.",
        }, { status: 500 });
      }
    } catch (emailError: any) {
      console.error("=== EMAIL SEND ERROR ===");
      console.error("Error code:", emailError.code);
      console.error("Error message:", emailError.message);
      console.error("Full error:", JSON.stringify(emailError, null, 2));
      
      // Provide more specific error messages
      let errorMessage = "Failed to send email. Please try again later.";
      if (emailError.code === "EAUTH") {
        errorMessage = "Email authentication failed. Please check email credentials in .env.local file.";
      } else if (emailError.code === "ECONNECTION" || emailError.code === "ENOTFOUND") {
        errorMessage = "Could not connect to email server. Please check SMTP_HOST in .env.local file.";
      } else if (emailError.message) {
        errorMessage = `Email error: ${emailError.message}`;
      }

      return NextResponse.json(
        {
          success: false,
          message: errorMessage,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error processing form submission:", error);
    
    let errorMessage = "Failed to submit form. Please try again later.";
    if (error instanceof SyntaxError) {
      errorMessage = "Invalid form data. Please check all fields and try again.";
    } else if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

