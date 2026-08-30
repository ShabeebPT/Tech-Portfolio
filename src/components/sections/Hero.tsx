import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { portfolioConfig } from "@/data/portfolioConfig";
import { FileText, ArrowRight } from "lucide-react";

export function Hero() {
  const codeSnippet = `const developer = {
  role: "Full Stack Developer",
  frontend: ["React", "TypeScript", "Tailwind"],
  backend: ["Node.js", "Express"],
  database: ["MongoDB", "MySQL"],
  coffee: true
};`;

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <iframe 
          src="https://www.youtube.com/embed/yJg-Y5byzP8?autoplay=1&mute=1&loop=1&playlist=yJg-Y5byzP8&controls=0&showinfo=0&rel=0&modestbranding=1" 
          className="w-full h-full object-cover opacity-30 mix-blend-screen scale-[1.5] md:scale-[1.2]"
          allow="autoplay; encrypted-media"
          title="Tech Background"
        ></iframe>
        {/* Gradient Overlay to blend bottom seamlessly */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Background gradients */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/20 rounded-full blur-[128px] z-0" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-secondary/20 rounded-full blur-[128px]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl md:text-2xl font-medium text-primary mb-2">
                Hi, I'm
              </h2>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-white">
                {portfolioConfig.name}
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold text-text-secondary">
                {portfolioConfig.role}
              </h2>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-text-secondary max-w-lg leading-relaxed"
            >
              {portfolioConfig.shortDescription}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                variant="glow"
                size="lg"
                onClick={() => {
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group"
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open(portfolioConfig.resume, '_blank')}
              >
                <FileText className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </motion.div>
          </div>
          
          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-[280px] md:max-w-[320px] mx-auto group">
              {/* Animated glowing border/backdrop */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-primary via-secondary to-accent rounded-full blur-xl opacity-30 group-hover:opacity-60 transition duration-500 group-hover:duration-200 animate-pulse" />
              
              <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 glass shadow-2xl bg-[#0A0A0A]/80 p-2">
                <div className="w-full h-full rounded-full overflow-hidden bg-white/5 relative">
                  <img 
                    src="/profilephoto.jpeg" 
                    alt="Developer Profile" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      // Professional placeholder if user hasn't added profile.jpg to public folder yet
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                  {/* Subtle overlay gradient to blend bottom edge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                </div>
              </div>
            </div>
            
            {/* Floating Orbs */}
            <motion.div 
              animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl z-[-1]" 
            />
            <motion.div 
              animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/30 rounded-full blur-3xl z-[-1]" 
            />
          </motion.div>
          
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-xs text-text-secondary uppercase tracking-widest mb-2 font-medium">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 border-2 border-text-secondary rounded-full flex justify-center p-1"
        >
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
