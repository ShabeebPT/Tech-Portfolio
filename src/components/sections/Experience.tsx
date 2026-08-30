import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/portfolioConfig";
import { Briefcase } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <SectionHeading 
          title="Experience" 
          subtitle="My professional journey and the value I've delivered."
        />

        <div className="relative border-l border-border/50 ml-4 md:ml-6 space-y-12 pb-8">
          {/* Glowing line overlay */}
          <motion.div 
            className="absolute top-0 bottom-0 left-[-1px] w-[2px] bg-gradient-to-b from-primary via-secondary to-transparent origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {experience.map((job: any, index: number) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                <Briefcase size={14} className="text-primary" />
              </div>

              <div className="glass-card p-6 md:p-8 rounded-2xl group hover:border-primary/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-text-primary group-hover:text-primary transition-colors">{job.role}</h3>
                    <p className="text-lg text-text-secondary font-medium">{job.company}</p>
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-mono whitespace-nowrap self-start md:self-auto border border-primary/20">
                    {job.period}
                  </div>
                </div>

                <ul className="mt-4 space-y-3">
                  {job.description.map((item: string, i: number) => (
                    <li key={i} className="flex items-start text-gray-300">
                      <span className="text-primary mr-3 mt-1 text-sm">▹</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
