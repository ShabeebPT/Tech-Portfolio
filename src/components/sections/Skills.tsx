import { motion, type Variants } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent } from "@/components/ui/Card";
import { skills } from "@/data/portfolioConfig";

// Fallback icon generator or simple colored letter if icon is not mapped
const getIcon = (name: string) => {
  return (
    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl font-bold text-white group-hover:bg-primary/20 transition-colors">
      {name.substring(0, 1)}
    </div>
  );
};

export function Skills() {
  const categories = [
    { id: "frontend", label: "Frontend", data: skills.frontend },
    { id: "backend", label: "Backend", data: skills.backend },
    { id: "database", label: "Database", data: skills.database },
    { id: "tools", label: "Tools", data: skills.tools },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Technical Skills" 
          subtitle="My toolbox for building robust and scalable applications."
        />

        <div className="space-y-16">
          {categories.map((category) => (
            <div key={category.id}>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-primary block"></span>
                {category.label}
              </h3>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              >
                {category.data.map((skill: any) => (
                  <motion.div key={skill.name} variants={itemVariants}>
                    <Card className="group hover:-translate-y-2 transition-transform duration-300 bg-white/5 hover:bg-white/10 border-white/10 hover:border-primary/50 relative overflow-hidden h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CardContent className="p-6 flex flex-col items-center text-center relative z-10 space-y-4">
                        {getIcon(skill.name)}
                        <div>
                          <h4 className="font-semibold text-white group-hover:text-primary transition-colors">{skill.name}</h4>
                          <p className="text-xs text-text-secondary mt-1">{skill.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
