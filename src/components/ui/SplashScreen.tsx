import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const labels = [
  "Initializing System...",
  "Loading Assets...",
  "Preparing Experience...",
];

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [labelIndex, setLabelIndex] = useState(0);

  useEffect(() => {
    // Change label every second
    const labelInterval = setInterval(() => {
      setLabelIndex((prev) => (prev + 1 < labels.length ? prev + 1 : prev));
    }, 1000);

    // Complete loading after 3 seconds exactly
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearInterval(labelInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      key="splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center"
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Sound wave loader */}
        <div className="flex items-center justify-center gap-2 h-16">
          {[1, 2, 3, 4, 5, 4, 3].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 bg-primary rounded-full"
              animate={{
                height: ["20%", "100%", "20%"],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Loading labels */}
        <div className="absolute top-24 w-64 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={labelIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-text-secondary font-mono text-sm uppercase tracking-widest"
            >
              {labels[labelIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
