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
import { ClientShell } from "@/components/layout/ClientShell";

export default function HomePage() {
  return (
    <ClientShell>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <TechStack />
        <Projects />

        {/* Experience and Education together for better layout flow */}
        <div className="relative">
          <div className="absolute inset-0 bg-secondary-bg/50 skew-y-3 origin-top-left -z-10 border-y border-text-primary/5" />
          <Experience />
          <Education />
        </div>

        <Services />
        <Contact />
      </main>

      <Footer />
    </ClientShell>
  );
}
