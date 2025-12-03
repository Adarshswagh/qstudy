export const Footer = () => {
  return (
    <footer className="relative bg-primary text-primary-foreground">
      <div className="absolute inset-0 bg-blue-300" />
      <div className="relative">
        <div className="container px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center">
              <img
                src="/images/logo.svg"
                alt="QStudy World Logo"
                className="h-[70px] w-25"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-2">
                <img
                  src="/images/qr-1.png"
                  alt="QR Code 1"
                  className="h-32 w-32 transition bg-primary hover:bg-primary/80"
                />
                <p className="text-xs font-medium text-black">
                  Contact Now
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img
                  src="/images/qr-2.png"
                  alt="QR Code 2"
                  className="h-32 w-32 transition bg-primary hover:bg-primary/80"
                />
                <p className="text-xs font-medium text-black">
                  Register Now
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-black">
          <div className="container flex flex-col items-center justify-between gap-4 px-6 py-6 text-md text-primary sm:flex-row">
            <p>
              © {new Date().getFullYear()} QStudy World. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="/privacy-policy" className="transition text-primary text-md hover:text-primary/80">
                Privacy Policy
              </a>
              <a href="/terms-and-conditions" className="transition text-primary text-md hover:text-primary/80">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
