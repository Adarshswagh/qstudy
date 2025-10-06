"use client";
import { type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  CheckCircle2,
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
import ContactForm from "@/components/ContactForm";



const heroHighlights = [
  {
    title: "Proven Success",
    description: "Trusted by over 2000+ students worldwide.",
  },
  {
    title: "One-Stop Application Centre",
    description: "From choosing your course to visa assistance.",
  },
  {
    title: "Free Admission Service",
    description: "Zero application fees with end-to-end support.",
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
  },
  {
    category: "Engineering & Technology",
    description:
      "Design innovation across the world’s most advanced industries.",
    icon: Cpu,
    highlights: [
      "Software Engineering",
      "Aerospace Engineering",
      "Civil & Structural",
      "Data Science",
      "Telecommunication",
    ],
  },
  {
    category: "Education & Social Sciences",
    description: "Shape communities through knowledge, culture, and policy.",
    icon: GraduationCap,
    highlights: [
      "Psychology",
      "Education",
      "Media & Communication",
      "Political Science",
      "Guidance & Counselling",
    ],
  },
  {
    category: "Science, Health & Environment",
    description: "Advance global wellbeing through scientific breakthroughs.",
    icon: FlaskConical,
    highlights: [
      "Biomedical Science",
      "Pharmaceutical Science",
      "Nutrition & Dietetics",
      "Environmental Science",
      "MBBS & Nursing",
    ],
  },
  {
    category: "Religion & Languages",
    description: "Connect cultures with multilingual and ethical expertise.",
    icon: Languages,
    highlights: [
      "Islamic Finance",
      "Arabic & Malay Studies",
      "Chinese & Japanese",
      "English Language & Literature",
      "Halal Industry",
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

const testimonials: Testimonial[] = [
  {
    name: "Aisha Rahman",
    program: "MBBS, University of Malaya",
    placement: "Malaysia",
    quote:
      "QStudy made my dream of studying medicine come true. From scholarship advice to visa approval, every detail was handled with care.",
  },
  {
    name: "Daniel James",
    program: "Data Science, Monash University Malaysia",
    placement: "Australia Pathway",
    quote:
      "The counsellors understood my goals and mapped a clear path from foundation to postgraduate studies across Malaysia and Australia.",
  },
  {
    name: "Nurul Hana",
    program: "International Business, Taylor's University",
    placement: "Global Mobility",
    quote:
      "I loved the personalised guidance and interview prep sessions. Today I’m interning with a multinational in Kuala Lumpur thanks to QStudy.",
  },
];

const successMetrics = [
  { value: "2000+", label: "Students enrolled worldwide" },
  { value: "100%", label: "Free admission consultation" },
  { value: "24/7", label: "Multilingual counsellor support" },
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
      "Yes. QStudy provides 100% free admission consultation from course selection to visa processing. You only cover actual application or university fees where applicable.",
  },
  {
    question: "Which countries can QStudy help me apply to?",
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
    question: "Can QStudy assist after I receive an offer?",
    answer:
      "Yes. We manage visa submissions, accommodation arrangements, pre-departure briefings, and arrival support to ensure a smooth transition.",
  },
];

const contactHighlights = [
  "Official authorised university representative",
  "Personalised program roadmap based on your interests",
];

const accreditationBadges = ["IATA", "NAFSA", "IELTS"];

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
    { name: "HELP University", logo: "/images/logos/help.png" },
    { name: "UCSI University", logo: "/images/logos/ucsi.png" },
    { name: "Multimedia University", logo: "/images/logos/mmu.png" },
    { name: "Universiti Tunku Abdul Rahman", logo: "/images/logos/utar.png" },
    { name: "SEGI University", logo: "/images/logos/segi.png" },
    { name: "Management & Science University", logo: "/images/logos/msu.png" },
    { name: "Limkokwing University", logo: "/images/logos/limkokwing.png" },
    { name: "Quest International University", logo: "/images/logos/quest.png" },
    { name: "Universiti Tenaga Nasional", logo: "/images/logos/uniten.png" },
    { name: "Universiti Teknologi Petronas", logo: "/images/logos/utp.png" },
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
      <ComplianceSection />
      <ProgramsSection />
      <WhySection />
      <SuccessSection />

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
  description: string;
  align?: "left" | "center";
}

const SectionHeader = ({
  eyebrow,
  title,
  description,
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
      <p className="mt-4 text-base text-muted-foreground sm:text-lg">
        {description}
      </p>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pb-20 pt-16"
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

      <div className="container px-6">
        {/* Rest of your hero content remains the same */}
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr,0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            {/* Your hero content */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/60 px-4 py-2 text-sm font-medium text-primary shadow-sm shadow-primary/10 backdrop-blur">
              <Sparkles className="h-4 w-4" aria-hidden />
              Study in Malaysia & Beyond
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-[3.4rem] lg:leading-[1.1]">
              Your Largest One-Stop Application Centre
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              QStudy World connects you to globally recognised universities with
              personalised counselling, transparent planning, and a stress-free
              application process. Looking to study in Malaysia?{" "}
              <span className="font-semibold text-primary">
                We make it simple.
              </span>
            </p>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="#programs"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-white/80 px-8 py-3 text-sm font-semibold text-primary shadow-lg shadow-primary/5 transition hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                Explore Programs
              </a>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {heroHighlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="rounded-3xl border border-primary/15 bg-white/70 p-5 shadow-lg shadow-primary/10 backdrop-blur-sm"
                >
                  <p className="text-sm font-semibold text-primary">
                    {highlight.title}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4 text-xs font-semibold tracking-[0.4em] text-muted-foreground">
              {accreditationBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-border/80 bg-white/80 px-4 py-2 text-[11px] shadow-sm shadow-primary/5"
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 56 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/10 bg-white/80 p-8 shadow-2xl shadow-primary/15 backdrop-blur">
              <div
                className="absolute -top-24 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
                aria-hidden
              />
              <div className="relative">
                <div className="mb-6">
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
                </div>
                <ContactForm />
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
      className="container px-6 pb-20 pt-10"
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
              About QStudy
            </span>
          }
          title="Your personalised gateway to world-class education"
          description="QStudy World is dedicated to guiding ambitious students through every stage of their international education journey. As Malaysia's largest one-stop application centre, we partner with top institutions to deliver expert counselling and life-changing opportunities."
        />


          <div className="mt-8 space-y-4 text-sm text-muted-foreground">
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

const ComplianceSection = () => {
  const [activeCategory, setActiveCategory] = useState("government");

  const universityCategories = {
    government: [
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
    private: [
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/1.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/2.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/3.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/4.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/5.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/6.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/7.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/8.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/9.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/10.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/11.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/12.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/13.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/14.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/15.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/16.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/17.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/18.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/19.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/20.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/21.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/22.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/23.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/24.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/25.png" },
      { name: "University Malaya", logo: "/images/MALAYSIAN PRIVATE UNIVERSITIES/26.png" },
  
    ],
    international: [
      { name: "University Malaya", logo: "/images/FOREIGN BRANCH CAMPUSES IN MALAYSIA/1.png" }, 
      { name: "University Malaya", logo: "/images/FOREIGN BRANCH CAMPUSES IN MALAYSIA/2.png" }, 
      { name: "University Malaya", logo: "/images/FOREIGN BRANCH CAMPUSES IN MALAYSIA/3.png" }, 
      { name: "University Malaya", logo: "/images/FOREIGN BRANCH CAMPUSES IN MALAYSIA/4.png" }, 
      { name: "University Malaya", logo: "/images/FOREIGN BRANCH CAMPUSES IN MALAYSIA/5.png" }, 
      { name: "University Malaya", logo: "/images/FOREIGN BRANCH CAMPUSES IN MALAYSIA/6.png" }, 
      { name: "University Malaya", logo: "/images/FOREIGN BRANCH CAMPUSES IN MALAYSIA/7.png" }, 
      { name: "University Malaya", logo: "/images/FOREIGN BRANCH CAMPUSES IN MALAYSIA/8.png" }, 
      { name: "University Malaya", logo: "/images/FOREIGN BRANCH CAMPUSES IN MALAYSIA/9.png" }, 
      { name: "University Malaya", logo: "/images/FOREIGN BRANCH CAMPUSES IN MALAYSIA/10.png" }, 
      ]
  };

  const getCategoryTitle = (categoryId: string) => {
    switch (categoryId) {
      case "government":
        return "Malaysian Government Universities";
      case "private":
        return "Malaysian Private Universities";
      case "international":
        return "Foreign Branch Campuses in Malaysia";
      default:
        return "";
    }
  };

  const getCategoryDescription = (categoryId: string) => {
    switch (categoryId) {
      case "government":
        return "Partner with Malaysia's top government universities for world-class education and research opportunities.";
      case "private":
        return "Explore diverse programs at Malaysia's leading private universities with flexible learning pathways.";
      case "international":
        return "Study at globally recognized foreign branch campuses offering international degrees in Malaysia.";
      default:
        return "";
    }
  };

  return (
    <motion.section
      id="compliance"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative bg-[#1b2f57] py-24"
    >
      <div className="container px-6">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Top Universities in Malaysia
          </h2>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mt-12 flex justify-center"
        >
          <div className="flex gap-2">
            {[
              { id: "government", label: "Government Universities" },
              { id: "private", label: "Private Universities" },
              { id: "international", label: "Foreign Universities" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`rounded-lg px-6 py-3 text-sm font-medium transition-all duration-300 ${
                  activeCategory === tab.id
                    ? "bg-white text-[#1b2f57]"
                    : "border border-white text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-8 text-center"
        >
          <p className="text-lg text-white/90 max-w-4xl mx-auto">
            {getCategoryDescription(activeCategory)}
          </p>
        </motion.div>

        {/* University Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
        >
          {universityCategories[activeCategory as keyof typeof universityCategories]?.map((university, index) => (
            <motion.div
              key={university.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: index * 0.05,
              }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="bg-gray-100 rounded-lg p-4 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              {/* University Logo */}
              <div className=" rounded-lg p-3 mb-3 flex items-center justify-center h-18">
                <img
                  src={university.logo}
                  alt={`${university.name} logo`}
                  className="max-h-[130px] max-w-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="hidden h-10 w-10 items-center justify-center rounded bg-[#1b2f57]/10 text-[#1b2f57]">
                  <GraduationCap className="h-5 w-5" />
                </div>
              </div>

              {/* University Name */}
              <h3 className="text-sm font-bold text-[#1b2f57] leading-tight text-center">
                {university.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
};

const ProgramsSection = () => {
  return (
    <motion.section
      id="programs"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-gradient-to-b from-white via-white to-primary/5 py-24"
    >
      <div className="container px-6">
        <SectionHeader
          eyebrow="Programs & Courses"
          title="Explore academic pathways from Foundation to PhD"
          description="Discover curated programs across Business, Engineering, Health Sciences, Education, Languages, and more. QStudy ensures every application aligns with your strengths and future ambitions."
          align="center"
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {programCatalog.map((program) => (
            <motion.div
              key={program.category}
              whileHover={{ y: -8 }}
              className="flex h-full flex-col rounded-[2.5rem] border border-primary/10 bg-white/80 p-8 shadow-xl shadow-primary/10 transition"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <program.icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-primary">
                  {program.category}
                </h3>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {program.description}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {program.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2">
                    <CheckCircle2
                      className="h-4 w-4 text-primary"
                      aria-hidden
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:translate-x-1"
              >
                Request personalised roadmap
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </motion.div>
          ))}
        </div>
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
      className="container px-6 py-24"
    >
      <SectionHeader
        eyebrow="Why Choose QStudy"
        title="Premium support that sets you up for success"
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

const SuccessSection = () => {
  return (
    <motion.section
      id="success"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-primary/5 py-24"
    >
      <div className="container px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Success Stories"
              title="Real students. Real outcomes."
              description="Hear from the scholars who trusted QStudy with their future and gained admission into globally recognised universities."
            />

            <div className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-5">
              {successMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-3xl border border-primary/10 bg-white/80 p-6 text-center shadow-lg shadow-primary/10"
                >
                  <p className="text-3xl font-bold text-primary">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.name}
                whileHover={{ y: -6 }}
                className="relative overflow-hidden rounded-[2.5rem] border border-primary/10 bg-white p-7 shadow-xl shadow-primary/10"
              >
                <div
                  className="absolute -right-8 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-3xl"
                  aria-hidden
                />
                <Quote className="h-6 w-6 text-primary" aria-hidden />
                <p className="mt-4 text-sm text-muted-foreground">
                  “{testimonial.quote}”
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-base font-semibold text-primary">
                      {testimonial.name}
                    </p>
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                      {testimonial.program}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className="h-4 w-4 fill-current"
                        aria-hidden
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">
                  {testimonial.placement}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
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
      className="relative isolate py-24"
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
              Apply now for a free consultation – where every question matters
            </h3>
            <p className="mt-4 text-sm text-primary-foreground/80">
              Confidence from the first enquiry to campus arrival. Let QStudy
              design your personalised roadmap.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-primary shadow-lg shadow-primary/30 transition hover:-translate-y-0.5"
            >
              Book Consultation
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="#faq"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:border-white"
            >
              Read FAQs
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
        {/* Left Side - FAQ Questions */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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

        {/* Right Side - Heading and Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="lg:pl-8"
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
      </div>
    </motion.section>
  );
};

interface ContactSectionProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const ContactSection = ({ onSubmit }: ContactSectionProps) => {
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

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6" style={{ color: '#1a2e56' }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">E-mail</p>
                    <a
                      href="mailto:info@qstudyworld.com"
                      className="text-lg font-semibold text-gray-900 transition-colors"
                      style={{ '--hover-color': '#1a2e56' } as React.CSSProperties}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#1a2e56'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#111827'}
                    >
                      info@qstudyworld.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6" style={{ color: '#1a2e56' }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone number</p>
                    <a
                      href="tel:+60125037122"
                      className="text-lg font-semibold text-gray-900 transition-colors"
                      onMouseEnter={(e) => e.currentTarget.style.color = '#1a2e56'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#111827'}
                    >
                      +6012-503 7122
                    </a>
                  </div>
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
                onSubmit={onSubmit}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="space-y-6">
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

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jane@framer.com"
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

                  <div>
                    <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                      Industry
                    </label>
                    <select
                      id="destination"
                      name="destination"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-colors"
                      defaultValue=""
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#1a2e56';
                        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(26, 46, 86, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <option value="">Select...</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Other">Other Destination</option>
                    </select>
                  </div>

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
                </div>

                <button
                  type="submit"
                  className="mt-8 w-full text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  style={{ 
                    backgroundColor: '#1a2e56',
                    '--hover-bg': '#153048'
                  } as React.CSSProperties}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#153048'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1a2e56'}
                >
                  <ArrowRight className="h-4 w-4" />
                  Get a Solution
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
