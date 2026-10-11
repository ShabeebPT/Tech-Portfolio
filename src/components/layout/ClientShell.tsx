"use client";

import { useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Cursor } from "@/components/ui/inverted-cursor";
import { SplashScreen } from "@/components/ui/SplashScreen";
import { TerminalWrapper } from "@/components/ui/TerminalWrapper";
import { portfolioConfig } from "@/data/portfolioConfig";

export function ClientShell({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className={`min-h-screen bg-background text-text-primary selection:bg-primary/30 selection:text-text-primary font-sans transition-colors duration-500 ${
        isLoading ? "overflow-hidden" : "overflow-x-hidden"
      }`}
    >
      <AnimatePresence mode="wait">
        {isLoading && <SplashScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Cursor size={42} textHoverSize={72} />

      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none bg-grid z-[-1]" />

      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent origin-left z-[100]"
        style={{ scaleX }}
      />

      {children}

      {/* Terminal Modal Trigger */}
      <TerminalWrapper />

      {/* Floating Resume Button */}
      <a
        href={portfolioConfig.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-8 right-8 bg-card border border-text-primary/10 hover:border-primary/50 text-text-primary px-4 py-3 rounded-full items-center gap-2 shadow-2xl z-40 transition-all hover:-translate-y-1 hover:shadow-primary/20"
      >
        <span className="text-sm font-medium">Resume</span>
        <ArrowDown size={16} className="text-primary" />
      </a>
    </div>
  );
}
