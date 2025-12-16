"use client";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Compass,
  Cpu,
  FileCheck2,
  FlaskConical,
  Globe2,
  GraduationCap,
  Languages,
  Mail,
  Map,
  Phone,
  PlaneTakeoff,
  Quote,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import type { LucideIcon } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import type { CountryCode } from "libphonenumber-js";
import ContactForm from "@/components/ContactForm";
import HeroForm, { SearchableCountrySelect, validatePhoneField } from "@/components/HeroForm";
import StepsSection from "@/components/steps/page";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const heroHighlights = [
  {
    title: "One-Stop Application Centre",
    description: "From choosing your course to visa assistance.",
    icon: Building2,
  },
  {
    title: "Free Admission Service",
    description: "Zero application fees with end-to-end support.",
    icon: Wallet,
  },
  {
    title: "Global Recognition & Trust",
    description: "Zero application fees with end-to-end support.",
    icon: Globe2,
  },
];

type JourneyStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const journeySteps: JourneyStep[] = [
  {
    title: "Explore Your Options",
    description:
      "Choose from top universities in Malaysia, the UK, Canada, Australia & more.",
    icon: Compass,
  },
  {
    title: "Plan Your Finances",
    description:
      "Transparent tuition, living costs, and scholarships tailored to your needs.",
    icon: Wallet,
  },
  {
    title: "Complete Your Application",
    description:
      "Expert guidance on documents, personal statements, and timely submissions.",
    icon: FileCheck2,
  },
  {
    title: "Apply for Your Visa",
    description:
      "Step-by-step support for visa documents, requirements, and interviews.",
    icon: PlaneTakeoff,
  },
  {
    title: "Prepare for Your Journey",
    description:
      "Flights, accommodation, and pre-departure briefings for a smooth start.",
    icon: Map,
  },
];

type ProgramCategory = {
  category: string;
  description: string;
  highlights: string[];
  allPrograms: string[];
  icon: LucideIcon;
};

const programCatalog: ProgramCategory[] = [
  {
    category: "Business & Management",
    description: "Lead global enterprises with future-ready business acumen.",
    icon: Briefcase,
    highlights: [
      "Accounting & Finance",
      "Business Analytics",
      "Logistics & Supply Chain",
      "International Business",
      "Entrepreneurship",
    ],
    allPrograms: [
      "Accounting and Finance",
      "Actuarial Science",
      "Banking and Finance",
      "Business Administration",
      "Business Analytics",
      "Business Economics",
      "Business Information System",
      "Business Management",
      "Commerce",
      "Entrepreneurship",
      "Economics",
      "International Business",
      "Logistics and Supply Chain Management",
      "Management",
      "Marketing",
      "Public Administration",
    ],
  },
  {
    category: "Engineering & Technology",
    description:
      "Design innovation across the world's most advanced industries.",
    icon: Cpu,
    highlights: [
      "Aerospace Engineering",
      "Computer Science",
      "Information Technology",
      "Aircraft Engineering Technology",
      "Construction Management",

    ],
    allPrograms: [
      "Aerospace Engineering",
      "Computer Science",
      "Information Technology",
      "Aircraft Engineering Technology",
      "Construction Management",
      "Mechanical Engineering",
      "Aviation Management",
      "Electrical & Electronic",
      "Petroleum Engineering",
      "Chemical Engineering",
      "Energy Technology",
      "Software Engineering",
      "Civil Engineering",
      "Integrated Engineering",
      "Telecommunication Engineering",
      "Computer Engineering",
      "Environmental Engineering",
    ],
  },
  {
    category: "Education & Social Sciences",
    description: "Shape communities through knowledge, culture, and policy.",
    icon: GraduationCap,
    highlights: [
      "Anthropology and Sociology",
      "English",
      "Liberal Arts",
      "Communication",
      "Guidance and Counselling",
    ],
    allPrograms: [
      "Anthropology and Sociology",
      "English",
      "Liberal Arts",
      "Communication",
      "Guidance and Counselling",
      "Political Science",
      "Media Studies",
      "International Relations",
      "Psychology",
      "Education",
      "Journalism",
      "Public Relations",
      "Sociology",
      "Law",
      "Intercultural Communication",
    ],
  },
  {
    category: "Science, Health & Environment",
    description: "Advance global wellbeing through scientific breakthroughs.",
    icon: FlaskConical,
    highlights: [
      "Agricultural Science",
      "Environmental Science",
      "Nutrition",
      "Biochemistry",
      "Food Science",
    ],
    allPrograms: [
      "Agricultural Science",
      "Environmental Science",
      "Nutrition",
      "Biochemistry",
      "Pharmaceutical Science",
      "Biology",
      "Geology",
      "Veterinary",
      "Food Science",
      "Biomedical Engineering",
      "Marine Science",
      "Physics",
      "Biotechnology",
      "Mathematics",
      "Physiotherapy",
      "Chemistry",
      "Medical Science",
      "Statistics",
      "Dentistry",
      "Nursing",
      "MBBS",
    ],
  },
  {
    category: "Religion & Languages",
    description: "Connect cultures with multilingual and ethical expertise.",
    icon: Languages,
    highlights: [
      "Arabic",
      "Halal Industry",
      "Japanese",
      "Chinese Studies",
      "Islamic Finance",
    ],
    allPrograms: [
      "Arabic",
      "Halal Industry",
      "Japanese",
      "Chinese Studies",
      "Islamic Finance",
      "Malay Studies",
      "English Language & Literature",
      "Islamic Studies (Shariah, Usuluddin)",
      "Tamil",
      "Spanish",
      "German",
      "French",
    ],
  },
];

type FeatureHighlight = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const featureHighlights: FeatureHighlight[] = [
  {
    title: "Expert Faculty Access",
    description:
      "Study with globally recognised lecturers across Malaysia’s top-ranked universities.",
    icon: ShieldCheck,
  },
  {
    title: "Flexible Learning Pathways",
    description:
      "Foundation, Undergraduate, Postgraduate, and PhD programs tailored to your ambitions.",
    icon: Clock,
  },
  {
    title: "Global Recognition",
    description:
      "Degrees with international accreditation and mobility to 25+ countries.",
    icon: Globe2,
  },
  {
    title: "Dedicated Career Guidance",
    description:
      "Personal counsellors providing internships, career mapping, and alumni mentorship.",
    icon: Target,
  },
];

type RepresentationGroup = {
  title: string;
  items: string[];
};

const representationGroups: RepresentationGroup[] = [
  {
    title: "Malaysian Government Universities",
    items: [
      "University of Malaya",
      "Universiti Kebangsaan Malaysia",
      "Universiti Sains Malaysia",
      "Universiti Teknologi Malaysia",
    ],
  },
  {
    title: "Malaysian Private Universities",
    items: [
      "Taylor's University",
      "Sunway University",
      "Asia Pacific University (APU)",
      "INTI International University",
      "HELP University",
    ],
  },
  {
    title: "Foreign Branch Campuses",
    items: [
      "Monash University Malaysia",
      "University of Nottingham Malaysia",
      "Swinburne University Sarawak",
      "Heriot-Watt University Malaysia",
    ],
  },
];

type Testimonial = {
  name: string;
  program: string;
  quote: string;
  placement: string;
};


const successMetrics = [
  { value: "100%", label: "Free admission consultation" },
  { value: "24/7", label: "Multilingual counsellor support" },
  { value: "90%", label: "Visa Success Rate" },
];

type GalleryCard = {
  title: string;
  caption: string;
  accent: string;
};

const galleryShowcase: GalleryCard[] = [
  {
    title: "City Campus Life",
    caption: "Experience vibrant learning hubs across Kuala Lumpur's skyline.",
    accent: "from-primary/20 to-transparent",
  },
  {
    title: "Global Networking",
    caption:
      "Connect with international peers through QStudy exchange pathways.",
    accent: "from-accent/40 to-transparent",
  },
  {
    title: "Student Success Workshops",
    caption: "Career clinics, IELTS prep, and leadership coaching year-round.",
    accent: "from-secondary/60 to-transparent",
  },
  {
    title: "Immersive Orientation",
    caption: "Pre-departure briefings ensure you arrive confident and ready.",
    accent: "from-primary/25 to-transparent",
  },
];

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: "Is the consultation really free?",
    answer:
      "Yes. We provides 100% free admission consultation from course selection to visa processing. You only cover actual application or university fees where applicable.",
  },
  {
    question: "Which countries can We help me apply to?",
    answer:
      "We specialise in Malaysia while supporting pathways to the UK, Canada, Australia, and more than 25 global destinations through our partner network.",
  },
  {
    question: "How long does the application process take?",
    answer:
      "Undergraduate applications are typically completed within 4–6 weeks. Fast-track options are available for selected universities once documents are ready.",
  },
  {
    question: "Do you offer scholarship guidance?",
    answer:
      "Absolutely. Our counsellors shortlist scholarships based on your profile, help with documentation, and prepare you for interviews.",
  },
  {
    question: "Can We assist after I receive an offer?",
    answer:
      "Yes. We manage visa submissions, accommodation arrangements, pre-departure briefings, and arrival support to ensure a smooth transition.",
  },
];

const contactHighlights = [
  "Official authorised university representative",
  "Personalised program roadmap based on your interests",
];

const accreditationBadges = [
  { name: "IATA", logo: "/images/l1.png" },
  { name: "NAFSA", logo: "/images/l2.png" },
  { name: "IELTS", logo: "/images/l3.png" },
  { name: "EAQUALS", logo: "/images/l4.png" },
  { name: "ABE", logo: "/images/l5.png" },
];

type ComplianceCategory = {
  id: string;
  title: string;
  icon: LucideIcon;
  count: number;
};

const complianceCategories: ComplianceCategory[] = [
  {
    id: "regional",
    title: "Regional",
    icon: Building2,
    count: 14,
  },
  {
    id: "accounting",
    title: "Accounting",
    icon: TrendingUp,
    count: 26,
  },
  {
    id: "international",
    title: "International",
    icon: Globe2,
    count: 10,
  },
  {
    id: "banking",
    title: "Banking",
    icon: ShieldCheck,
    count: 0,
  },
];

type UniversityLogo = {
  name: string;
  logo: string;
};

const universityLogos: Record<string, UniversityLogo[]> = {
  regional: [
    { name: "University Malaya", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/1.png" },
    { name: "Universiti Kebangsaan Malaysia", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/2.png" },
    { name: "Universiti Sains Malaysia", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/3.png" },
    { name: "Universiti Teknologi Malaysia", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/4.png" },
    { name: "Universiti Putra Malaysia", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/5.png" },
    { name: "Universiti Teknologi MARA", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/6.png" },
    { name: "Universiti Malaysia Sabah", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/7.png" },
    { name: "Universiti Malaysia Sarawak", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/8.png" },
    { name: "Universiti Malaysia Terengganu", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/9.png" },
    { name: "Universiti Malaysia Pahang", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/10.png" },
    { name: "Universiti Malaysia Perlis", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/11.png" },
    { name: "Universiti Sultan Zainal Abidin", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/12.png" },
    { name: "Universiti Malaysia Kelantan", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/13.png" },
    { name: "Universiti Pertahanan Nasional Malaysia", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/14.png" },
  ],
  accounting: [
    { name: "Taylor's University", logo: "/images/logos/taylors.png" },
    { name: "Sunway University", logo: "/images/logos/sunway.png" },
    { name: "Asia Pacific University", logo: "/images/logos/apu.png" },
    { name: "INTI International University", logo: "/images/logos/inti.png" },
    { name: "Universiti Teknologi Petronas", logo: "/images/logos/utp.png" },
    { name: "HELP University", logo: "/images/logos/help.png" },
    { name: "UCSI University", logo: "/images/logos/ucsi.png" },
    { name: "Multimedia University", logo: "/images/logos/mmu.png" },
    { name: "Universiti Tunku Abdul Rahman", logo: "/images/logos/utar.png" },
    { name: "SEGI University", logo: "/images/logos/segi.png" },
    { name: "Management & Science University", logo: "/images/logos/msu.png" },
    { name: "Quest International University", logo: "/images/logos/quest.png" },
    { name: "Universiti Tenaga Nasional", logo: "/images/logos/uniten.png" },
    { name: "Universiti Islam Antarabangsa Malaysia", logo: "/images/logos/uiam.png" },
    { name: "Universiti Tun Hussein Onn Malaysia", logo: "/images/logos/uthm.png" },
    { name: "Universiti Teknikal Malaysia Melaka", logo: "/images/logos/utem.png" },
    { name: "Universiti Malaysia Perlis", logo: "/images/logos/unimap.png" },
    { name: "Universiti Sultan Zainal Abidin", logo: "/images/logos/unisza.png" },
    { name: "Universiti Malaysia Kelantan", logo: "/images/logos/umk.png" },
    { name: "Universiti Pertahanan Nasional Malaysia", logo: "/images/logos/upnm.png" },
    { name: "Universiti Malaysia Terengganu", logo: "/images/logos/umt.png" },
    { name: "Universiti Malaysia Pahang", logo: "/images/logos/ump.png" },
    { name: "Universiti Malaysia Sabah", logo: "/images/logos/ums.png" },
    { name: "Universiti Malaysia Sarawak", logo: "/images/logos/unimas.png" },
    { name: "Universiti Teknologi MARA", logo: "/images/logos/uitm.png" },
  ],
  international: [
    { name: "Monash University Malaysia", logo: "/images/logos/monash.png" },
    { name: "University of Nottingham Malaysia", logo: "/images/logos/nottingham.png" },
    { name: "Swinburne University Sarawak", logo: "/images/logos/swinburne.png" },
    { name: "Heriot-Watt University Malaysia", logo: "/images/logos/heriot-watt.png" },
    { name: "University of Reading Malaysia", logo: "/images/logos/reading.png" },
    { name: "University of Southampton Malaysia", logo: "/images/logos/southampton.png" },
    { name: "Newcastle University Medicine Malaysia", logo: "/images/logos/newcastle.png" },
    { name: "University of Wollongong Malaysia", logo: "/images/logos/uow.png" },
    { name: "Curtin University Malaysia", logo: "/images/logos/curtin.png" },
    { name: "RMIT University Malaysia", logo: "/images/logos/rmit.png" },
  ],
  banking: [],
};

// Shared university categories for forms and compliance section
const universityCategories = {
  government: [
    { name: "University Malaya", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/1.png" },
    { name: "Universiti Kebangsaan Malaysia", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/2.png" },
    { name: "Universiti Sains Malaysia", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/3.png" },
    { name: "Universiti Teknologi Malaysia", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/4.png" },
    { name: "Universiti University Tun Hussien One", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/6.png" },
    { name: "Universiti Tun Hussein Onn Malaysia", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/6.png" },
    { name: "Univeristy Utara malaysia", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/6.png" },
    { name: "Universiti Putra Malaysia", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/5.png" },
    { name: "Universiti Islam Antarabangsa Malaysia", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/6.png" },
    { name: "Universiti Malaysia Sabah", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/7.png" },
    { name: "Universiti Malaysia Sarawak", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/8.png" },
    { name: "Universiti Malaysia Terengganu", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/9.png" },
    { name: "Universiti Malaysia Pahang", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/10.png" },
    { name: "Universiti Malaysia Perlis", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/11.png" },
    { name: "Universiti Sultan Zainal Abidin", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/12.png" },
    { name: "Universiti Malaysia Kelantan", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/13.png" },
    { name: "Universiti Pertahanan Nasional Malaysia", logo: "/images/MALAYSIAN GOVERNMENT UNIVERSITIES/14.png" },
  ],
  private: [
    { name: "Taylor's University", logo: "/images/logos/taylors.png" },
    { name: "Sunway University", logo: "/images/logos/sunway.png" },
    { name: "Asia Pacific University", logo: "/images/logos/apu.png" },
    { name: "INTI International University", logo: "/images/logos/inti.png" },
    { name: "Universiti Teknologi Petronas", logo: "/images/logos/utp.png" },
    { name: "HELP University", logo: "/images/logos/help.png" },
    { name: "UCSI University", logo: "/images/logos/ucsi.png" },
    { name: "Multimedia University", logo: "/images/logos/mmu.png" },
    { name: "Universiti Tunku Abdul Rahman", logo: "/images/logos/utar.png" },
    { name: "SEGI University", logo: "/images/logos/segi.png" },
    { name: "Management & Science University", logo: "/images/logos/msu.png" },
    { name: "Quest International University", logo: "/images/logos/quest.png" },
    { name: "Universiti Tenaga Nasional", logo: "/images/logos/uniten.png" },
    { name: "Universiti Tun Hussein Onn Malaysia", logo: "/images/logos/uthm.png" },
    { name: "Universiti Teknikal Malaysia Melaka", logo: "/images/logos/utem.png" },
    { name: "Universiti Malaysia Perlis", logo: "/images/logos/unimap.png" },
    { name: "Universiti Sultan Zainal Abidin", logo: "/images/logos/unisza.png" },
    { name: "Universiti Malaysia Kelantan", logo: "/images/logos/umk.png" },
    { name: "Universiti Pertahanan Nasional Malaysia", logo: "/images/logos/upnm.png" },
    { name: "Universiti Malaysia Terengganu", logo: "/images/logos/umt.png" },
    { name: "Universiti Malaysia Pahang", logo: "/images/logos/ump.png" },
    { name: "Universiti Malaysia Sabah", logo: "/images/logos/ums.png" },
    { name: "Universiti Malaysia Sarawak", logo: "/images/logos/unimas.png" },
    { name: "Universiti Teknologi MARA", logo: "/images/logos/uitm.png" },

  ],
  international: [
    { name: "Monash University Malaysia", logo: "/images/logos/monash.png" },
    { name: "University of Nottingham Malaysia", logo: "/images/logos/nottingham.png" },
    { name: "Swinburne University Sarawak", logo: "/images/logos/swinburne.png" },
    { name: "Heriot-Watt University Malaysia", logo: "/images/logos/heriot-watt.png" },
    { name: "University of Reading Malaysia", logo: "/images/logos/reading.png" },
    { name: "University of Southampton Malaysia", logo: "/images/logos/southampton.png" },
    { name: "Newcastle University Medicine Malaysia", logo: "/images/logos/newcastle.png" },
    { name: "University of Wollongong Malaysia", logo: "/images/logos/uow.png" },
    { name: "Curtin University Malaysia", logo: "/images/logos/curtin.png" },
    { name: "RMIT University Malaysia", logo: "/images/logos/rmit.png" },
  ],
};

const Index = () => {
  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name =
      (data.get("name") as string | null)?.trim() || "Future Scholar";

    toast.success(
      `Thank you, ${name}! Our counsellors will connect with you within 24 hours.`,
    );

    form.reset();
  };

  return (
    <div className="overflow-hidden bg-background text-foreground">
      <HeroSection />
      <AboutSection />
      <StepsSection />
      <WhySection />
      <CtaSection />
      <FaqSection />
      <ContactSection onSubmit={handleContactSubmit} />
    </div>
  );
};

import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow: string | ReactNode;
  title: string;
  description?: string;
  align?: "left" | "center";
}

const SectionHeader = ({
  eyebrow,
  title,
  align = "left",
}: SectionHeaderProps) => {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
        {title}
      </h2>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pb-10 md:pb-16 pt-16 md:pt-20"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/bg-hero.png')",
        }}
      />
      
      {/* Gradient overlay with reduced opacity to show background image */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-white/20 to-accent/10"
        aria-hidden
      />
      
      {/* Decorative blur elements */}
      <div
        className="absolute -right-24 top-[-180px] z-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute left-1/2 top-10 z-0 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/30 blur-3xl"
        aria-hidden
      />

      <div className="container px-4 sm:px-6">
        {/* Rest of your hero content remains the same */}
        <div className="flex flex-col gap-6 md:gap-8 lg:grid lg:grid-cols-[1fr,1.5fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative max-w-xl md:max-w-none"
          >
            <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl lg:text-[3.4rem] lg:leading-[1.1]">
              Explore academic pathways from Foundation to PhD
            </h1>
            <p className="mt-4 sm:mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground text-justify ">
            Your One-Stop Application Center Globally Recognized and Authorized by Top Universities in Malaysia

            We simplify your entire admission process with fast, smooth, and student-friendly support. From submitting your application to guiding you through every step, we ensure a seamless experience.

            Best of all our services are completely free.
            No visa processing charges, no hidden fees.
            Just simple, reliable, and hassle-free support to help you secure your future.
            </p>

            {/* <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>

            </div> */}

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 56 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-5xl lg:self-start"
          >
            <div className="relative overflow-hidden rounded-2xl md:rounded-[2.5rem] border border-primary/10 bg-white/80 p-6 md:p-8 shadow-2xl shadow-primary/15 backdrop-blur">
              <div
                className="absolute -top-24 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
                aria-hidden 
              />
              <div className="relative">
                {/* <div className="mb-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary">
                    <Award className="h-4 w-4" aria-hidden />
                    Quick Enquiry Form
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-primary">
                    Start Your Journey Today
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Fill out the form below and our counsellors will get back to you within 24 hours.
                  </p>
                </div> */}
                <HeroForm universityCategories={universityCategories} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="container px-6 pb-0 "
    >
      <div className="grid items-center gap-14 lg:grid-cols-2">
        {/* Left side - Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <div
            className="absolute -left-12 top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
            aria-hidden
          />
          <div className="relative overflow-hidden">
            <img
              src="/images/about-image.svg"
              alt="QStudy World - Your Gateway to World-Class Education"
              className="h-auto w-full object-cover"
            />
          </div>
        </motion.div>

        {/* Right side - Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
        <SectionHeader
          eyebrow={
            <span className="inline-flex items-center gap-2 rounded-full bg-[blue-50] px-4 py-1.5 text-sm font-semibold text-[#1b2f57] border border-blue-200">
              <span className="h-2 w-2 rounded-full bg-[#1b2f57]"></span>
              About Us
            </span>
          }
          title="Your personalised gateway to world-class education"
        />


          <div className="mt-8 space-y-4 text-sm text-muted-foreground">
            <p>As Malaysia's largest one-stop application centre, we partner with top institutions to deliver expert counselling and life-changing opportunities.</p>
            <p>
              From foundation to postgraduate studies, we champion your
              aspirations with curated program recommendations, scholarship
              strategies, and interview preparation. Our multilingual
              counsellors provide tailored support that respects your cultural
              background and career goals.
            </p>
            <p>
              We are the official representatives of premier Malaysian
              universities, ensuring direct admissions, accurate information,
              and seamless onboarding for students across the globe.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {contactHighlights.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-3xl border border-primary/15 bg-white/70 p-4 shadow-sm shadow-primary/10"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 text-primary"
                  aria-hidden
                />
                <p className="text-sm font-medium text-primary">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

    </motion.section>
  );
};




const WhySection = () => {
  return (
    <motion.section
      id="why"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="container px-6 py-10"
    >
      <SectionHeader
        eyebrow="Why Choose Us"
        title="Free Premium support that sets you up for success"
        description="We combine official university partnerships, seasoned counsellors, and technology-driven guidance to deliver an unmatched admissions experience."
        align="center"
      />

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {featureHighlights.map((feature) => (
          <motion.div
            key={feature.title}
            whileHover={{ y: -6 }}
            className="group rounded-[2.5rem] border border-primary/10 bg-white/80 p-7 shadow-lg shadow-primary/10 transition"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
              <feature.icon className="h-6 w-6" aria-hidden />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-primary">
              {feature.title}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};



const CtaSection = () => {
  return (
    <motion.section
      id="cta"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative isolate py-10"
    >
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-primary to-primary/80"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black/10 to-transparent"
        aria-hidden
      />
      <div className="container px-6 text-primary-foreground">
        <div className="flex flex-col items-start gap-8 rounded-[2.5rem] border border-white/20 bg-white/10 p-10 shadow-2xl shadow-primary/30 backdrop-blur xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/80">
              Get started today
            </span>
            <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Apply now for a free preocessing & consultation – where every question matters
            </h3>
            <p className="mt-4 text-sm text-primary-foreground/80">
              Confidence from the first enquiry to campus arrival. Let Us
              design your personalised roadmap.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-primary shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:border hover:border-primary"
            >
              Apply Now
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const FaqSection = () => {
  return (
    <motion.section
      id="faq"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="container px-6 py-24"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        {/* Right Side - Heading and Image (shown first on mobile) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="order-1 lg:order-2 lg:pl-8"
        >
          <h3 className="text-4xl font-bold text-primary mb-6">
            Frequently Asked Questions
          </h3>
          <div className="mt-8">
            <img
              src="/images/faq.png"
              alt="FAQ Support"
              className="w-full h-auto object-contain rounded-2xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="hidden items-center justify-center h-64 text-primary/60">
              <GraduationCap className="h-16 w-16" />
            </div>
          </div>
        </motion.div>

        {/* Left Side - FAQ Questions (shown second on mobile) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="order-2 lg:order-1"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                value={`faq-${index}`}
                key={item.question}
                className="rounded-xl border border-primary/10 bg-white/80 px-6 py-4 shadow-lg shadow-primary/5"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-primary hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground mt-2">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </motion.section>
  );
};

interface ContactSectionProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const ContactSection = ({ onSubmit }: ContactSectionProps) => {
  const [phoneCountry, setPhoneCountry] = useState<CountryCode | undefined>("MY");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateContactPhone = (
    value = phone,
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

  const handlePhoneInputChange = (value?: string) => {
    const nextValue = value ?? "";
    setPhone(nextValue);
    if (phoneError) {
      validateContactPhone(nextValue, phoneCountry);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!consent) {
      toast.error("Please agree to the terms and conditions to continue.");
      return;
    }
    
    const phoneValidation = validateContactPhone();
    if (!phoneValidation.isValid) {
      toast.error(phoneValidation.message);
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string)?.trim() || "";
    const email = (formData.get("email") as string)?.trim() || "";
    const message = (formData.get("message") as string)?.trim() || "";

    if (!name || !email || !phone || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://cms-be-a5eg.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          contact: phone,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      toast.success(
        `Thank you, ${name}! Our counsellors will connect with you within 24 hours.`,
      );

      // Reset form
      form.reset();
      setPhoneCountry("MY");
      setPhone("");
      setPhoneError("");
      setConsent(false);
      
      // Call the original onSubmit for any additional handling
      onSubmit(event);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Failed to submit your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-white py-10"
    >
      <div className="container px-6">
        <div className="mx-auto max-w-8xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            {/* Left Side - Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-8"
            >
              <div>
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  WE'RE HERE TO HELP YOU
                </span>
                <h2 className="mt-4 text-4xl font-bold text-gray-900 leading-tight">
                  Discuss Your Study
                  <br />
                  Solution Needs
                </h2>
                <p className="mt-6 text-lg text-gray-600">
                  Are you looking for top-quality education solutions tailored to your needs? 
                  Reach out to us.
                </p>
              </div>

              {/* QR Codes */}
              <div className="flex gap-4">
              <div className="flex flex-col items-center gap-2">
                <img
                  src="/images/qr-1.png"
                  alt="QR Code 1"
                  className="h-40 w-40 transition bg-primary hover:bg-primary/80"
                />
                <p className="text-xs font-medium text-black">
                  Contact Now
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img
                  src="/images/qr-2.png"
                  alt="QR Code 2"
                  className="h-40 w-40 transition bg-primary hover:bg-primary/80"
                />
                <p className="text-xs font-medium text-black">
                  Register Now
                </p>
              </div>
            </div>

            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      type="text"
                      placeholder="Jane Smith"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-colors"
                      style={{
                        '--focus-ring-color': '#1a2e56',
                        '--focus-border-color': '#1a2e56'
                      } as React.CSSProperties}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#1a2e56';
                        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(26, 46, 86, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Phone with Country Flag Selector (same as HeroForm) */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <div
                      className={cn(
                        "w-full rounded-lg border bg-white p-0 shadow-inner focus-within:outline-none focus-within:ring-2",
                        phoneError
                          ? "border-red-500 focus-within:ring-red-400"
                          : "border-gray-300 focus-within:ring-[rgba(26,46,86,0.2)]",
                      )}
                    >
                      <PhoneInput
                        id="phone"
                        name="phone"
                        international
                        defaultCountry="MY"
                        country={phoneCountry}
                        value={phone || undefined}
                        onChange={handlePhoneInputChange}
                        onCountryChange={(country) => {
                          const nextCountry = country ?? undefined;
                          setPhoneCountry(nextCountry);
                          if (phone) {
                            validateContactPhone(phone, nextCountry);
                          }
                        }}
                        onBlur={() => validateContactPhone()}
                        placeholder="Phone Number"
                        required
                        limitMaxLength
                        style={{
                          width: "100%",
                          "--PhoneInput-color--focus": "#1a2e56",
                          "--PhoneInputCountryFlag-borderColor": "transparent",
                          "--PhoneInputCountryFlag-height": "1.5rem",
                          "--PhoneInputCountrySelectArrow-color": "#1a2e56",
                        } as React.CSSProperties}
                        countrySelectComponent={SearchableCountrySelect}
                        className="!border-none !bg-transparent [&>input]:!border-none [&>input]:!bg-transparent [&>input]:!text-gray-900 [&>input]:!text-sm [&>input]:px-4 [&>input]:py-3 [&>input]:!outline-none [&>input]:!ring-0 [&>input]:placeholder:text-gray-400"
                        numberInputProps={{
                          className: "!bg-transparent !border-none !outline-none !ring-0",
                          inputMode: "numeric",
                        }}
                      />
                    </div>
                    {phoneError && (
                      <p className="text-red-500 text-xs mt-1">{phoneError}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-colors"
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#1a2e56';
                        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(26, 46, 86, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Type your message"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-colors resize-none"
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#1a2e56';
                        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(26, 46, 86, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="consent"
                      checked={consent}
                      onCheckedChange={(checked) => setConsent(checked === true)}
                      required
                      className="mt-1"
                    />
                    <label
                      htmlFor="consent"
                      className="text-sm text-gray-700 cursor-pointer leading-relaxed"
                    >
                      I agree to the terms and conditions and privacy policy
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-8 w-full text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 hover:bg-white hover:text-primary hover:border hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    backgroundColor: '#1a2e56'                    
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor = '#fff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor = '#1a2e56';
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <ArrowRight className="h-4 w-4" />
                      Get a Solution
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Index;
