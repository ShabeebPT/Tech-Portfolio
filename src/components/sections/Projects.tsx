import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/portfolioConfig";
import { ExternalLink, Code2 } from "lucide-react";

export function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Featured Projects" 
          subtitle="A selection of some of my most recent and impactful work."
        />

        <div className="space-y-24">
          {projects.map((project: any, index: number) => (
            <motion.div 
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}
            >
              {/* Image/Mockup container */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl z-10 pointer-events-none" />
                <div className="relative rounded-2xl overflow-hidden glass border border-white/10 shadow-2xl bg-card">
                  {/* Fallback pattern if no image */}
                  <div className="aspect-[16/10] w-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0 relative"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.classList.add('fallback-img');
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 [.fallback-img_&]:opacity-100 transition-opacity bg-black/40">
                      <p className="text-white font-mono text-2xl font-bold opacity-30">{project.title}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className={`w-full lg:w-1/2 flex flex-col ${index % 2 !== 0 ? 'lg:items-start lg:text-left' : 'lg:items-end lg:text-right'}`}>
                <p className="text-primary font-mono text-sm mb-2">Featured Project</p>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 hover:text-primary transition-colors cursor-pointer">
                  {project.title}
                </h3>
                
                <div className={`glass-card p-6 md:p-8 mb-6 z-20 ${index % 2 !== 0 ? 'lg:-mr-12' : 'lg:-ml-12'} text-left shadow-2xl`}>
                  <p className="text-text-secondary leading-relaxed">
                    {project.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {project.features.map((feature: string) => (
                      <li key={feature} className="flex items-start text-sm text-gray-300">
                        <span className="text-primary mr-2">▹</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <ul className={`flex flex-wrap gap-3 mb-8 ${index % 2 !== 0 ? 'justify-start' : 'justify-end'}`}>
                  {project.tech.map((tech: string) => (
                    <li key={tech} className="text-sm font-mono text-text-secondary px-3 py-1 bg-white/5 rounded-full border border-white/5">
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-4">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-white transition-colors" aria-label="GitHub Repository">
                      <Code2 size={20} />
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-white transition-colors" aria-label="Live Demo">
                      <ExternalLink size={24} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
