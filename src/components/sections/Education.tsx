import { motion } from "framer-motion";
import { education } from "@/data/portfolioConfig";
import { GraduationCap } from "lucide-react";

export function Education() {
  return (
    <section className="py-12 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <GraduationCap className="text-primary" />
          Education
        </h2>

        <div className="space-y-6">
          {education.map((edu: any, index: number) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors duration-500" />
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                  <p className="text-primary font-medium mb-2">{edu.field}</p>
                  <p className="text-text-secondary">{edu.institution}</p>
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-text-secondary text-sm font-mono border border-white/10 whitespace-nowrap self-start">
                  {edu.period}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
