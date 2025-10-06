import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Why QStudy", href: "#why" },
  { label: "Success Stories", href: "#success" },
  { label: "FAQs", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/qstudy_world",
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/qstudyworld",
    icon: Facebook,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/q-study-world/",
    icon: Linkedin,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@qstudyworld",
    icon: Youtube,
  },
];

export const Footer = () => {
  return (
    <footer className="relative bg-primary text-primary-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent)]" />
      <div className="relative">
        <div className="container px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-4">
            <div className="space-y-5">
              <div className="inline-flex items-center">
                <img
                  src="/images/logo_footer.png"
                  alt="QStudy World Logo"
                  className="h-[70px] w-25"
                />

              </div>
              <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/80">
                Empowering students with personalised guidance, seamless
                applications, and end-to-end support for global education
                journeys.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4" aria-hidden />
                  <a
                    href="tel:+60125037122"
                    className="transition hover:text-white"
                  >
                    +6012-503 7122
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4" aria-hidden />
                  <a
                    href="mailto:info@qstudyworld.com"
                    className="transition hover:text-white"
                  >
                    info@qstudyworld.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4" aria-hidden />
                  <span>QStudy World HQ, Kuala Lumpur, Malaysia</span>
                </div>
              </div>
            </div>

            <div className="grid gap-3 text-sm font-medium sm:grid-cols-2 lg:col-span-2">
              <div>
                <p className="text-base font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
                  Quick Links
                </p>
                <div className="mt-4 flex flex-col gap-3 text-primary-foreground/80">
                  {quickLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="transition hover:text-white"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-base font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
                  Services
                </p>
                <div className="mt-4 flex flex-col gap-3 text-primary-foreground/80">
                  <span>Free Admission Consultation</span>
                  <span>Scholarship Advisory</span>
                  <span>Visa & Pre-Departure Support</span>
                  <span>Career & Interests Testing</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-base font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
                Stay Connected
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground transition hover:bg-white hover:text-primary"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </a>
                ))}
              </div>
              <p className="text-xs text-primary-foreground/70">
                Follow QStudy World for campus updates, scholarship news, and
                student success stories.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20">
          <div className="container flex flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-primary-foreground/80 sm:flex-row">
            <p>
              © {new Date().getFullYear()} QStudy World. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#hero" className="transition hover:text-white">
                Privacy Policy
              </a>
              <a href="#hero" className="transition hover:text-white">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
