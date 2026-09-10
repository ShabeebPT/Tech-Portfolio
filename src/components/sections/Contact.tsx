import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { portfolioConfig } from "@/data/portfolioConfig";
import { Mail, Send } from "lucide-react";
import {
  GithubIcon as Github,
  LinkedinIcon as Linkedin,
} from "@/components/ui/Icons";

export function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Let's Build Something Together"
          subtitle="Have a project, opportunity, or idea? I'd love to hear about it."
        />

        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Get in Touch
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Whether you have a question, a project proposal, or just want to
                say hi, my inbox is always open. I'll try my best to get back to
                you!
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={`mailto:${portfolioConfig.email}`}
                className="flex items-center gap-4 text-text-secondary hover:text-primary transition-colors p-4 rounded-xl hover:bg-text-primary/5 border border-transparent hover:border-text-primary/10 group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary font-medium">
                    Email
                  </p>
                  <p className="text-text-primary font-medium">
                    {portfolioConfig.email}
                  </p>
                </div>
              </a>

              <a
                href={portfolioConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-text-secondary hover:text-text-primary transition-colors p-4 rounded-xl hover:bg-text-primary/5 border border-transparent hover:border-text-primary/10 group"
              >
                <div className="w-12 h-12 rounded-full bg-text-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Github className="text-text-primary" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary font-medium">
                    GitHub
                  </p>
                  <p className="text-text-primary font-medium">
                    github.com/{portfolioConfig.github.split("/").pop()}
                  </p>
                </div>
              </a>

              <a
                href={portfolioConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-text-secondary hover:text-[#0A66C2] transition-colors p-4 rounded-xl hover:bg-text-primary/5 border border-transparent hover:border-text-primary/10 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#0A66C2]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Linkedin className="text-[#0A66C2]" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary font-medium">
                    LinkedIn
                  </p>
                  <p className="text-text-primary font-medium">
                    linkedin.com/in/{portfolioConfig.linkedin.split("/").pop()}
                  </p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3 flex flex-col justify-center"
          >
            <div className="glass-card p-8 md:p-12 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center text-center h-full min-h-[300px]">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Mail size={40} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Start a Conversation
              </h3>
              <p className="text-text-secondary mb-8 max-w-md">
                Ready to bring your ideas to life? Let's discuss your project
                and see how we can work together.
              </p>
              <Button
                onClick={() =>
                  (window.location.href = `mailto:${portfolioConfig.email}`)
                }
                variant="glow"
                size="lg"
                className="w-full sm:w-auto px-8 h-12"
              >
                <Send className="mr-2 h-5 w-5" /> Send Message
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
