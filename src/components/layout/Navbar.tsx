import { useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import { portfolioConfig } from "@/data/portfolioConfig";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Highlight active section
      const sections = navLinks.map(link => link.href.substring(1));
      let current = "home";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section is scrolled to or past the top offset
          if (rect.top <= 200) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id.substring(1));
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - 80, // offset for navbar
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        isScrolled ? "py-4" : "py-6"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className={cn(
            "mx-auto max-w-5xl flex items-center justify-between px-6 py-3 rounded-2xl border transition-all duration-300",
            isScrolled 
              ? "bg-secondary-bg/80 backdrop-blur-md border-border/50 shadow-lg shadow-black/20"
              : "bg-transparent border-transparent"
          )}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#home");
            }}
            className="text-xl font-bold font-mono tracking-tighter text-text-primary z-50 flex items-center gap-1 group"
          >
            <span className="text-primary group-hover:text-accent transition-colors">&lt;</span>
            {portfolioConfig.name.split(" ")[0]}
            <span className="text-primary group-hover:text-accent transition-colors">/&gt;</span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                    activeSection === link.href.substring(1)
                      ? "text-text-primary bg-text-primary/10"
                      : "text-text-secondary hover:text-text-primary hover:bg-text-primary/5"
                  )}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={toggleTheme}
                className="ml-4 p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-text-primary/5 transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </li>
          </ul>

          {/* Mobile Menu Toggle & Theme Toggle */}
          <div className="md:hidden flex items-center gap-4 z-50">
            <button
              onClick={toggleTheme}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className="text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden pt-28 px-6 flex flex-col h-screen"
          >
            <ul className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className={cn(
                      "block text-2xl font-semibold transition-colors",
                      activeSection === link.href.substring(1)
                        ? "text-primary"
                        : "text-text-primary"
                    )}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
