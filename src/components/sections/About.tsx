import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent } from "@/components/ui/Card";
import { Code2, Globe, Server } from "lucide-react";

export function About() {
  const stats = [
    { label: "Years Experience", value: "1+" },
    { label: "Completed Projects", value: "10+" },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading 
          title="About Me" 
          subtitle="Passionate about building scalable applications and solving complex problems with clean, efficient code."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center"
          >
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-full blur-3xl scale-90" />
            
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full p-1 bg-gradient-to-tr from-primary via-secondary to-accent">
              <div className="w-full h-full rounded-full bg-card overflow-hidden border-4 border-background flex items-center justify-center relative">
                {/* Fallback avatar if no image */}
                <img 
                  src="/profilephoto.jpeg" 
                  alt="Developer Avatar" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('fallback-avatar');
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 [.fallback-avatar_&]:opacity-100 transition-opacity">
                  <Code2 size={64} className="text-text-secondary opacity-50" />
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -right-4 top-10 glass-card px-4 py-3 flex items-center gap-3 rounded-xl shadow-lg border border-white/10"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Globe className="text-primary w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Frontend</p>
                <p className="text-xs text-text-secondary">React & UI</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              className="absolute -left-4 bottom-10 glass-card px-4 py-3 flex items-center gap-3 rounded-xl shadow-lg border border-white/10"
            >
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                <Server className="text-secondary w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Backend</p>
                <p className="text-xs text-text-secondary">Node & APIs</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Text and Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Full Stack Developer focusing on <span className="text-gradient">clean UI/UX</span> and scalable architectures.
            </h3>
            
            <p className="text-text-secondary text-lg leading-relaxed">
              I am a dedicated developer who loves bridging the gap between frontend aesthetics and backend functionality. My approach involves understanding the core problem, designing intuitive interfaces, and writing robust APIs to support them.
            </p>
            
            <p className="text-text-secondary text-lg leading-relaxed">
              Whether it's optimizing a React render tree, designing a normalized database schema, or building seamless micro-interactions, I bring a detail-oriented mindset to every phase of development.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6">
              {stats.map((stat, i) => (
                <Card key={i} className="bg-white/5 border-white/10">
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-xs md:text-sm text-text-secondary font-medium uppercase tracking-wider">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
