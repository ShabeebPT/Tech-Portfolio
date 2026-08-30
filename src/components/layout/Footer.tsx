import { portfolioConfig } from "@/data/portfolioConfig";
import { Code2, Briefcase, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-white/10 bg-black/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo / Name */}
          <div className="flex flex-col items-center md:items-start">
            <a href="#home" className="text-xl font-bold font-mono tracking-tighter text-white mb-1">
              <span className="text-primary">&lt;</span>
              {portfolioConfig.name.split(" ").join("")}
              <span className="text-primary">/&gt;</span>
            </a>
            <p className="text-sm text-text-secondary">{portfolioConfig.role}</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <a href={portfolioConfig.github} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-white transition-colors">
              <Code2 size={20} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href={portfolioConfig.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-white transition-colors">
              <Briefcase size={20} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href={`mailto:${portfolioConfig.email}`} className="text-text-secondary hover:text-white transition-colors">
              <Mail size={20} />
              <span className="sr-only">Email</span>
            </a>
          </div>

          {/* Copyright & Built with */}
          <div className="flex flex-col items-center md:items-end text-xs text-text-secondary">
            <p className="mb-1">© {currentYear} {portfolioConfig.name}. All rights reserved.</p>
            <p>Built with <span className="text-white font-medium">React</span> + <span className="text-white font-medium">Tailwind</span></p>
          </div>

        </div>
      </div>
    </footer>
  );
}
