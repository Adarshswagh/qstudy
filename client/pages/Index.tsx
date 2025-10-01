import { type FormEvent } from "react";
import { type FormEvent } from "react";
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
  CheckCircle2,
  Clock,
  Compass,
  Cpu,
  FileCheck2,
  FlaskConical,
  Globe2,
  GraduationCap,
  Languages,
  Map,
  PlaneTakeoff,
  Quote,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import type { LucideIcon } from "lucide-react";

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
    description: "Design innovation across the world’s most advanced industries.",
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
    caption: "Connect with international peers through QStudy exchange pathways.",
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
  "Continuous support from application to arrival",
];

const accreditationBadges = ["IATA", "NAFSA", "IELTS"];

const Index = () => {
  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string | null)?.trim() || "Future Scholar";

    toast.success(
      `Thank you, ${name}! Our counsellors will connect with you within 24 hours.`,
    );

    form.reset();
  };

  return (
    <div className="overflow-hidden bg-background text-foreground">
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <WhySection />
      <SuccessSection />
      <GallerySection />
      <CtaSection />
      <FaqSection />
      <ContactSection onSubmit={handleContactSubmit} />
    </div>
  );
};

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}

const SectionHeader = ({ eyebrow, title, description, align = "left" }: SectionHeaderProps) => {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base text-muted-foreground sm:text-lg">{description}</p>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section id="hero" className="relative overflow-hidden pt-32 pb-28 sm:pt-36">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-white to-accent/20" aria-hidden />
      <div className="absolute -right-24 top-[-180px] -z-10 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" aria-hidden />
      <div className="absolute left-1/2 top-10 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/30 blur-3xl" aria-hidden />

      <div className="container px-6">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr,0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/60 px-4 py-2 text-sm font-medium text-primary shadow-sm shadow-primary/10 backdrop-blur">
              <Sparkles className="h-4 w-4" aria-hidden />
              Study in Malaysia & Beyond
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-[3.4rem] lg:leading-[1.1]">
              Your Largest One-Stop Application Centre
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              QStudy World connects you to globally recognised universities with personalised counselling, transparent planning, and a stress-free application process. Looking to study in Malaysia? <span className="font-semibold text-primary">We make it simple.</span>
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
                  <p className="text-sm font-semibold text-primary">{highlight.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{highlight.description}</p>
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
            <div className="relative overflow-hidden rounded-4xl border border-primary/10 bg-white/80 p-8 shadow-2xl shadow-primary/15 backdrop-blur">
              <div className="absolute -top-24 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" aria-hidden />
              <div className="relative">
                <div className="mb-6 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary">
                    <Award className="h-4 w-4" aria-hidden />
                    Guided Application Blueprint
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    Foundation to PhD
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  {journeySteps.map((step, index) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
                      className="group flex items-start gap-4 rounded-3xl border border-transparent bg-secondary/50 p-4 transition hover:border-primary/30 hover:bg-white"
                    >
                      <div className="mt-1 grid h-10 w-10 place-items-center rounded-2xl bg-primary/15 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                        <step.icon className="h-5 w-5" aria-hidden />
                      </div>
                      <div>
                        <p className="font-semibold text-primary">{step.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
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
      className="container px-6 pb-20"
    >
      <div className="grid gap-14 lg:grid-cols-[1.05fr,0.95fr]">
        <div>
          <SectionHeader
            eyebrow="About QStudy"
            title="Your personalised gateway to world-class education"
            description="QStudy World is dedicated to guiding ambitious students through every stage of their international education journey. As Malaysia’s largest one-stop application centre, we partner with top institutions to deliver expert counselling and life-changing opportunities."
          />

          <div className="mt-8 space-y-4 text-sm text-muted-foreground">
            <p>
              From foundation to postgraduate studies, we champion your aspirations with curated program recommendations, scholarship strategies, and interview preparation. Our multilingual counsellors provide tailored support that respects your cultural background and career goals.
            </p>
            <p>
              We are the official representatives of premier Malaysian universities, ensuring direct admissions, accurate information, and seamless onboarding for students across the globe.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {contactHighlights.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-3xl border border-primary/15 bg-white/70 p-4 shadow-sm shadow-primary/10"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" aria-hidden />
                <p className="text-sm font-medium text-primary">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-12 top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" aria-hidden />
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-5">
              <div className="rounded-4xl border border-primary/10 bg-white/80 p-6 shadow-xl shadow-primary/15">
                <h3 className="text-3xl font-bold text-primary">2000+</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Students successfully enrolled across Malaysia, the UK, Canada, Australia, and beyond.
                </p>
              </div>
              <div className="rounded-4xl border border-primary/10 bg-accent/60 p-6 shadow-xl shadow-primary/20">
                <h3 className="text-lg font-semibold text-primary">
                  End-to-End Support
                </h3>
                <p className="mt-2 text-sm text-primary">
                  Professional counsellors assist with documentation, visa processing, and pre-departure preparation.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="rounded-4xl border border-primary/10 bg-primary text-primary-foreground p-6 shadow-2xl shadow-primary/25">
                <h3 className="text-lg font-semibold">Official Representation</h3>
                <p className="mt-2 text-sm text-primary-foreground/80">
                  Direct partnerships with Malaysia’s leading government and private universities.
                </p>
              </div>
              <div className="rounded-4xl border border-primary/5 bg-white/90 p-6 shadow-xl shadow-primary/10">
                <h3 className="text-lg font-semibold text-primary">Career & Interests Test</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Register for a free diagnostic to uncover programs that fit your passion and future goals.
                </p>
                <a
                  href="#contact"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:translate-x-1"
                >
                  Take the free test
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className="mt-16 rounded-4xl border border-primary/10 bg-white/80 p-8 shadow-xl shadow-primary/10"
      >
        <h3 className="text-xl font-semibold text-primary">
          Official representation of leading Malaysian universities
        </h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Gain exclusive access to admissions from Malaysia’s top government and private institutions, plus globally recognised foreign branch campuses.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {representationGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-3xl border border-primary/10 bg-secondary/40 p-6 shadow-sm shadow-primary/5"
            >
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                {group.title}
              </h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <ScrollText className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-medium text-primary/80">
                +100 universities around the globe
              </p>
            </div>
          ))}
        </div>
      </motion.div>
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
              className="flex h-full flex-col rounded-4xl border border-primary/10 bg-white/80 p-8 shadow-xl shadow-primary/10 transition"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <program.icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-primary">{program.category}</h3>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{program.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {program.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden />
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
            className="group rounded-4xl border border-primary/10 bg-white/80 p-7 shadow-lg shadow-primary/10 transition"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
              <feature.icon className="h-6 w-6" aria-hidden />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-primary">{feature.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{feature.description}</p>
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
                  <p className="text-3xl font-bold text-primary">{metric.value}</p>
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
                className="relative overflow-hidden rounded-4xl border border-primary/10 bg-white p-7 shadow-xl shadow-primary/10"
              >
                <div className="absolute -right-8 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-3xl" aria-hidden />
                <Quote className="h-6 w-6 text-primary" aria-hidden />
                <p className="mt-4 text-sm text-muted-foreground">
                  “{testimonial.quote}”
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-base font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                      {testimonial.program}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" aria-hidden />
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

const GallerySection = () => {
  return (
    <motion.section
      id="gallery"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="container px-6 py-24"
    >
      <SectionHeader
        eyebrow="Campus Life"
        title="A glimpse into the QStudy experience"
        description="From immersive orientation sessions to global networking events, QStudy students thrive in dynamic and supportive environments."
        align="center"
      />

      <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {galleryShowcase.map((card) => (
          <motion.div
            key={card.title}
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-4xl border border-primary/10 bg-white/90 p-6 shadow-xl shadow-primary/10"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.accent}`}
              aria-hidden
            />
            <div className="relative flex h-full flex-col justify-between">
              <h3 className="text-lg font-semibold text-primary">{card.title}</h3>
              <p className="mt-4 text-sm text-muted-foreground">{card.caption}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Discover More
                <ArrowRight className="h-4 w-4" aria-hidden />
              </div>
            </div>
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
      className="relative isolate py-24"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary to-primary/80" aria-hidden />
      <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black/10 to-transparent" aria-hidden />
      <div className="container px-6 text-primary-foreground">
        <div className="flex flex-col items-start gap-8 rounded-4xl border border-white/20 bg-white/10 p-10 shadow-2xl shadow-primary/30 backdrop-blur xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/80">
              Get started today
            </span>
            <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Apply now for a free consultation – where every question matters
            </h3>
            <p className="mt-4 text-sm text-primary-foreground/80">
              Confidence from the first enquiry to campus arrival. Let QStudy design your personalised roadmap.
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
      <SectionHeader
        eyebrow="Frequently Asked Questions"
        title="Everything you need to know before you begin"
        description="Our counsellors are available in English, Malay, Arabic, Mandarin, Tamil, Hindi, Russian, Uzbek, Thai, and more to support you around the clock."
        align="center"
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr,1.1fr]">
        <div className="rounded-4xl border border-primary/10 bg-white/80 p-8 shadow-xl shadow-primary/10">
          <h3 className="text-lg font-semibold text-primary">Not sure where to start?</h3>
          <p className="mt-4 text-sm text-muted-foreground">
            Register now for a free Career & Interests Test to uncover the programs and destinations that align with your strengths. Our counsellors are available 24/7 to answer your questions in your preferred language.
          </p>
          <div className="mt-6 space-y-3 text-sm text-muted-foreground">
            <p className="font-semibold text-primary">Counsellors are available:</p>
            <p>
              لك متاح • األكاديمي مستشارنا • Консультанты доступны • Maslahatchilar doim aloqada • का उंसलर उपलब्ध हैं • کنسلرز دستیاب ہیں • ஆலோசகர்கள் கிடைக்கின்றனர் • Les conseillers sont disponibles • Kaunselor tersedia • มีที่ปรึกษาพร้อมให้บริการ • 顾问可供咨询
            </p>
          </div>
          <a
            href="#contact"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:translate-x-1"
          >
            Register for the free test
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
        <div className="rounded-4xl border border-primary/10 bg-white/80 p-6 shadow-xl shadow-primary/10">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                value={`faq-${index}`}
                key={item.question}
                className="rounded-3xl border border-primary/10 bg-secondary/40 px-4"
              >
                <AccordionTrigger className="text-left text-sm font-semibold text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
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
      className="bg-gradient-to-b from-primary/5 to-white py-24"
    >
      <div className="container px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
          <div className="rounded-4xl border border-primary/10 bg-white/80 p-8 shadow-xl shadow-primary/10">
            <SectionHeader
              eyebrow="Contact"
              title="Get your personalised admission consultation"
              description="Speak with a QStudy counsellor for detailed program information, scholarships, and visa support tailored to your aspirations."
            />

            <div className="mt-8 space-y-4 text-sm text-muted-foreground">
              <p>Whatsapp / Call: <a href="tel:+60125037122" className="font-semibold text-primary">+6012-503 7122</a></p>
              <p>Email: <a href="mailto:info@qstudyworld.com" className="font-semibold text-primary">info@qstudyworld.com</a></p>
              <p>Website: <a href="https://www.qstudyworld.com" className="font-semibold text-primary">www.qstudyworld.com</a></p>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-4xl border border-primary/10 bg-white p-8 shadow-2xl shadow-primary/10"
          >
            <h3 className="text-lg font-semibold text-primary">Enquiry Form</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Complete the form and our counsellors will respond with curated options within 24 hours.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  type="text"
                  placeholder="Enter your full name"
                  className="mt-3 w-full rounded-3xl border border-primary/20 bg-secondary/40 px-4 py-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="mt-3 w-full rounded-3xl border border-primary/20 bg-secondary/40 px-4 py-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                  Phone / WhatsApp
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="e.g., +60 12 345 6789"
                  className="mt-3 w-full rounded-3xl border border-primary/20 bg-secondary/40 px-4 py-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="destination" className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                  Preferred Destination
                </label>
                <select
                  id="destination"
                  name="destination"
                  className="mt-3 w-full rounded-3xl border border-primary/20 bg-secondary/40 px-4 py-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  defaultValue="Malaysia"
                >
                  <option value="Malaysia">Malaysia</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Other">Other Destination</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                  Tell us about your goals
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Share your desired program, intake, and any questions for our counsellors."
                  className="mt-3 w-full rounded-3xl border border-primary/20 bg-secondary/40 px-4 py-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Submit Enquiry
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default Index;
