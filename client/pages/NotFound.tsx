import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <section className="container px-6 py-24">
      <div className="mx-auto max-w-xl rounded-[2.5rem] border border-primary/15 bg-white/80 p-10 text-center shadow-xl shadow-primary/10">
        <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-secondary/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
          <span aria-hidden>Oops</span>
          <span className="text-primary/70">404</span>
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-primary">
          Page not found
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you are looking for may have been moved or no longer exists.
          Return to the QStudy homepage to continue exploring programs and
          services.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:bg-primary/90"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
