export const Footer = () => {
  return (
    <footer className="relative bg-primary text-primary-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent)]" />
      <div className="relative">
        <div className="container px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center">
              <img
                src="/images/logo_footer.png"
                alt="QStudy World Logo"
                className="h-[70px] w-25"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-2">
                <img
                  src="/images/qr-1.png"
                  alt="QR Code 1"
                  className="h-32 w-32 transition hover:bg-white/20"
                />
                <p className="text-xs font-medium text-primary-foreground/90">
                  Contact Now
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img
                  src="/images/qr-2.png"
                  alt="QR Code 2"
                  className="h-32 w-32 transition hover:bg-white/20"
                />
                <p className="text-xs font-medium text-primary-foreground/90">
                  Register Now
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20">
          <div className="container flex flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-primary-foreground/80 sm:flex-row">
            <p>
              © {new Date().getFullYear()} QStudy World. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="/privacy-policy" className="transition hover:text-white">
                Privacy Policy
              </a>
              <a href="/terms-and-conditions" className="transition hover:text-white">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
