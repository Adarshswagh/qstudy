import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface HeroFormProps {
  universityCategories: {
    government: Array<{ name: string; logo: string }>;
    private: Array<{ name: string; logo: string }>;
    international: Array<{ name: string; logo: string }>;
  };
}

export default function HeroForm({ universityCategories }: HeroFormProps) {
  const [activeTab, setActiveTab] = useState("apply-now");
  
  // Phone input states
  const [phoneValue, setPhoneValue] = useState<string>("");
  const [transportationPhoneValue, setTransportationPhoneValue] = useState<string>("");
  
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
    area: "",
    universityType: "",
    selectedUniversity: "",
    expectedMovingDate: "",
  });

  // Separate state for transportation form
  const [transportationFormData, setTransportationFormData] = useState({
    name: "",
    email: "",
    dateOfArrival: "",
    flightDetail: "",
    flightNumber: "",
    needsAirportPickup: false,
  });

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
      // Reset selectedUniversity when universityType changes
      ...(name === "universityType" && { selectedUniversity: "" }),
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate consent
    if (!consentApplyNow) {
      toast.error("Please agree to the consent terms");
      return;
    }
    
    // Validate phone number
    if (phoneValue && !isValidPhoneNumber(phoneValue)) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    // Handle form submission
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
    setPhoneValue("");
    setConsentApplyNow(false);
  };

  const handleEligibilityFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate consent
    if (!consentEligibility) {
      toast.error("Please agree to the consent terms");
      return;
    }
    
    // Handle eligibility form submission
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
  };

  const handleVisaFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate consent
    if (!consentVisa) {
      toast.error("Please agree to the consent terms");
      return;
    }
    
    // Handle visa form submission
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
  };

  const handleAccommodationFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate consent
    if (!consentAccommodation) {
      toast.error("Please agree to the consent terms");
      return;
    }
    
    // Handle accommodation form submission
    const name = accommodationFormData.name || "Future Scholar";
    toast.success(
      `Thank you, ${name}! We will assist you with accommodation and get back to you within 24 hours.`,
    );
    // Reset accommodation form
    setAccommodationFormData({
      name: "",
      email: "",
      area: "",
      universityType: "",
      selectedUniversity: "",
      expectedMovingDate: "",
    });
    setConsentAccommodation(false);
  };

  const handleTransportationFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate consent
    if (!consentTransportation) {
      toast.error("Please agree to the consent terms");
      return;
    }
    
    // Validate transportation phone number
    if (transportationPhoneValue && !isValidPhoneNumber(transportationPhoneValue)) {
      toast.error("Please enter a valid contact number");
      return;
    }
    
    // Handle transportation form submission
    const name = transportationFormData.name || "Future Scholar";
    toast.success(
      `Thank you, ${name}! We will assist you with transportation and get back to you within 24 hours.`,
    );
    // Reset transportation form
    setTransportationFormData({
      name: "",
      email: "",
      dateOfArrival: "",
      flightDetail: "",
      flightNumber: "",
      needsAirportPickup: false,
    });
    setTransportationPhoneValue("");
    setConsentTransportation(false);
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

  // Get universities for accommodation form based on selected university type
  const getAccommodationAvailableUniversities = () => {
    if (!accommodationFormData.universityType) return [];
    
    const categoryMap: Record<string, keyof typeof universityCategories> = {
      "Government University": "government",
      "Private University": "private",
      "Foreign University": "international",
    };
    
    const categoryKey = categoryMap[accommodationFormData.universityType];
    return categoryKey ? universityCategories[categoryKey] : [];
  };

  const accommodationAvailableUniversities = getAccommodationAvailableUniversities();

  // Custom styling for phone input to match your design
  const phoneInputStyle = {
    width: '100%',
    '--PhoneInput-color--focus': 'hsl(var(--primary))',
    '--PhoneInputCountryFlag-borderColor': 'transparent',
    '--PhoneInputCountryFlag-height': '1.5rem',
    '--PhoneInputCountrySelectArrow-color': 'hsl(var(--primary))',
  } as React.CSSProperties;

  return (
    <div className="relative">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 mb-6 gap-1 sm:gap-2 p-1.5 sm:p-2 h-auto min-h-[3rem] sm:min-h-[2.5rem]">
          <TabsTrigger value="apply-now" className="text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 md:px-4 py-2 sm:py-1.5 whitespace-nowrap w-full h-full rounded-md">
            Apply Now
          </TabsTrigger>
          <TabsTrigger value="check-eligibility" className="text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 md:px-4 py-2 sm:py-1.5 whitespace-nowrap w-full h-full rounded-md">
            Check My Eligibility
          </TabsTrigger>
          <TabsTrigger value="check-visa" className="text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 md:px-4 py-2 sm:py-1.5 whitespace-nowrap w-full h-full rounded-md">
            Check My Visa
          </TabsTrigger>
          <TabsTrigger value="accommodation" className="text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 md:px-4 py-2 sm:py-1.5 whitespace-nowrap w-full h-full rounded-md">
            Accommodation
          </TabsTrigger>
          <TabsTrigger value="transportation" className="text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 md:px-4 py-2 sm:py-1.5 whitespace-nowrap w-full h-full rounded-md">
            Transportation
          </TabsTrigger>
        </TabsList>

        {/* Apply Now Tab */}
        <TabsContent value="apply-now">
          <h3 className="text-lg font-bold text-primary mb-2">Apply Me Now</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Fill out the form below and our counsellors will get back to you within 24 hours.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Name & Email in one line */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary mb-1.5">
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
              <label htmlFor="phone" className="block text-sm font-medium text-primary mb-1.5">
                Phone
              </label>
              <div className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-0 shadow-inner shadow-primary/5 focus-within:border-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/30">
                <PhoneInput
                  international
                  defaultCountry="MY"
                  value={phoneValue}
                  onChange={setPhoneValue}
                  placeholder="Enter phone number"
                  required
                  style={phoneInputStyle}
                  className="!border-none !bg-transparent [&>input]:!border-none [&>input]:!bg-transparent [&>input]:!text-primary [&>input]:!text-sm [&>input]:p-3 [&>input]:!outline-none [&>input]:!ring-0 [&>input]:placeholder:text-primary/50"
                  numberInputProps={{
                    className: "!bg-transparent !border-none !outline-none !ring-0"
                  }}
                />
              </div>
              {phoneValue && !isValidPhoneNumber(phoneValue) && (
                <p className="text-red-500 text-xs mt-1">Please enter a valid phone number</p>
              )}
            </div>

            {/* Program Looking For - Next Line */}
            <div>
              <label htmlFor="programLookingFor" className="block text-sm font-medium text-primary mb-1.5">
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
                <label htmlFor="highestQualification" className="block text-sm font-medium text-primary mb-1.5">
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
                  <option value="Greater than 10">Greater than 10</option>
                  <option value="Greater than 12">Greater than 12</option>
                  <option value="Foundation">Foundation</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Degree">Degree</option>
                  <option value="Master">Master</option>
                </select>
              </div>

              {/* Type of Qualification */}
              <div>
                <label htmlFor="typeOfQualification" className="block text-sm font-medium text-primary mb-1.5">
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
                </select>
              </div>
            </div>

            {/* List of Universities Type & Select University in one line (when university type is selected) */}
            <div className={formData.universityType && availableUniversities.length > 0 ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : ""}>
              {/* List of Universities Type */}
              <div>
                <label htmlFor="universityType" className="block text-sm font-medium text-primary mb-1.5">
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
                  <label htmlFor="selectedUniversity" className="block text-sm font-medium text-primary mb-1.5">
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
            <div className="flex items-start space-x-2 mt-3">
              <Checkbox
                id="consentApplyNow"
                checked={consentApplyNow}
                onCheckedChange={(checked) => setConsentApplyNow(checked === true)}
                required
                className="mt-1"
              />
              <label
                htmlFor="consentApplyNow"
                className="text-sm text-primary cursor-pointer leading-relaxed"
              >
                I confirm that the information provided is accurate and I consent to be contacted by the university.
              </label>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:border hover:bg-white hover:text-primary"
            >
              Submit
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </form>
        </TabsContent>

        {/* Check Eligibility Tab */}
        <TabsContent value="check-eligibility">
          <h3 className="text-lg font-bold text-primary mb-2">Check My Eligibility</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Fill out the form below to check your eligibility for various programs.
          </p>
          <form onSubmit={handleEligibilityFormSubmit} className="flex flex-col gap-4">
            
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
                  placeholder="Name"
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
                  <option value="Greater than 10">Greater than 10</option>
                  <option value="Greater than 12">Greater than 12</option>
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
            <div className="flex items-start space-x-2 mt-3">
              <Checkbox
                id="consentEligibility"
                checked={consentEligibility}
                onCheckedChange={(checked) => setConsentEligibility(checked === true)}
                required
                className="mt-1"
              />
              <label
                htmlFor="consentEligibility"
                className="text-sm text-primary cursor-pointer leading-relaxed"
              >
                I confirm that the information provided is accurate and I consent to be contacted for eligibility assessment.
              </label>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:border hover:bg-white hover:text-primary"
            >
              Check Eligibility
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </form>
        </TabsContent>

        {/* Check Visa Tab */}
        <TabsContent value="check-visa">
          <h3 className="text-lg font-bold text-primary mb-2">Check my visa</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Fill out the form below and we will check your visa status and get back to you within 24 hours.
          </p>
          <form onSubmit={handleVisaFormSubmit} className="flex flex-col gap-4">

            {/* Full Name & DOB */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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


            {/* Course & Institution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Course Name
                </label>
                <input
                  type="text"
                  name="course"
                  placeholder="Course Name"
                  value={visaFormData.course}
                  onChange={handleVisaFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Institution Name
                </label>
                <input
                  type="text"
                  name="institution"
                  placeholder="Institution Name"
                  value={visaFormData.institution}
                  onChange={handleVisaFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner"
                />
              </div>
            </div>

            {/* Highest Qualification */}
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">
                Highest Qualification Completed
              </label>
              <input
                type="text"
                name="qualification"
                placeholder="Qualification"
                value={visaFormData.qualification}
                onChange={handleVisaFormChange}
                required
                className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner"
              />
            </div>

            {/* English Proficiency & Funding Source */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  English Proficiency 
                </label>
                <select
                  name="funding"
                  value={visaFormData.funding}
                  onChange={handleVisaFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner"
                >
                  <option value="ielts">IELTS</option>
                  <option value="toefl">TOEFL</option>
                  <option value="muet">MUET</option>
                  <option value="proof">Proof</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Funding Source
                </label>
                <select
                  name="funding"
                  value={visaFormData.funding}
                  onChange={handleVisaFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner"
                >
                  <option value="">Select</option>
                  <option value="self">Self</option>
                  <option value="sponsor">Sponsor</option>
                </select>
              </div>
            </div>


            {/* Consent */}
            <div className="flex items-start space-x-2 mt-2">
              <Checkbox
                id="consentVisa"
                checked={consentVisa}
                onCheckedChange={(checked) => setConsentVisa(checked === true)}
                required
                className="mt-1"
              />
              <label htmlFor="consentVisa" className="text-sm text-primary leading-relaxed">
                I confirm that the information provided is accurate and I consent to visa status checking.
              </label>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Check Visa Status
              <ArrowRight className="h-4 w-4" />
            </button>
            </form>

        </TabsContent>

        {/* Accommodation Tab */}
        <TabsContent value="accommodation">
          <h3 className="text-lg font-bold text-primary mb-2">I need accommodation</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Fill out the form below and we will assist you with accommodation options.
          </p>
          <form onSubmit={handleAccommodationFormSubmit} className="flex flex-col gap-4">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Which Area You Looking For */}
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-primary mb-1.5">
                Address Of Accomdation
              </label>
              <input
                type="text"
                id="area"
                name="area"
                placeholder="Which area are you looking for"
                required
                className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Which Area You Looking For */}
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-primary mb-1.5">
                Guardian / Host Details
              </label>
              <input
                type="text"
                id="area"
                name="area"
                placeholder="Guardian / Host Details"
                required
                className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label htmlFor="accommodation-name" className="block text-sm font-medium text-primary mb-1.5">
                  Accomdation Type
                </label>
                <select
                  name="universityType"
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">On-Campus Hostel</option>
                  <option value="Off-Campus Hostel">Off-Campus Hostel</option>
                </select>
              </div>

              <div>
                <label htmlFor="accommodation-name" className="block text-sm font-medium text-primary mb-1.5">
                  Preferred Accomdation
                </label>
                <select
                  name="universityType"
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Signle Room</option>
                  <option value="Shared Room">Shared Room</option>
                  <option value="Apartment">Apartment</option>
                </select>
              </div>

            </div>

            {/* List of Universities Type & Select University in one line (when university type is selected) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <h4 className="font-700">Duration OF Stay : </h4><br/>
              <div>
                <label htmlFor="expectedMovingDate" className="block text-sm font-medium text-primary mb-1.5">
                  Start Date
                </label>
                <input
                  type="date"
                  id="expectedMovingDate"
                  name="expectedMovingDate"
                  value={accommodationFormData.expectedMovingDate}
                  onChange={handleAccommodationFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label htmlFor="expectedMovingDate" className="block text-sm font-medium text-primary mb-1.5">
                  End Date
                </label>
                <input
                  type="date"
                  id="expectedMovingDate"
                  name="expectedMovingDate"
                  value={accommodationFormData.expectedMovingDate}
                  onChange={handleAccommodationFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            {/* Consent Box for Accommodation */}
            <div className="flex items-start space-x-2 mt-3">
              <Checkbox
                id="consentAccommodation"
                checked={consentAccommodation}
                onCheckedChange={(checked) => setConsentAccommodation(checked === true)}
                required
                className="mt-1"
              />
              <label
                htmlFor="consentAccommodation"
                className="text-sm text-primary cursor-pointer leading-relaxed"
              >
                I confirm that the information provided is accurate and I consent to accommodation assistance.
              </label>
            </div>

            <button
              type="submit"
              className="hover:border hover:bg-white hover:text-primary inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Submit
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </form>
        </TabsContent>

        {/* Transportation Tab */}
        <TabsContent value="transportation">
          <h3 className="text-lg font-bold text-primary mb-2">Transportation</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Fill out the form below and we will assist you with transportation arrangements.
          </p>
          <form onSubmit={handleTransportationFormSubmit} className="flex flex-col gap-4">
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
                  placeholder="Name"
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
              <div className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-0 shadow-inner shadow-primary/5 focus-within:border-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/30">
                <PhoneInput
                  international
                  defaultCountry="MY"
                  value={transportationPhoneValue}
                  onChange={setTransportationPhoneValue}
                  placeholder="Enter contact number"
                  required
                  style={phoneInputStyle}
                  className="!border-none !bg-transparent [&>input]:!border-none [&>input]:!bg-transparent [&>input]:!text-primary [&>input]:!text-sm [&>input]:p-3 [&>input]:!outline-none [&>input]:!ring-0 [&>input]:placeholder:text-primary/50"
                  numberInputProps={{
                    className: "!bg-transparent !border-none !outline-none !ring-0"
                  }}
                />
              </div>
              {transportationPhoneValue && !isValidPhoneNumber(transportationPhoneValue) && (
                <p className="text-red-500 text-xs mt-1">Please enter a valid contact number</p>
              )}
            </div>

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

            {/* Airport Pickup Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="needsAirportPickup"
                checked={transportationFormData.needsAirportPickup}
                onCheckedChange={handleTransportationCheckboxChange}
              />
              <label
                htmlFor="needsAirportPickup"
                className="text-sm font-medium text-primary cursor-pointer"
              >
                I need airport pick up
              </label>
            </div>

            {/* Consent Box for Transportation */}
            <div className="flex items-start space-x-2 mt-3">
              <Checkbox
                id="consentTransportation"
                checked={consentTransportation}
                onCheckedChange={(checked) => setConsentTransportation(checked === true)}
                required
                className="mt-1"
              />
              <label
                htmlFor="consentTransportation"
                className="text-sm text-primary cursor-pointer leading-relaxed"
              >
                I confirm that the information provided is accurate and I consent to transportation assistance.
              </label>
            </div>

            <button
              type="submit"
              className="hover:border hover:bg-white hover:text-primary inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Submit
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}