"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Map,
  PlaneTakeoff,
  Wallet,
  Compass,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type JourneyStep = {
  title: string;
  description: string;
  icon: LucideIcon;
  stepNumber: number;
};

const journeySteps: JourneyStep[] = [
  {
    title: "Explore Your Options",
    description:
      "Choose from top universities in Malaysia, UK, Canada, Australia & more. Programs from Foundation to PhD.",
    icon: Compass,
    stepNumber: 1,
  },
  {
    title: "Plan Your Finances",
    description:
      "Get clear info on tuition, living costs, and available scholarships.",
    icon: Wallet,
    stepNumber: 2,
  },
  {
    title: "Complete Your Application",
    description:
      "We guide you through documents, personal statement & submission.",
    icon: FileCheck2,
    stepNumber: 3,
  },
  {
    title: "Apply for Your Visa",
    description:
      "Step-by-step support for visa documents, requirements & interview.",
    icon: PlaneTakeoff,
    stepNumber: 4,
  },
  {
    title: "Prepare for Your Journey",
    description:
      "Flights, accommodation & pre-departure briefing for a smooth start.",
    icon: Map,
    stepNumber: 5,
  },
];

const StepsSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView && !isAnimating) {
      setIsAnimating(true);
      startAnimationSequence();
    }
  }, [isInView]);

  const startAnimationSequence = async () => {
    for (let i = 0; i < journeySteps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 800)); // Delay between steps
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      id="steps"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-gradient-to-b from-primary/5 via-white to-primary/5 py-24"
    >
      <div className="container px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
            Your Journey
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            From Dream to Reality
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg max-w-3xl mx-auto">
            Follow our proven 5-step process to secure your place at a world-class university. 
            We guide you through every stage with expert support and personalized attention.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="relative">
          
          <div className="grid gap-8 lg:grid-cols-5">
            {journeySteps.map((step, index) => {
              const isActive = currentStep >= index;
              const isCurrent = currentStep === index;
              
              return (
                <motion.div
                  key={step.title}
                  className="relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0.3 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {/* Step Number Badge */}
                  <motion.div 
                    className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-primary text-primary-foreground shadow-xl shadow-primary/30"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: isActive ? 1 : 0,
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : -20
                    }}
                    transition={{ 
                      duration: 0.6, 
                      ease: "easeOut",
                      delay: index * 0.2 + 0.3
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.span 
                      className="text-lg font-bold"
                      initial={{ scale: 0 }}
                      animate={{ scale: isActive ? 1 : 0 }}
                      transition={{ 
                        duration: 0.4, 
                        ease: "easeOut",
                        delay: index * 0.2 + 0.5
                      }}
                    >
                      {step.stepNumber}
                    </motion.span>
                  </motion.div>

                  {/* Vertical Line from Badge */}
                  <motion.div
                    className="absolute left-1/2 top-16 hidden w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary to-primary/40 lg:block"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isActive ? 1 : 0 }}
                    transition={{ 
                      duration: 0.6, 
                      ease: "easeOut",
                      delay: index * 0.2 + 0.7
                    }}
                    style={{ 
                      height: "60px",
                      originY: 0
                    }}
                  />

                  {/* Horizontal Connection Line (for desktop) */}
                  {index < journeySteps.length - 1 && (
                    <motion.div
                      className="absolute left-1/2 top-16 hidden w-full -translate-x-1/2 lg:block"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ 
                        duration: 0.8, 
                        ease: "easeOut",
                        delay: index * 0.2 + 0.9
                      }}
                      style={{ 
                        height: "2px",
                        background: "linear-gradient(90deg, #1a2e56 0%, #1a2e56 50%, transparent 100%)",
                        originX: 0
                      }}
                    />
                  )}

                  {/* Step Content Card */}
                  <motion.div 
                    className="relative rounded-[2.5rem] border border-primary/10 bg-white/80 p-6 shadow-lg shadow-primary/10 backdrop-blur-sm h-64 flex flex-col"
                    initial={{ 
                      opacity: 0, 
                      y: 30, 
                      scale: 0.9 
                    }}
                    animate={{ 
                      opacity: isActive ? 1 : 0.6,
                      y: isActive ? 0 : 20,
                      scale: isActive ? 1 : 0.95
                    }}
                    transition={{ 
                      duration: 0.7, 
                      ease: "easeOut",
                      delay: index * 0.2 + 1.1
                    }}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Decorative Elements */}
                    <motion.div
                      className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-primary/10 blur-2xl"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: isActive ? 1 : 0,
                        opacity: isActive ? 1 : 0
                      }}
                      transition={{ 
                        duration: 0.5, 
                        ease: "easeOut",
                        delay: index * 0.2 + 1.3
                      }}
                      aria-hidden
                    />
                    
                    {/* Icon */}
                    <motion.div 
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ 
                        scale: isActive ? 1 : 0,
                        rotate: isActive ? 0 : -180
                      }}
                      transition={{ 
                        duration: 0.6, 
                        ease: "easeOut",
                        delay: index * 0.2 + 1.4
                      }}
                    >
                      <step.icon className="h-6 w-6" aria-hidden />
                    </motion.div>

                    {/* Content */}
                    <motion.h3 
                      className="text-lg font-semibold text-primary mb-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0,
                        x: isActive ? 0 : -20
                      }}
                      transition={{ 
                        duration: 0.5, 
                        ease: "easeOut",
                        delay: index * 0.2 + 1.5
                      }}
                    >
                      {step.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-sm text-muted-foreground leading-relaxed flex-1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0,
                        x: isActive ? 0 : -20
                      }}
                      transition={{ 
                        duration: 0.5, 
                        ease: "easeOut",
                        delay: index * 0.2 + 1.6
                      }}
                    >
                      {step.description}
                    </motion.p>

                    {/* Check Icon for completed steps */}
                    <motion.div 
                      className="mt-4 flex items-center gap-2 text-xs font-medium text-primary/70"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 0
                      }}
                      transition={{ 
                        duration: 0.4, 
                        ease: "easeOut",
                        delay: index * 0.2 + 1.7
                      }}
                    >
                    </motion.div>
                  </motion.div>

                  {/* Arrow for mobile */}
                  {index < journeySteps.length - 1 && (
                    <motion.div 
                      className="mt-6 flex justify-center lg:hidden"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 0
                      }}
                      transition={{ 
                        duration: 0.4, 
                        ease: "easeOut",
                        delay: index * 0.2 + 1.8
                      }}
                    >
                      <ArrowRight className="h-5 w-5 text-primary/40" aria-hidden />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default StepsSection;
