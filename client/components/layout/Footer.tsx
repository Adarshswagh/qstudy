export const Footer = () => {
  return (
    <footer className="relative bg-primary text-primary-foreground">
      <div className="absolute inset-0 bg-blue-300" />
      <div className="relative">


        <div className="border-t border-black">
          <div className="container flex flex-col items-center justify-between gap-4 px-6 py-6 text-md text-primary sm:flex-row">
            <p>
              © {new Date().getFullYear()} powered by Q Study Sdn Bhd
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
