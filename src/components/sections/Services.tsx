import { motion, type Variants } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/portfolioConfig";
import { Card, CardContent } from "@/components/ui/Card";
import * as Icons from "lucide-react";

export function Services() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
  };

  return (
    <section className="py-24 relative bg-text-primary/20 border-y border-text-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="What I Can Build" 
          subtitle="Specialized services tailored to bring your ideas to life."
        />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {services.map((service: any) => {
            const Icon = (Icons as any)[service.icon] || Icons.Code;
            
            return (
              <motion.div key={service.title} variants={itemVariants}>
                <Card className="h-full group hover:border-primary/50 transition-colors duration-300 relative overflow-hidden bg-[#0a0a0a]/50">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Icon size={120} className="text-primary -rotate-12 translate-x-8 -translate-y-8" />
                  </div>
                  
                  <CardContent className="p-8 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="text-primary w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-3">{service.title}</h3>
                    <p className="text-text-secondary leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
