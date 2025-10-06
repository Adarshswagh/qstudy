"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowUp, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface FloatingActionButtonsProps {
  whatsappNumber?: string;
  phoneNumber?: string;
}

export const FloatingActionButtons = ({ 
  whatsappNumber = "+60123456789", 
  phoneNumber = "+60123456789" 
}: FloatingActionButtonsProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello! I'm interested in your programs. Can you provide more information?");
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  return (
    <div className="fixed bottom-6 left-4 right-4 z-50 flex justify-between items-end pointer-events-none">
      {/* Left side - WhatsApp button */}
      <div className="pointer-events-auto">
        <motion.button
          onClick={handleWhatsApp}
          className={cn(
            "group relative flex items-center justify-center",
            "h-16 w-16 rounded-full  transition-all duration-300",
            "bg-transparent  active:scale-95",
            "sm:h-18 sm:w-18"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Contact us on WhatsApp"
        >
          {/* Display the image directly without background */}
          <div className="relative w-12 h-12 sm:w-16 sm:h-16">
            <Image
              src="/images/social.png"
              alt="WhatsApp"
              fill
              className="object-contain"
              onError={(e) => {
                // Hide image and show fallback icon
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            {/* Fallback icon if image doesn't load */}
            <div className="hidden items-center justify-center w-full h-full text-green-500">
              <MessageCircle className="w-8 h-8 sm:w-12 sm:h-12" />
            </div>
          </div>
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 hidden group-hover:block">
            <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
              WhatsApp Us
              <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
            </div>
          </div>
        </motion.button>
      </div>

      {/* Right side - Call button and Go to Top button */}
      <div className="flex flex-col gap-3 pointer-events-auto">
        {/* Call Button */}
        <motion.button
          onClick={handleCall}
          className={cn(
            "group relative flex items-center justify-center",
            "h-14 w-14 rounded-full shadow-lg transition-all duration-300",
            "bg-blue-500 hover:bg-blue-600 active:scale-95",
            "focus:outline-none focus:ring-4 focus:ring-blue-500/30",
            "sm:h-16 sm:w-16"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Call us"
        >
          <Phone className="h-6 w-6 text-white sm:h-7 sm:w-7" />
          
          {/* Tooltip */}
          <div className="absolute left-full ml-3 hidden group-hover:block">
            <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
              Call Us
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
            </div>
          </div>
        </motion.button>

        {/* Go to Top button */}
        <AnimatePresence>
          {isVisible && (
            <motion.button
              onClick={scrollToTop}
              className={cn(
                "group relative flex items-center justify-center",
                "h-14 w-14 rounded-full shadow-lg transition-all duration-300",
                "bg-primary hover:bg-primary/90 active:scale-95",
                "focus:outline-none focus:ring-4 focus:ring-primary/30",
                "sm:h-16 sm:w-16"
              )}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-6 w-6 text-white sm:h-7 sm:w-7" />
              
              {/* Tooltip */}
              <div className="absolute left-full ml-3 hidden group-hover:block">
                <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
                  Back to Top
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                </div>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
