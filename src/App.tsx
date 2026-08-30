import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { TechStack } from "@/components/sections/TechStack";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { portfolioConfig } from "@/data/portfolioConfig";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Setup document title and meta description dynamically based on config
    document.title = `${portfolioConfig.name} | ${portfolioConfig.role}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", portfolioConfig.shortDescription);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-primary/30 selection:text-white font-sans overflow-x-hidden">
      <CustomCursor />
      
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none bg-grid z-[-1]" />
      
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent origin-left z-[100]"
        style={{ scaleX }}
      />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <TechStack />
        <Projects />
        
        {/* Experience and Education together for better layout flow */}
        <div className="relative">
          <div className="absolute inset-0 bg-secondary-bg/50 skew-y-3 origin-top-left -z-10 border-y border-white/5" />
          <Experience />
          <Education />
        </div>
        
        <Services />
        <Contact />
      </main>

      <Footer />

      {/* Floating Resume Button */}
      <a 
        href={portfolioConfig.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-8 right-8 bg-card border border-white/10 hover:border-primary/50 text-white px-4 py-3 rounded-full items-center gap-2 shadow-2xl z-40 transition-all hover:-translate-y-1 hover:shadow-primary/20"
      >
        <span className="text-sm font-medium">Resume</span>
        <ArrowDown size={16} className="text-primary" />
      </a>
    </div>
  );
}

export default App;
