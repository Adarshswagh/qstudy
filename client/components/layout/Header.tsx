"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Using public folder path for Next.js
const logo = '/images/logo.svg';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 shadow-lg shadow-primary/5 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="container px-4 sm:px-6">
        {/* Desktop/Tablet Layout: Logo + Text (left) | Button (right) */}
        <div className="hidden md:flex items-center justify-between py-3">
          <div className="flex items-center gap-5 md:gap-4 lg:gap-40 flex-1 min-w-0">
            <Link
              href="/"
              className="flex items-center gap-3 flex-shrink-0"
              aria-label="QStudy home"
            >
              <div className="h-auto w-auto">
                <Image
                  src={logo}
                  alt="QStudy Logo"
                  width={150}
                  height={180}
                  className=""
                  priority
                />
              </div>
            </Link>

            <div className=" md:text-lg lg:text-xl xl:text-3xl font-medium uppercase text-muted-foreground text-center">
              One Stop Study In Malaysia Application Centre
            </div>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <a
              href="#contact"
              className="rounded-full bg-primary px-4 md:px-5 py-2 text-xs md:text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-white hover:text-primary hover:border hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary whitespace-nowrap"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Mobile Layout: Logo (left) | Text (right) */}
        <div className="flex md:hidden items-center justify-between gap-0 py-2 sm:py-3 ">
          <Link
            href="/"
            className="flex items-center gap-2 flex-shrink-0"
            aria-label="QStudy home"
          >
            <div className="h-auto w-auto">
              <Image
                src={logo}
                alt="QStudy Logo"
                width={80}
                height={96}
                className=""
                priority
              />
            </div>
          </Link>

          <div className="flex-1 min-w-0 text-right">
            <div className="text-[20px] sm:text-md font-medium uppercase text-muted-foreground leading-tight text-end">
              One Stop Study In Malaysia Application Centre
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
