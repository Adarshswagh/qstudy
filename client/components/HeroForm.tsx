import { forwardRef, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import type { CountryCode } from "libphonenumber-js";
import { validatePhoneNumberLength } from "libphonenumber-js";
import { Metadata } from "libphonenumber-js/core";
import enLabels from "react-phone-number-input/locale/en.json";
import metadata from "libphonenumber-js/metadata.min.json";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import "react-phone-number-input/style.css";

type PhoneLengthIssue = "INVALID_COUNTRY" | "NOT_A_NUMBER" | "TOO_SHORT" | "TOO_LONG" | "INVALID_LENGTH";

const countryLabels = enLabels as Record<string, string>;
const lengthHintCache = new Map<string, string | undefined>();

const getCountryDisplayName = (country?: CountryCode) => {
  if (!country) {
    return "the selected country";
  }
  return countryLabels[country] ?? country;
};

const getCountryLengthHint = (country?: CountryCode) => {
  if (!country) return undefined;
  if (lengthHintCache.has(country)) {
    return lengthHintCache.get(country);
  }

  try {
    const meta = new Metadata(metadata);
    meta.selectNumberingPlan(country);
    const possibleLengths = meta.numberingPlan?.possibleLengths?.() ?? [];
    const numericLengths = Array.from(new Set(possibleLengths)).filter(
      (value): value is number => typeof value === "number",
    );
    const hint =
      numericLengths.length === 0
        ? undefined
        : numericLengths.length === 1
          ? `${numericLengths[0]} digits`
          : `${Math.min(...numericLengths)}-${Math.max(...numericLengths)} digits`;

    lengthHintCache.set(country, hint);
    return hint;
  } catch {
    lengthHintCache.set(country, undefined);
    return undefined;
  }
};

export const getLengthIssueMessage = (
  issue: PhoneLengthIssue,
  country?: CountryCode,
  fieldLabel = "contact number",
) => {
  const countryName = getCountryDisplayName(country);
  const lengthHint = getCountryLengthHint(country);

  switch (issue) {
    case "NOT_A_NUMBER":
      return `Please enter digits only for the ${fieldLabel}.`;
    case "INVALID_COUNTRY":
      return "Please select a country before entering the number.";
    case "TOO_SHORT":
      return lengthHint
        ? `${countryName} numbers must be at least ${lengthHint}.`
        : `The ${fieldLabel} is too short for ${countryName}.`;
    case "TOO_LONG":
      return lengthHint
        ? `${countryName} numbers can't exceed ${lengthHint}.`
        : `The ${fieldLabel} is too long for ${countryName}.`;
    case "INVALID_LENGTH":
      return lengthHint
        ? `${countryName} numbers must be ${lengthHint}.`
        : `Please enter a valid ${countryName} ${fieldLabel}.`;
    default:
      return `Please enter a valid ${countryName} ${fieldLabel}.`;
  }
};

export const validatePhoneField = (
  value: string,
  country?: CountryCode,
  label = "contact number",
): { isValid: boolean; message?: string } => {
  if (!value) {
    return { isValid: false, message: `Please provide a ${label}.` };
  }

  const digitsOnly = value.replace(/[^\d]/g, "");
  if (!digitsOnly) {
    return { isValid: false, message: `Please enter digits only for the ${label}.` };
  }

  // Custom rule: India must have exactly 10 digits (ignoring spaces/formatting)
  if (country === "IN") {
    // Strip leading country code "91" if present, then validate the national part.
    const nationalPart = digitsOnly.replace(/^91/, "");
    if (nationalPart.length !== 10) {
      return {
        isValid: false,
        message: "Indian phone numbers must be exactly 10 digits (excluding country code).",
      };
    }
  }

  const lengthIssue = validatePhoneNumberLength(value, country);
  if (lengthIssue) {
    return { isValid: false, message: getLengthIssueMessage(lengthIssue as PhoneLengthIssue, country, label) };
  }

  if (!isValidPhoneNumber(value)) {
    const countryName = getCountryDisplayName(country);
    return {
      isValid: false,
      message: `Please enter a valid ${countryName} ${label}.`,
    };
  }

  return { isValid: true };
};

type CountrySelectOption = {
  value?: string;
  label: string;
  divider?: boolean;
};

interface CountrySelectProps {
  name?: string;
  value?: string;
  onChange: (value?: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  options: CountrySelectOption[];
  iconComponent: React.ComponentType<{
    country?: string;
    label?: string;
    aspectRatio?: number;
    className?: string;
    "aria-hidden"?: boolean;
  }>;
  disabled?: boolean;
  readOnly?: boolean;
  tabIndex?: number | string;
  className?: string;
}

export const SearchableCountrySelect = forwardRef<HTMLButtonElement, CountrySelectProps>(
  (
    {
      value,
      onChange,
      onBlur,
      onFocus,
      options,
      iconComponent: IconComponent,
      disabled,
      readOnly,
      name,
      tabIndex,
      className,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const selectableOptions = useMemo(() => options.filter((option) => !option.divider), [options]);
    const selectedOption =
      selectableOptions.find((option) => option.value === value) ?? selectableOptions.find((option) => option.value === undefined);
    const label = selectedOption?.label ?? "Select country";

    const handleSelect = (selectedValue?: string) => {
      onChange(selectedValue);
      setOpen(false);
    };

    return (
      <div className={cn("PhoneInputCountry relative", className)}>
        {name ? <input type="hidden" name={name} value={value ?? ""} /> : null}
        <Popover
          open={open}
          onOpenChange={(nextOpen) => {
            setOpen(nextOpen);
            if (nextOpen) {
              onFocus?.();
            } else {
              onBlur?.();
            }
          }}
        >
          <PopoverTrigger asChild>
            <button
              ref={ref}
              type="button"
              className={cn(
                "PhoneInputCountrySelect flex w-full items-center justify-between rounded-l-xl border border-transparent bg-transparent px-3 py-2 text-left text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                disabled || readOnly ? "cursor-not-allowed opacity-60" : "cursor-pointer",
              )}
              disabled={disabled || readOnly}
              onFocus={onFocus}
              onBlur={onBlur}
              tabIndex={
                typeof tabIndex === "number"
                  ? tabIndex
                  : typeof tabIndex === "string"
                    ? Number(tabIndex)
                    : undefined
              }
            >
              <span className="flex items-center gap-2">
                {IconComponent ? (
                  <IconComponent
                    aria-hidden
                    country={value}
                    label={label}
                    className="h-4 w-6 shrink-0 rounded-sm border border-primary/10 bg-secondary"
                  />
                ) : null}
                <span className="truncate">{label}</span>
              </span>
              <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search country..." />
              <CommandEmpty>No countries found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {selectableOptions.map((option) => (
                    <CommandItem
                      key={option.value ?? "INTL"}
                      value={option.label}
                      onSelect={() => handleSelect(option.value)}
                      className="flex items-center gap-2"
                    >
                      {IconComponent ? (
                        <IconComponent
                          aria-hidden
                          country={option.value}
                          label={option.label}
                          className="h-4 w-6 shrink-0 rounded-sm border border-primary/10 bg-secondary"
                        />
                      ) : null}
                      <span className="flex-1 truncate text-sm">{option.label}</span>
                      <Check
                        className={cn(
                          "h-4 w-4 text-primary",
                          option.value === value ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);

SearchableCountrySelect.displayName = "SearchableCountrySelect";

interface HeroFormProps {
  universityCategories: {
    government: Array<{ name: string; logo: string }>;
    private: Array<{ name: string; logo: string }>;
    international: Array<{ name: string; logo: string }>;
  };
}

// API helper function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// API call functions
const submitUniversityAdmission = async (data: {
  fullName: string;
  emailAddress: string;
  contactNumber: string;
  preferredProgram: string;
  highestAcademicQualification: string;
  typeOfQualification: string;
  universityCategory: string;
  preferredUniversity: string;
}) => {
  const response = await fetch("https://cms-be-a5eg.onrender.com/api/university-admissions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  const responseData = await response.json();
  
  if (!response.ok) {
    const errorMessage = responseData?.message || responseData?.error || response.statusText;
    console.error("API Error:", responseData);
    throw new Error(errorMessage);
  }
  
  console.log("API Success Response:", responseData);
  return responseData;
};

const submitCheckEligibility = async (data: {
  fullName: string;
  emailAddress: string;
  gender: string;
  nationality: string;
  preferredProgram: string;
  highestAcademicQualification: string;
  typeOfQualification: string;
  universityCategory: string;
  preferredUniversity: string;
}) => {
  const response = await fetch("https://cms-be-a5eg.onrender.com/api/check-eligibility", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  const responseData = await response.json();
  
  if (!response.ok) {
    const errorMessage = responseData?.message || responseData?.error || response.statusText;
    console.error("API Error:", responseData);
    throw new Error(errorMessage);
  }
  
  console.log("API Success Response:", responseData);
  return responseData;
};

const submitCheckVisa = async (data: {
  fullName: string;
  emailAddress: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportExpiryDate: string;
}) => {
  const response = await fetch("https://cms-be-a5eg.onrender.com/api/check-visa", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  const responseData = await response.json();
  
  if (!response.ok) {
    const errorMessage = responseData?.message || responseData?.error || response.statusText;
    console.error("API Error:", responseData);
    throw new Error(errorMessage);
  }
  
  console.log("API Success Response:", responseData);
  return responseData;
};

const submitAccommodation = async (data: {
  fullName: string;
  emailAddress: string;
  universityCategory: string;
  universityName: string;
  typeOfAccommodation: string;
  preferredAccommodation: string;
  startDate: string;
  endDate: string;
}) => {
  const response = await fetch("https://cms-be-a5eg.onrender.com/api/accommodation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  const responseData = await response.json();
  
  if (!response.ok) {
    const errorMessage = responseData?.message || responseData?.error || response.statusText;
    console.error("API Error:", responseData);
    throw new Error(errorMessage);
  }
  
  console.log("API Success Response:", responseData);
  return responseData;
};

const submitTransportation = async (data: {
  fullName: string;
  emailAddress: string;
  arrivalDate: string;
  contactNumber: string;
  universityCategory: string;
  universityName: string;
  flightDetails: string;
  flightNumber: string;
  numberOfLuggage: number;
  numberOfPassengers: number;
  flightTicketUpload: string;
  airportPickupRequirement: string;
}) => {
  const response = await fetch("https://cms-be-a5eg.onrender.com/api/transportation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  const responseData = await response.json();
  
  if (!response.ok) {
    const errorMessage = responseData?.message || responseData?.error || response.statusText;
    console.error("API Error:", responseData);
    throw new Error(errorMessage);
  }
  
  console.log("API Success Response:", responseData);
  return responseData;
};

export default function HeroForm({ universityCategories }: HeroFormProps) {
  const [activeTab, setActiveTab] = useState("apply-now");
  const [phoneCountry, setPhoneCountry] = useState<CountryCode | undefined>("MY");
  const [transportationCountry, setTransportationCountry] = useState<CountryCode | undefined>("MY");
  const [phoneError, setPhoneError] = useState("");
  const [transportationPhoneError, setTransportationPhoneError] = useState("");
  
  // Loading states for each form
  const [isSubmittingApplyNow, setIsSubmittingApplyNow] = useState(false);
  const [isSubmittingEligibility, setIsSubmittingEligibility] = useState(false);
  const [isSubmittingVisa, setIsSubmittingVisa] = useState(false);
  const [isSubmittingAccommodation, setIsSubmittingAccommodation] = useState(false);
  const [isSubmittingTransportation, setIsSubmittingTransportation] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    highestQualification: "",
    programLookingFor: "",
    universityType: "",
    selectedUniversity: "",
    typeOfQualification: "",
  });

  // Separate state for eligibility form
  const [eligibilityFormData, setEligibilityFormData] = useState({
    name: "",
    email: "",
    gender: "",
    nationality: "",
    programLookingFor: "",
    highestQualification: "",
    typeOfQualification: "",
    universityType: "",
    selectedUniversity: "",
  });

  // Separate state for visa check form
  const [visaFormData, setVisaFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    nationality: "",
    passportNumber: "",
    passportExpiry: "",
    course: "",
    institution: "",
    qualification: "",
    englishLevel: "",
    funding: "",
  });

  // Separate state for accommodation form
  const [accommodationFormData, setAccommodationFormData] = useState({
    name: "",
    email: "",
    address: "",
    guardianDetails: "",
    accommodationType: "",
    preferredAccommodation: "",
    startDate: "",
    endDate: "",
  });

  // Separate state for transportation form
  const [transportationFormData, setTransportationFormData] = useState({
    name: "",
    email: "",
    dateOfArrival: "",
    contactNumber: "",
    flightDetail: "",
    flightNumber: "",
    numberOfLuggage: "",
    numberOfPerson: "",
    needsAirportPickup: false,
  });
  
  // State for flight ticket file
  const [flightTicketFile, setFlightTicketFile] = useState<File | null>(null);

  // Consent states for all forms
  const [consentApplyNow, setConsentApplyNow] = useState(false);
  const [consentEligibility, setConsentEligibility] = useState(false);
  const [consentVisa, setConsentVisa] = useState(false);
  const [consentAccommodation, setConsentAccommodation] = useState(false);
  const [consentTransportation, setConsentTransportation] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      // Reset selectedUniversity when universityType changes
      ...(name === "universityType" && { selectedUniversity: "" }),
    });
  };

  const handleEligibilityFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEligibilityFormData({
      ...eligibilityFormData,
      [name]: value,
      // Reset selectedUniversity when universityType changes
      ...(name === "universityType" && { selectedUniversity: "" }),
    });
  };

  const handleVisaFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setVisaFormData({
      ...visaFormData,
      [name]: value,
    });
  };

  const handleAccommodationFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAccommodationFormData({
      ...accommodationFormData,
      [name]: value,
    });
  };

  const handleTransportationFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTransportationFormData({
      ...transportationFormData,
      [name]: value,
    });
  };

  const handleTransportationCheckboxChange = (checked: boolean) => {
    setTransportationFormData({
      ...transportationFormData,
      needsAirportPickup: checked,
    });
  };

  const handleFlightTicketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFlightTicketFile(file);
  };

  const handlePhoneInputChange = (value?: string) => {
    const nextValue = value ?? "";
    setFormData((prev) => ({
      ...prev,
      phone: nextValue,
    }));
    if (phoneError) {
      validateApplyPhone(nextValue, phoneCountry);
    }
  };

  const handleTransportationPhoneInputChange = (value?: string) => {
    const nextValue = value ?? "";
    setTransportationFormData((prev) => ({
      ...prev,
      contactNumber: nextValue,
    }));
    if (transportationPhoneError) {
      validateTransportationPhone(nextValue, transportationCountry);
    }
  };

  const validateApplyPhone = (
    value = formData.phone,
    country: CountryCode | undefined = phoneCountry,
  ) => {
    const validation = validatePhoneField(value, country, "phone number");
    if (!validation.isValid) {
      const message = validation.message ?? "Please enter a valid phone number";
      setPhoneError(message);
      return { isValid: false, message };
    }
    setPhoneError("");
    return { isValid: true, message: "" };
  };

  const validateTransportationPhone = (
    value = transportationFormData.contactNumber,
    country: CountryCode | undefined = transportationCountry,
  ) => {
    const validation = validatePhoneField(value, country, "contact number");
    if (!validation.isValid) {
      const message = validation.message ?? "Please enter a valid contact number";
      setTransportationPhoneError(message);
      return { isValid: false, message };
    }
    setTransportationPhoneError("");
    return { isValid: true, message: "" };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate consent
    if (!consentApplyNow) {
      toast.error("Please agree to the consent terms");
      return;
    }
    
    const phoneValidation = validateApplyPhone();
    if (!phoneValidation.isValid) {
      toast.error(phoneValidation.message);
      return;
    }
    
    setIsSubmittingApplyNow(true);
    
    try {
      // Map form data to API format
      const apiData = {
        fullName: formData.name,
        emailAddress: formData.email,
        contactNumber: formData.phone,
        preferredProgram: formData.programLookingFor,
        highestAcademicQualification: formData.highestQualification,
        typeOfQualification: formData.typeOfQualification,
        universityCategory: formData.universityType,
        preferredUniversity: formData.selectedUniversity,
      };
      
      console.log("Submitting Apply Now form with data:", apiData);
      const response = await submitUniversityAdmission(apiData);
      console.log("Form submitted successfully. Response:", response);
      
      const name = formData.name || "Future Scholar";
      toast.success(
        `Thank you, ${name}! Our counsellors will connect with you within 24 hours.`,
      );
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        highestQualification: "",
        programLookingFor: "",
        universityType: "",
        selectedUniversity: "",
        typeOfQualification: "",
      });
      setPhoneCountry("MY");
      setPhoneError("");
      setConsentApplyNow(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to submit form. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmittingApplyNow(false);
    }
  };

  const handleEligibilityFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate consent
    if (!consentEligibility) {
      toast.error("Please agree to the consent terms");
      return;
    }
    
    setIsSubmittingEligibility(true);
    
    try {
      // Map form data to API format
      const apiData = {
        fullName: eligibilityFormData.name,
        emailAddress: eligibilityFormData.email,
        gender: eligibilityFormData.gender,
        nationality: eligibilityFormData.nationality,
        preferredProgram: eligibilityFormData.programLookingFor,
        highestAcademicQualification: eligibilityFormData.highestQualification,
        typeOfQualification: eligibilityFormData.typeOfQualification,
        universityCategory: eligibilityFormData.universityType,
        preferredUniversity: eligibilityFormData.selectedUniversity,
      };
      
      console.log("Submitting Eligibility form with data:", apiData);
      const response = await submitCheckEligibility(apiData);
      console.log("Form submitted successfully. Response:", response);
      
      const name = eligibilityFormData.name || "Future Scholar";
      toast.success(
        `Thank you, ${name}! We will check your eligibility and get back to you within 24 hours.`,
      );
      
      // Reset eligibility form
      setEligibilityFormData({
        name: "",
        email: "",
        gender: "",
        nationality: "",
        programLookingFor: "",
        highestQualification: "",
        typeOfQualification: "",
        universityType: "",
        selectedUniversity: "",
      });
      setConsentEligibility(false);
    } catch (error) {
      console.error("Error submitting eligibility form:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to submit form. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmittingEligibility(false);
    }
  };

  const handleVisaFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate consent
    if (!consentVisa) {
      toast.error("Please agree to the consent terms");
      return;
    }
    
    setIsSubmittingVisa(true);
    
    try {
      // Map form data to API format
      const apiData = {
        fullName: visaFormData.fullName,
        emailAddress: visaFormData.email,
        dateOfBirth: visaFormData.dob,
        nationality: visaFormData.nationality,
        passportNumber: visaFormData.passportNumber,
        passportExpiryDate: visaFormData.passportExpiry,
      };
      
      console.log("Submitting Visa form with data:", apiData);
      const response = await submitCheckVisa(apiData);
      console.log("Form submitted successfully. Response:", response);
      
      const name = visaFormData.fullName || "Future Scholar";
      toast.success(
        `Thank you, ${name}! We will check your visa status and get back to you within 24 hours.`,
      );
      
      // Reset visa form
      setVisaFormData({
        fullName: "",
        email: "",
        dob: "",
        nationality: "",
        passportNumber: "",
        passportExpiry: "",
        course: "",
        institution: "",
        qualification: "",
        englishLevel: "",
        funding: "",
      });
      setConsentVisa(false);
    } catch (error) {
      console.error("Error submitting visa form:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to submit form. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmittingVisa(false);
    }
  };

  const handleAccommodationFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate consent
    if (!consentAccommodation) {
      toast.error("Please agree to the consent terms");
      return;
    }
    
    setIsSubmittingAccommodation(true);
    
    try {
      // Map form data to API format
      const apiData = {
        fullName: accommodationFormData.name,
        emailAddress: accommodationFormData.email,
        universityCategory: eligibilityFormData.universityType,
        universityName: eligibilityFormData.selectedUniversity,
        typeOfAccommodation: accommodationFormData.accommodationType,
        preferredAccommodation: accommodationFormData.preferredAccommodation,
        startDate: accommodationFormData.startDate,
        endDate: accommodationFormData.endDate,
      };
      
      console.log("Submitting Accommodation form with data:", apiData);
      const response = await submitAccommodation(apiData);
      console.log("Form submitted successfully. Response:", response);
      
      const name = accommodationFormData.name || "Future Scholar";
      toast.success(
        `Thank you, ${name}! We will assist you with accommodation and get back to you within 24 hours.`,
      );
      
      // Reset accommodation form
      setAccommodationFormData({
        name: "",
        email: "",
        address: "",
        guardianDetails: "",
        accommodationType: "",
        preferredAccommodation: "",
        startDate: "",
        endDate: "",
      });
      setConsentAccommodation(false);
    } catch (error) {
      console.error("Error submitting accommodation form:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to submit form. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmittingAccommodation(false);
    }
  };

  const handleTransportationFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate consent
    if (!consentTransportation) {
      toast.error("Please agree to the consent terms");
      return;
    }
    
    const phoneValidation = validateTransportationPhone();
    if (!phoneValidation.isValid) {
      toast.error(phoneValidation.message);
      return;
    }
    
    setIsSubmittingTransportation(true);
    
    try {
      // Convert flight ticket file to base64 if available
      let flightTicketUpload = "";
      if (flightTicketFile) {
        try {
          flightTicketUpload = await fileToBase64(flightTicketFile);
          console.log("Flight ticket converted to base64, length:", flightTicketUpload.length);
        } catch (error) {
          console.error("Error converting file to base64:", error);
          toast.error("Failed to process flight ticket file. Please try again.");
          setIsSubmittingTransportation(false);
          return;
        }
      }
      
      // Map form data to API format
      const apiData = {
        fullName: transportationFormData.name,
        emailAddress: transportationFormData.email,
        arrivalDate: transportationFormData.dateOfArrival,
        contactNumber: transportationFormData.contactNumber,
        universityCategory: eligibilityFormData.universityType,
        universityName: eligibilityFormData.selectedUniversity,
        flightDetails: transportationFormData.flightDetail,
        flightNumber: transportationFormData.flightNumber,
        numberOfLuggage: parseInt(transportationFormData.numberOfLuggage) || 0,
        numberOfPassengers: parseInt(transportationFormData.numberOfPerson) || 1,
        flightTicketUpload: flightTicketUpload,
        airportPickupRequirement: transportationFormData.needsAirportPickup ? "Yes" : "No",
      };
      
      console.log("Submitting Transportation form with data:", { ...apiData, flightTicketUpload: flightTicketUpload ? `[base64 string, length: ${flightTicketUpload.length}]` : "" });
      const response = await submitTransportation(apiData);
      console.log("Form submitted successfully. Response:", response);
      
      const name = transportationFormData.name || "Future Scholar";
      toast.success(
        `Thank you, ${name}! We will assist you with transportation and get back to you within 24 hours.`,
      );
      
      // Reset transportation form
      setTransportationFormData({
        name: "",
        email: "",
        dateOfArrival: "",
        contactNumber: "",
        flightDetail: "",
        flightNumber: "",
        numberOfLuggage: "",
        numberOfPerson: "",
        needsAirportPickup: false,
      });
      setFlightTicketFile(null);
      setTransportationCountry("MY");
      setTransportationPhoneError("");
      setConsentTransportation(false);
    } catch (error) {
      console.error("Error submitting transportation form:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to submit form. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmittingTransportation(false);
    }
  };

  // Get universities based on selected university type
  const getAvailableUniversities = () => {
    if (!formData.universityType) return [];
    
    const categoryMap: Record<string, keyof typeof universityCategories> = {
      "Government University": "government",
      "Private University": "private",
      "Foreign University": "international",
    };
    
    const categoryKey = categoryMap[formData.universityType];
    return categoryKey ? universityCategories[categoryKey] : [];
  };

  const availableUniversities = getAvailableUniversities();

  // Get universities for eligibility form based on selected university type
  const getEligibilityAvailableUniversities = () => {
    if (!eligibilityFormData.universityType) return [];
    
    const categoryMap: Record<string, keyof typeof universityCategories> = {
      "Government University": "government",
      "Private University": "private",
      "Foreign University": "international",
    };
    
    const categoryKey = categoryMap[eligibilityFormData.universityType];
    return categoryKey ? universityCategories[categoryKey] : [];
  };

  const eligibilityAvailableUniversities = getEligibilityAvailableUniversities();

  // Custom styling for phone input to match your design
  const phoneInputStyle = {
    width: '100%',
    '--PhoneInput-color--focus': 'hsl(var(--primary))',
    '--PhoneInputCountryFlag-borderColor': 'transparent',
    '--PhoneInputCountryFlag-height': '1.5rem',
    '--PhoneInputCountrySelectArrow-color': 'hsl(var(--primary))',
  } as React.CSSProperties;

  return (
    <div className="relative w-full max-w-full overflow-hidden">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-4 sm:mb-6 text-center">Choose your option</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-4 sm:mb-6 gap-1 sm:gap-1 p-1 sm:p-1.5 md:p-2 h-auto min-h-[2.5rem] sm:min-h-[3rem] bg-muted overflow-x-auto">
        <TabsTrigger value="check-eligibility" className={cn("text-[9px] xs:text-[9px] sm:text-[9px] md:text-xs px-1.5 sm:px-2 md:px-3 lg:px-4 py-1.5 sm:py-2 whitespace-nowrap w-full h-full rounded-md !bg-primary !text-primary-foreground data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground data-[state=active]:!border-b-4 data-[state=active]:!border-primary-foreground data-[state=active]:!shadow-lg data-[state=active]:!shadow-primary/50 hover:bg-primary/90 border-b-2 border-b-transparent")}>
            Check My Eligibility
          </TabsTrigger>
          <TabsTrigger value="apply-now" className={cn("text-[9px] xs:text-[9px] sm:text-[9px] md:text-xs px-1.5 sm:px-2 md:px-3 lg:px-4 py-1.5 sm:py-2 whitespace-nowrap w-full h-full rounded-md !bg-muted !text-muted-foreground data-[state=active]:!bg-muted data-[state=active]:!text-foreground data-[state=active]:!border-b-4 data-[state=active]:!border-primary data-[state=active]:!shadow-lg data-[state=active]:!shadow-primary/50 hover:bg-muted/80 border-b-2 border-b-transparent")}>
            Apply Now
          </TabsTrigger>
          <TabsTrigger value="check-visa" className={cn("text-[9px] xs:text-[9px] sm:text-[9px] md:text-xs px-1.5 sm:px-2 md:px-3 lg:px-4 py-1.5 sm:py-2 whitespace-nowrap w-full h-full rounded-md !bg-primary !text-primary-foreground data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground data-[state=active]:!border-b-4 data-[state=active]:!border-primary-foreground data-[state=active]:!shadow-lg data-[state=active]:!shadow-primary/50 hover:bg-primary/90 border-b-2 border-b-transparent")}>
            Check My Visa
          </TabsTrigger>
          <TabsTrigger value="accommodation" className={cn("text-[9px] xs:text-[9px] sm:text-[9px] md:text-xs px-1.5 sm:px-2 md:px-3 lg:px-4 py-1.5 sm:py-2 whitespace-nowrap w-full h-full rounded-md !bg-muted !text-muted-foreground data-[state=active]:!bg-muted data-[state=active]:!text-foreground data-[state=active]:!border-b-4 data-[state=active]:!border-primary data-[state=active]:!shadow-lg data-[state=active]:!shadow-primary/50 hover:bg-muted/80 border-b-2 border-b-transparent")}>
            Accommodation
          </TabsTrigger>
          <TabsTrigger value="transportation" className={cn("text-[9px] xs:text-[9px] sm:text-[9px] md:text-xs px-1.5 sm:px-2 md:px-3 lg:px-4 py-1.5 sm:py-2 whitespace-nowrap w-full h-full rounded-md !bg-primary !text-primary-foreground data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground data-[state=active]:!border-b-4 data-[state=active]:!border-primary-foreground data-[state=active]:!shadow-lg data-[state=active]:!shadow-primary/50 hover:bg-primary/90 border-b-2 border-b-transparent")}>
            Transportation
          </TabsTrigger>
        </TabsList>

        {/* Apply Now Tab */}
        <TabsContent value="apply-now">
          <h3 className="text-base sm:text-lg font-bold text-primary mb-2">Apply Me Now</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-4">
            Fill out the form below and our counsellors will get back to you within 24 hours.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
            
            {/* Name & Email in one line */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-primary mb-1.5 ml-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder=" Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-primary mb-1.5 ml-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            {/* Phone with Country Flag Selector */}
            <div>
              <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-primary mb-1.5 ml-2">
                Phone
              </label>
              <div
                className={cn(
                  "w-full rounded-xl border bg-secondary/40 p-0 shadow-inner shadow-primary/5 focus-within:border-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/30",
                  phoneError ? "border-red-500 focus-within:ring-red-400" : "border-primary/20",
                )}
              >
                <PhoneInput
                  international
                  defaultCountry="MY"
                  country={phoneCountry}
                  value={formData.phone || undefined}
                  onChange={handlePhoneInputChange}
                  onCountryChange={(country) => {
                    const nextCountry = country ?? undefined;
                    setPhoneCountry(nextCountry);
                    if (formData.phone) {
                      validateApplyPhone(formData.phone, nextCountry);
                    }
                  }}
                  onBlur={() => validateApplyPhone()}
                  placeholder="Enter phone number"
                  required
                  limitMaxLength
                  style={phoneInputStyle}
                  countrySelectComponent={SearchableCountrySelect}
                  className="!border-none !bg-transparent [&>input]:!border-none [&>input]:!bg-transparent [&>input]:!text-primary [&>input]:!text-sm [&>input]:p-3 [&>input]:!outline-none [&>input]:!ring-0 [&>input]:placeholder:text-primary/50"
                  numberInputProps={{
                    className: "!bg-transparent !border-none !outline-none !ring-0",
                    inputMode: "numeric",
                  }}
                />
              </div>
              {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
            </div>

            {/* Program Looking For - Next Line */}
            <div>
              <label htmlFor="programLookingFor" className="block text-xs sm:text-sm font-medium text-primary mb-1.5 ml-2">
                Program Looking For
              </label>
              <select
                id="programLookingFor"
                name="programLookingFor"
                value={formData.programLookingFor}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">Select Program</option>
                <option value="Business & Management">Business & Management</option>
                <option value="Engineering & Technology">Engineering & Technology</option>
                <option value="Education & Social Sciences">Education & Social Sciences</option>
                <option value="Science, Health & Environment">Science, Health & Environment</option>
                <option value="Religion & Languages">Religion & Languages</option>
              </select>
            </div>

            {/* Highest Qualification & Type of Qualification in one line */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Highest Qualification */}
              <div>
                <label htmlFor="highestQualification" className="block text-sm font-medium text-primary mb-1.5 ml-2">
                  Highest Qualification
                </label>
                <select
                  id="highestQualification"
                  name="highestQualification"
                  value={formData.highestQualification}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Select Qualification</option>
                  <option value="Grade 1O / O level ">Grade 1O / O level </option>
                  <option value="Grade 12 / A Level">Grade 12 / A Level</option>
                  <option value="Foundation">Foundation</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Degree">Degree</option>
                  <option value="Master">Master</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>

              {/* Type of Qualification */}
              <div>
                <label htmlFor="typeOfQualification" className="block text-sm font-medium text-primary mb-1.5 ml-2">
                  Type of Qualification
                </label>
                <select
                  id="typeOfQualification"
                  name="typeOfQualification"
                  value={formData.typeOfQualification}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Select Qualification Type</option>
                  <option value="CBSE">CBSE</option>
                  <option value="Cambridge University">Cambridge University</option>
                  <option value="ICSE / ISC">ICSE / ISC</option>
                  <option value="IB">IB</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* List of Universities Type & Select University in one line (when university type is selected) */}
            <div className={formData.universityType && availableUniversities.length > 0 ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : ""}>
              {/* List of Universities Type */}
              <div>
                <label htmlFor="universityType" className="block text-sm font-medium text-primary mb-1.5 ml-2">
                  List Of Universities
                </label>
                <select
                  id="universityType"
                  name="universityType"
                  value={formData.universityType}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Select University Type</option>
                  <option value="Government University">Government University</option>
                  <option value="Private University">Private University</option>
                  <option value="Foreign University">Foreign University</option>
                </select>
              </div>

              {/* Selected University (conditional) */}
              {formData.universityType && availableUniversities.length > 0 && (
                <div>
                  <label htmlFor="selectedUniversity" className="block text-sm font-medium text-primary mb-1.5 ml-2">
                    Select University
                  </label>
                  <select
                    id="selectedUniversity"
                    name="selectedUniversity"
                    value={formData.selectedUniversity}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="">Select University</option>
                    {availableUniversities.map((university) => (
                      <option key={university.name} value={university.name}>
                        {university.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Consent Box for Apply Now */}
            <div className="flex items-start gap-2 sm:gap-3 mt-3">
              <Checkbox
                id="consentApplyNow"
                checked={consentApplyNow}
                onCheckedChange={(checked) => setConsentApplyNow(checked === true)}
                required
                className="mt-0.5 sm:mt-1 flex-shrink-0"
              />
              <label
                htmlFor="consentApplyNow"
                className="text-xs sm:text-sm text-primary cursor-pointer leading-relaxed flex-1"
              >
                I confirm that the information provided is accurate and I consent to be contacted by the university.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmittingApplyNow}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:border hover:bg-white hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {isSubmittingApplyNow ? "Submitting..." : "Submit"}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </form>
        </TabsContent>

        {/* Check Eligibility Tab */}
        <TabsContent value="check-eligibility">
          <h3 className="text-base sm:text-lg font-bold text-primary mb-2">Check My Eligibility</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-4">
            Fill out the form below to check your eligibility for various programs.
          </p>
          <form onSubmit={handleEligibilityFormSubmit} className="flex flex-col gap-3 sm:gap-4">
            
            {/* Name & Email in one line */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label htmlFor="eligibility-name" className="block text-sm font-medium text-primary mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  id="eligibility-name"
                  name="name"
                  placeholder="Full Name"
                  value={eligibilityFormData.name}
                  onChange={handleEligibilityFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="eligibility-email" className="block text-sm font-medium text-primary mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  id="eligibility-email"
                  name="email"
                  placeholder="Email"
                  value={eligibilityFormData.email}
                  onChange={handleEligibilityFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            {/* Gender & Nationality in one line */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Gender */}
              <div>
                <label htmlFor="eligibility-gender" className="block text-sm font-medium text-primary mb-1.5">
                  Gender
                </label>
                <select
                  id="eligibility-gender"
                  name="gender"
                  value={eligibilityFormData.gender}
                  onChange={handleEligibilityFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Nationality */}
              <div>
                <label htmlFor="eligibility-nationality" className="block text-sm font-medium text-primary mb-1.5">
                  Nationality
                </label>
                <input
                  type="text"
                  id="eligibility-nationality"
                  name="nationality"
                  placeholder="Nationality"
                  value={eligibilityFormData.nationality}
                  onChange={handleEligibilityFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            {/* Program Looking For */}
            <div>
              <label htmlFor="eligibility-programLookingFor" className="block text-sm font-medium text-primary mb-1.5">
                Program Looking For
              </label>
              <select
                id="eligibility-programLookingFor"
                name="programLookingFor"
                value={eligibilityFormData.programLookingFor}
                onChange={handleEligibilityFormChange}
                required
                className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">Select Program</option>
                <option value="Business & Management">Business & Management</option>
                <option value="Engineering & Technology">Engineering & Technology</option>
                <option value="Education & Social Sciences">Education & Social Sciences</option>
                <option value="Science, Health & Environment">Science, Health & Environment</option>
                <option value="Religion & Languages">Religion & Languages</option>
              </select>
            </div>

            {/* Highest Qualification & Type of Qualification in one line */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Highest Qualification */}
              <div>
                <label htmlFor="eligibility-highestQualification" className="block text-sm font-medium text-primary mb-1.5">
                  Highest Qualification
                </label>
                <select
                  id="eligibility-highestQualification"
                  name="highestQualification"
                  value={eligibilityFormData.highestQualification}
                  onChange={handleEligibilityFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Select Qualification</option>
                  <option value="Grade 1O / O level ">Grade 1O / O level </option>
                  <option value="Grade 12 / A Level">Grade 12 / A Level</option>
                  <option value="Foundation">Foundation</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Degree">Degree</option>
                  <option value="Master">Master</option>
                </select>
              </div>

              {/* Type of Qualification */}
              <div>
                <label htmlFor="eligibility-typeOfQualification" className="block text-sm font-medium text-primary mb-1.5">
                  Type of Qualification
                </label>
                <select
                  id="eligibility-typeOfQualification"
                  name="typeOfQualification"
                  value={eligibilityFormData.typeOfQualification}
                  onChange={handleEligibilityFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Select Qualification Type</option>
                  <option value="CBSE">CBSE</option>
                  <option value="Cambridge University">Cambridge University</option>
                  <option value="ICSE / ISC">ICSE / ISC</option>
                  <option value="IB">IB</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* List of Universities Type & Select University in one line (when university type is selected) */}
            <div className={eligibilityFormData.universityType && eligibilityAvailableUniversities.length > 0 ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : ""}>
              {/* List of Universities Type */}
              <div>
                <label htmlFor="eligibility-universityType" className="block text-sm font-medium text-primary mb-1.5">
                  List Of Universities
                </label>
                <select
                  id="eligibility-universityType"
                  name="universityType"
                  value={eligibilityFormData.universityType}
                  onChange={handleEligibilityFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Select University Type</option>
                  <option value="Government University">Government University</option>
                  <option value="Private University">Private University</option>
                  <option value="Foreign University">Foreign University</option>
                </select>
              </div>

              {/* Selected University (conditional) */}
              {eligibilityFormData.universityType && eligibilityAvailableUniversities.length > 0 && (
                <div>
                  <label htmlFor="eligibility-selectedUniversity" className="block text-sm font-medium text-primary mb-1.5">
                    Select University
                  </label>
                  <select
                    id="eligibility-selectedUniversity"
                    name="selectedUniversity"
                    value={eligibilityFormData.selectedUniversity}
                    onChange={handleEligibilityFormChange}
                    required
                    className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="">Select University</option>
                    {eligibilityAvailableUniversities.map((university) => (
                      <option key={university.name} value={university.name}>
                        {university.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Consent Box for Eligibility */}
            <div className="flex items-start gap-2 sm:gap-3 mt-3">
              <Checkbox
                id="consentEligibility"
                checked={consentEligibility}
                onCheckedChange={(checked) => setConsentEligibility(checked === true)}
                required
                className="mt-0.5 sm:mt-1 flex-shrink-0"
              />
              <label
                htmlFor="consentEligibility"
                className="text-xs sm:text-sm text-primary cursor-pointer leading-relaxed flex-1"
              >
                I confirm that the information provided is accurate and I consent to be contacted for eligibility assessment.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmittingEligibility}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:border hover:bg-white hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {isSubmittingEligibility ? "Checking..." : "Check Eligibility"}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </form>
        </TabsContent>

        {/* Check Visa Tab */}
        <TabsContent value="check-visa">
          <h3 className="text-base sm:text-lg font-bold text-primary mb-2">Check my visa</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-4">
            Fill out the form below and we will check your visa status and get back to you within 24 hours.
          </p>
          <form onSubmit={handleVisaFormSubmit} className="flex flex-col gap-3 sm:gap-4">

            {/* Full Name & DOB */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Full Name (as per passport)
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={visaFormData.fullName}
                  onChange={handleVisaFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner"
                />
              </div>

              {/* Email */}
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={visaFormData.email}
                onChange={handleVisaFormChange}
                required
                className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner"
              />
            </div>


            </div>

            {/* Nationality & Passport Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={visaFormData.dob}
                  onChange={handleVisaFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Nationality
                </label>
                <input
                  type="text"
                  name="nationality"
                  placeholder="Nationality"
                  value={visaFormData.nationality}
                  onChange={handleVisaFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Passport Number
                </label>
                <input
                  type="text"
                  name="passportNumber"
                  placeholder="Passport Number"
                  value={visaFormData.passportNumber}
                  onChange={handleVisaFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner"
                />
              </div>

              
            {/* Passport Expiry */}
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">
                Passport Expiry Date
              </label>
              <input
                type="date"
                name="passportExpiry"
                value={visaFormData.passportExpiry}
                onChange={handleVisaFormChange}
                required
                className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner"
              />
            </div>
            </div>


            {/* Consent */}
            <div className="flex items-start gap-2 sm:gap-3 mt-2">
              <Checkbox
                id="consentVisa"
                checked={consentVisa}
                onCheckedChange={(checked) => setConsentVisa(checked === true)}
                required
                className="mt-0.5 sm:mt-1 flex-shrink-0"
              />
              <label htmlFor="consentVisa" className="text-xs sm:text-sm text-primary leading-relaxed flex-1">
                I confirm that the information provided is accurate and I consent to visa status checking.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmittingVisa}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 hover:-translate-y-0.5 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {isSubmittingVisa ? "Checking..." : "Check Visa Status"}
              <ArrowRight className="h-4 w-4" />
            </button>
            </form>

        </TabsContent>

        {/* Accommodation Tab */}
        <TabsContent value="accommodation">
          <h3 className="text-base sm:text-lg font-bold text-primary mb-2">I need accommodation</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-4">
            Fill out the form below and we will assist you with accommodation options.
          </p>
          <form onSubmit={handleAccommodationFormSubmit} className="flex flex-col gap-3 sm:gap-4">
            {/* Name & Email in one line */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label htmlFor="accommodation-name" className="block text-sm font-medium text-primary mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  id="accommodation-name"
                  name="name"
                  placeholder="Full Name"
                  value={accommodationFormData.name}
                  onChange={handleAccommodationFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="accommodation-email" className="block text-sm font-medium text-primary mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  id="accommodation-email"
                  name="email"
                  placeholder="Email"
                  value={accommodationFormData.email}
                  onChange={handleAccommodationFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            {/* List of Universities Type & Select University in one line (when university type is selected) */}
            <div className={eligibilityFormData.universityType && eligibilityAvailableUniversities.length > 0 ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : ""}>
              {/* List of Universities Type */}
              <div>
                <label htmlFor="eligibility-universityType" className="block text-sm font-medium text-primary mb-1.5">
                  List Of Universities
                </label>
                <select
                  id="eligibility-universityType"
                  name="universityType"
                  value={eligibilityFormData.universityType}
                  onChange={handleEligibilityFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Select University Type</option>
                  <option value="Government University">Government University</option>
                  <option value="Private University">Private University</option>
                  <option value="Foreign University">Foreign University</option>
                </select>
              </div>

              {/* Selected University (conditional) */}
              {eligibilityFormData.universityType && eligibilityAvailableUniversities.length > 0 && (
                <div>
                  <label htmlFor="eligibility-selectedUniversity" className="block text-sm font-medium text-primary mb-1.5">
                    Select University
                  </label>
                  <select
                    id="eligibility-selectedUniversity"
                    name="selectedUniversity"
                    value={eligibilityFormData.selectedUniversity}
                    onChange={handleEligibilityFormChange}
                    required
                    className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="">Select University</option>
                    {eligibilityAvailableUniversities.map((university) => (
                      <option key={university.name} value={university.name}>
                        {university.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>



            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label htmlFor="accommodation-name" className="block text-sm font-medium text-primary mb-1.5">
                  Accomdation Type
                </label>
                <select
                  name="accommodationType"
                  value={accommodationFormData.accommodationType}
                  onChange={handleAccommodationFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Select accommodation type</option>
                  <option value="On-Campus Hostel">On-Campus Hostel</option>
                  <option value="Off-Campus Hostel">Off-Campus Hostel</option>
                  <option value="Private Residence">Private Residence</option>
                </select>
              </div>

              <div>
                <label htmlFor="accommodation-name" className="block text-sm font-medium text-primary mb-1.5">
                  Preferred Accomdation
                </label>
                <select
                  name="preferredAccommodation"
                  value={accommodationFormData.preferredAccommodation}
                  onChange={handleAccommodationFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Select preferred accommodation</option>
                  <option value="Single Room">Single Room</option>
                  <option value="Shared Room">Shared Room</option>
                  <option value="Apartment">Apartment</option>
                </select>
              </div>

            </div>

            {/* Duration of Stay */}
            <div className="mb-2">
              <h4 className="text-sm sm:text-base font-bold text-primary">Duration of Stay</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label htmlFor="accommodation-start-date" className="block text-sm font-medium text-primary mb-1.5">
                  Start Date
                </label>
                <input
                  type="date"
                  id="accommodation-start-date"
                  name="startDate"
                  value={accommodationFormData.startDate}
                  onChange={handleAccommodationFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label htmlFor="accommodation-end-date" className="block text-sm font-medium text-primary mb-1.5">
                  End Date
                </label>
                <input
                  type="date"
                  id="accommodation-end-date"
                  name="endDate"
                  value={accommodationFormData.endDate}
                  onChange={handleAccommodationFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            {/* Consent Box for Accommodation */}
            <div className="flex items-start gap-2 sm:gap-3 mt-3">
              <Checkbox
                id="consentAccommodation"
                checked={consentAccommodation}
                onCheckedChange={(checked) => setConsentAccommodation(checked === true)}
                required
                className="mt-0.5 sm:mt-1 flex-shrink-0"
              />
              <label
                htmlFor="consentAccommodation"
                className="text-xs sm:text-sm text-primary cursor-pointer leading-relaxed flex-1"
              >
                I confirm that the information provided is accurate and I consent to accommodation assistance.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmittingAccommodation}
              className="hover:border hover:bg-white hover:text-primary inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {isSubmittingAccommodation ? "Submitting..." : "Submit"}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </form>
        </TabsContent>

        {/* Transportation Tab */}
        <TabsContent value="transportation">
          <h3 className="text-base sm:text-lg font-bold text-primary mb-2">Transportation</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-4">
            Fill out the form below and we will assist you with transportation arrangements.
          </p>
          <form onSubmit={handleTransportationFormSubmit} className="flex flex-col gap-3 sm:gap-4">
            {/* Name & Email in one line */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label htmlFor="transportation-name" className="block text-sm font-medium text-primary mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  id="transportation-name"
                  name="name"
                  placeholder="Full Name"
                  value={transportationFormData.name}
                  onChange={handleTransportationFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="transportation-email" className="block text-sm font-medium text-primary mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  id="transportation-email"
                  name="email"
                  placeholder="Email"
                  value={transportationFormData.email}
                  onChange={handleTransportationFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            {/* Date of Arrival & Contact in one line */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Date of Arrival */}
              <div>
                <label htmlFor="dateOfArrival" className="block text-sm font-medium text-primary mb-1.5">
                  Date of Arrival
                </label>
                <input
                  type="date"
                  id="dateOfArrival"
                  name="dateOfArrival"
                  value={transportationFormData.dateOfArrival}
                  onChange={handleTransportationFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Contact with Country Flag Selector */}
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-primary mb-1.5">
                  Contact
                </label>
                <div
                  className={cn(
                    "w-full rounded-xl border bg-secondary/40 p-0 shadow-inner shadow-primary/5 focus-within:border-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/30",
                    transportationPhoneError ? "border-red-500 focus-within:ring-red-400" : "border-primary/20",
                  )}
                >
                  <PhoneInput
                    international
                    defaultCountry="MY"
                    country={transportationCountry}
                    value={transportationFormData.contactNumber || undefined}
                    onChange={handleTransportationPhoneInputChange}
                    onCountryChange={(country) => {
                      const nextCountry = country ?? undefined;
                      setTransportationCountry(nextCountry);
                      if (transportationFormData.contactNumber) {
                        validateTransportationPhone(transportationFormData.contactNumber, nextCountry);
                      }
                    }}
                    onBlur={() => validateTransportationPhone()}
                    placeholder="Enter contact number"
                    required
                    limitMaxLength
                    style={phoneInputStyle}
                    countrySelectComponent={SearchableCountrySelect}
                    className="!border-none !bg-transparent [&>input]:!border-none [&>input]:!bg-transparent [&>input]:!text-primary [&>input]:!text-sm [&>input]:p-3 [&>input]:!outline-none [&>input]:!ring-0 [&>input]:placeholder:text-primary/50"
                    numberInputProps={{
                      className: "!bg-transparent !border-none !outline-none !ring-0",
                      inputMode: "numeric",
                    }}
                  />
                </div>
                {transportationPhoneError && (
                  <p className="text-red-500 text-xs mt-1">{transportationPhoneError}</p>
                )}
              </div>
            </div>

                        {/* List of Universities Type & Select University in one line (when university type is selected) */}
                        <div className={eligibilityFormData.universityType && eligibilityAvailableUniversities.length > 0 ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : ""}>
              {/* List of Universities Type */}
              <div>
                <label htmlFor="eligibility-universityType" className="block text-sm font-medium text-primary mb-1.5">
                  List Of Universities
                </label>
                <select
                  id="eligibility-universityType"
                  name="universityType"
                  value={eligibilityFormData.universityType}
                  onChange={handleEligibilityFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Select University Type</option>
                  <option value="Government University">Government University</option>
                  <option value="Private University">Private University</option>
                  <option value="Foreign University">Foreign University</option>
                </select>
              </div>

              {/* Selected University (conditional) */}
              {eligibilityFormData.universityType && eligibilityAvailableUniversities.length > 0 && (
                <div>
                  <label htmlFor="eligibility-selectedUniversity" className="block text-sm font-medium text-primary mb-1.5">
                    Select University
                  </label>
                  <select
                    id="eligibility-selectedUniversity"
                    name="selectedUniversity"
                    value={eligibilityFormData.selectedUniversity}
                    onChange={handleEligibilityFormChange}
                    required
                    className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="">Select University</option>
                    {eligibilityAvailableUniversities.map((university) => (
                      <option key={university.name} value={university.name}>
                        {university.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>


            {/* Flight Detail & Flight Number in one line */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Flight Detail */}
              <div>
                <label htmlFor="flightDetail" className="block text-sm font-medium text-primary mb-1.5">
                  Flight Detail
                </label>
                <textarea
                  id="flightDetail"
                  name="flightDetail"
                  placeholder="Enter flight details (e.g., airline, route, etc.)"
                  value={transportationFormData.flightDetail}
                  onChange={handleTransportationFormChange}
                  required
                  rows={3}
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
              </div>

              {/* Flight Number */}
              <div>
                <label htmlFor="flightNumber" className="block text-sm font-medium text-primary mb-1.5">
                  Flight Number
                </label>
                <input
                  type="text"
                  id="flightNumber"
                  name="flightNumber"
                  placeholder="Flight Number"
                  value={transportationFormData.flightNumber}
                  onChange={handleTransportationFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            {/* Number of Luggage & Number of Person in one line */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Number of Luggage */}
              <div>
                <label htmlFor="numberOfLuggage" className="block text-sm font-medium text-primary mb-1.5">
                  Number of Luggage
                </label>
                <input
                  type="number"
                  id="numberOfLuggage"
                  name="numberOfLuggage"
                  placeholder="Number of Luggage"
                  value={transportationFormData.numberOfLuggage}
                  onChange={handleTransportationFormChange}
                  required
                  min="0"
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Number of Person */}
              <div>
                <label htmlFor="numberOfPerson" className="block text-sm font-medium text-primary mb-1.5">
                  Number of Person
                </label>
                <input
                  type="number"
                  id="numberOfPerson"
                  name="numberOfPerson"
                  placeholder="Number of Person"
                  value={transportationFormData.numberOfPerson}
                  onChange={handleTransportationFormChange}
                  required
                  min="1"
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            {/* Attach Flight Ticket */}
            <div>
              <label htmlFor="flightTicket" className="block text-sm font-medium text-primary mb-1.5">
                Attach Flight Ticket
              </label>
              <input
                type="file"
                id="flightTicket"
                name="flightTicket"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFlightTicketChange}
                className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:cursor-pointer"
              />
              {flightTicketFile && (
                <p className="text-sm text-primary/70 mt-1">
                  Selected: {flightTicketFile.name}
                </p>
              )}
            </div>

            {/* Airport Pickup Checkbox */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="needsAirportPickup"
                checked={transportationFormData.needsAirportPickup}
                onCheckedChange={handleTransportationCheckboxChange}
                className="flex-shrink-0"
              />
              <label
                htmlFor="needsAirportPickup"
                className="text-sm font-medium text-primary cursor-pointer flex-1"
              >
                I need airport pick up
              </label>
            </div>

            {/* Consent Box for Transportation */}
            <div className="flex items-start gap-2 sm:gap-3 mt-3">
              <Checkbox
                id="consentTransportation"
                checked={consentTransportation}
                onCheckedChange={(checked) => setConsentTransportation(checked === true)}
                required
                className="mt-0.5 sm:mt-1 flex-shrink-0"
              />
              <label
                htmlFor="consentTransportation"
                className="text-xs sm:text-sm text-primary cursor-pointer leading-relaxed flex-1"
              >
                I confirm that the information provided is accurate and I consent to transportation assistance.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmittingTransportation}
              className="hover:border hover:bg-white hover:text-primary inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {isSubmittingTransportation ? "Submitting..." : "Submit"}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}