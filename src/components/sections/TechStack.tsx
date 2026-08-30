import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function TechStack() {
  const stackFlow = [
    { name: "React + TypeScript", role: "Frontend UI", color: "from-blue-500 to-blue-700" },
    { name: "REST API / GraphQL", role: "Communication Layer", color: "from-purple-500 to-purple-700" },
    { name: "Node.js + Express", role: "Backend Server", color: "from-green-500 to-green-700" },
    { name: "MongoDB / MySQL", role: "Database", color: "from-yellow-500 to-orange-500" }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-black/20 border-y border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Full Stack Architecture</h2>
          <p className="text-text-secondary">How my favorite technologies connect to build scalable applications.</p>
        </div>

        <div className="max-w-2xl mx-auto flex flex-col items-center">
          {stackFlow.map((stack, index) => (
            <div key={stack.name} className="flex flex-col items-center w-full">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="w-full sm:w-2/3"
              >
                <div className={`p-[1px] rounded-xl bg-gradient-to-r ${stack.color}`}>
                  <div className="bg-card rounded-xl p-6 text-center shadow-lg relative overflow-hidden group">
                    <div className={`absolute inset-0 bg-gradient-to-r ${stack.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    <h3 className="text-xl font-bold text-white mb-1">{stack.name}</h3>
                    <p className="text-sm text-text-secondary uppercase tracking-wider font-medium">{stack.role}</p>
                  </div>
                </div>
              </motion.div>

              {index < stackFlow.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  whileInView={{ opacity: 1, height: "auto" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  className="py-4 flex flex-col items-center"
                >
                  <div className="w-0.5 h-8 bg-gradient-to-b from-border to-primary/50 relative overflow-hidden">
                    <motion.div 
                      animate={{ y: [0, 32] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="absolute top-0 left-0 w-full h-1/2 bg-primary blur-sm"
                    />
                  </div>
                  <ArrowDown className="text-primary w-5 h-5 -mt-1" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
