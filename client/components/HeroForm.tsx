import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface HeroFormProps {
  universityCategories: {
    government: Array<{ name: string; logo: string }>;
    private: Array<{ name: string; logo: string }>;
    international: Array<{ name: string; logo: string }>;
  };
}

export default function HeroForm({ universityCategories }: HeroFormProps) {
  const [activeTab, setActiveTab] = useState("apply-now");
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

  // Separate state for visa check form
  const [visaFormData, setVisaFormData] = useState({
    name: "",
    email: "",
    passportNumber: "",
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
    contact: "",
    needsAirportPickup: false,
  });

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
  };

  const handleVisaFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle visa form submission
    const name = visaFormData.name || "Future Scholar";
    toast.success(
      `Thank you, ${name}! We will check your visa status and get back to you within 24 hours.`,
    );
    // Reset visa form
    setVisaFormData({
      name: "",
      email: "",
      passportNumber: "",
    });
  };

  const handleAccommodationFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
  };

  const handleTransportationFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      contact: "",
      needsAirportPickup: false,
    });
  };

  // Get universities based on selected university type
  // This ensures only universities from the selected category are shown
  const getAvailableUniversities = () => {
    if (!formData.universityType) return [];
    
    // Map the selected university type to the corresponding category key
    const categoryMap: Record<string, keyof typeof universityCategories> = {
      "Government University": "government",
      "Private University": "private",
      "Foreign University": "international",
    };
    
    const categoryKey = categoryMap[formData.universityType];
    // Return only universities from the selected category
    return categoryKey ? universityCategories[categoryKey] : [];
  };

  const availableUniversities = getAvailableUniversities();

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

  return (
    <div className="relative">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6 gap-1">
          <TabsTrigger value="apply-now" className="text-xs sm:text-sm whitespace-nowrap">
            Apply Now
          </TabsTrigger>
          <TabsTrigger value="check-visa" className="text-xs sm:text-sm whitespace-nowrap">
            Check my visa
          </TabsTrigger>
          <TabsTrigger value="accommodation" className="text-xs sm:text-sm whitespace-nowrap">
            Accommodation
          </TabsTrigger>
          <TabsTrigger value="transportation" className="text-xs sm:text-sm whitespace-nowrap">
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

            {/* Phone & Program Looking For in one line */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-primary mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Program Looking For */}
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

              {/* Selected University (conditional) - Only shows after university type is selected */}
              {/* This dropdown will display only universities from the selected type and appears on the same line */}
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

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Submit
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
            {/* Name */}
            <div>
              <label htmlFor="visa-name" className="block text-sm font-medium text-primary mb-1.5">
                Name
              </label>
              <input
                type="text"
                id="visa-name"
                name="name"
                placeholder="Name"
                value={visaFormData.name}
                onChange={handleVisaFormChange}
                required
                className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="visa-email" className="block text-sm font-medium text-primary mb-1.5">
                Email
              </label>
              <input
                type="email"
                id="visa-email"
                name="email"
                placeholder="Email"
                value={visaFormData.email}
                onChange={handleVisaFormChange}
                required
                className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Passport Number */}
            <div>
              <label htmlFor="passportNumber" className="block text-sm font-medium text-primary mb-1.5">
                Passport Number
              </label>
              <input
                type="text"
                id="passportNumber"
                name="passportNumber"
                placeholder="Passport Number"
                value={visaFormData.passportNumber}
                onChange={handleVisaFormChange}
                required
                className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Check Visa Status
              <ArrowRight className="h-4 w-4" aria-hidden />
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
                  placeholder="Name"
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

            {/* Which Area You Looking For */}
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-primary mb-1.5">
                Which Area You Looking For
              </label>
              <input
                type="text"
                id="area"
                name="area"
                placeholder="Which area are you looking for"
                value={accommodationFormData.area}
                onChange={handleAccommodationFormChange}
                required
                className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* List of Universities Type & Select University in one line (when university type is selected) */}
            <div className={accommodationFormData.universityType && accommodationAvailableUniversities.length > 0 ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : ""}>
              {/* List of Universities Type */}
              <div>
                <label htmlFor="accommodation-universityType" className="block text-sm font-medium text-primary mb-1.5">
                  List Of Universities
                </label>
                <select
                  id="accommodation-universityType"
                  name="universityType"
                  value={accommodationFormData.universityType}
                  onChange={handleAccommodationFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Select University Type</option>
                  <option value="Government University">Government University</option>
                  <option value="Private University">Private University</option>
                  <option value="Foreign University">Foreign University</option>
                </select>
              </div>

              {/* Selected University (conditional) - Only shows after university type is selected */}
              {accommodationFormData.universityType && accommodationAvailableUniversities.length > 0 && (
                <div>
                  <label htmlFor="accommodation-selectedUniversity" className="block text-sm font-medium text-primary mb-1.5">
                    Select University
                  </label>
                  <select
                    id="accommodation-selectedUniversity"
                    name="selectedUniversity"
                    value={accommodationFormData.selectedUniversity}
                    onChange={handleAccommodationFormChange}
                    required
                    className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="">Select University</option>
                    {accommodationAvailableUniversities.map((university) => (
                      <option key={university.name} value={university.name}>
                        {university.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Expected Moving Date */}
            <div>
              <label htmlFor="expectedMovingDate" className="block text-sm font-medium text-primary mb-1.5">
                Expected Moving Date
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

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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

              {/* Contact */}
              <div>
                <label htmlFor="transportation-contact" className="block text-sm font-medium text-primary mb-1.5">
                  Contact
                </label>
                <input
                  type="tel"
                  id="transportation-contact"
                  name="contact"
                  placeholder="Contact Number"
                  value={transportationFormData.contact}
                  onChange={handleTransportationFormChange}
                  required
                  className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
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

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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

