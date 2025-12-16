/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Form submission types
 */
export type FormType = "apply-now" | "check-eligibility" | "check-visa" | "accommodation" | "transportation";

export interface ApplyNowFormData {
  formType: "apply-now";
  name: string;
  email: string;
  phone: string;
  highestQualification: string;
  programLookingFor: string;
  universityType: string;
  selectedUniversity: string;
  typeOfQualification: string;
}

export interface EligibilityFormData {
  formType: "check-eligibility";
  name: string;
  email: string;
  gender: string;
  nationality: string;
  programLookingFor: string;
  highestQualification: string;
  typeOfQualification: string;
  universityType: string;
  selectedUniversity: string;
}

export interface VisaFormData {
  formType: "check-visa";
  fullName: string;
  email: string;
  dob: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  course?: string;
  institution?: string;
  qualification?: string;
  englishLevel?: string;
  funding?: string;
}

export interface AccommodationFormData {
  formType: "accommodation";
  name: string;
  email: string;
  address?: string;
  guardianDetails?: string;
  accommodationType: string;
  preferredAccommodation: string;
  startDate: string;
  endDate: string;
  universityType?: string;
  selectedUniversity?: string;
}

export interface TransportationFormData {
  formType: "transportation";
  name: string;
  email: string;
  dateOfArrival: string;
  contactNumber: string;
  flightDetail: string;
  flightNumber: string;
  numberOfLuggage: string;
  numberOfPerson: string;
  needsAirportPickup: boolean;
  universityType?: string;
  selectedUniversity?: string;
  flightTicketFileName?: string;
}

export type FormSubmissionData =
  | ApplyNowFormData
  | EligibilityFormData
  | VisaFormData
  | AccommodationFormData
  | TransportationFormData;

export interface FormSubmissionResponse {
  success: boolean;
  message: string;
}