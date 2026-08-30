import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { portfolioConfig } from "@/data/portfolioConfig";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Code2, Briefcase, Mail, Send, Loader2, CheckCircle2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form data:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

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
              <h3 className="text-2xl font-bold text-text-primary mb-4">Get in Touch</h3>
              <p className="text-text-secondary leading-relaxed">
                Whether you have a question, a project proposal, or just want to say hi, my inbox is always open. I'll try my best to get back to you!
              </p>
            </div>

            <div className="space-y-4">
              <a href={`mailto:${portfolioConfig.email}`} className="flex items-center gap-4 text-text-secondary hover:text-primary transition-colors p-4 rounded-xl hover:bg-text-primary/5 border border-transparent hover:border-text-primary/10 group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary font-medium">Email</p>
                  <p className="text-text-primary font-medium">{portfolioConfig.email}</p>
                </div>
              </a>

              <a href={portfolioConfig.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-text-secondary hover:text-text-primary transition-colors p-4 rounded-xl hover:bg-text-primary/5 border border-transparent hover:border-text-primary/10 group">
                <div className="w-12 h-12 rounded-full bg-text-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Code2 className="text-text-primary" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary font-medium">GitHub</p>
                  <p className="text-text-primary font-medium">github.com/{portfolioConfig.github.split('/').pop()}</p>
                </div>
              </a>

              <a href={portfolioConfig.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-text-secondary hover:text-[#0A66C2] transition-colors p-4 rounded-xl hover:bg-text-primary/5 border border-transparent hover:border-text-primary/10 group">
                <div className="w-12 h-12 rounded-full bg-[#0A66C2]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Briefcase className="text-[#0A66C2]" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary font-medium">LinkedIn</p>
                  <p className="text-text-primary font-medium">linkedin.com/in/{portfolioConfig.linkedin.split('/').pop()}</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3"
          >
            <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">Message Sent!</h3>
                  <p className="text-text-secondary">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-text-secondary">Name</label>
                      <input
                        id="name"
                        {...register("name")}
                        className={`w-full bg-background/50 border ${errors.name ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-border focus:border-primary focus:ring-primary/20'} rounded-lg px-4 py-3 text-text-primary outline-none focus:ring-2 transition-all`}
                        placeholder="Your name"
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-text-secondary">Email</label>
                      <input
                        id="email"
                        {...register("email")}
                        className={`w-full bg-background/50 border ${errors.email ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-border focus:border-primary focus:ring-primary/20'} rounded-lg px-4 py-3 text-text-primary outline-none focus:ring-2 transition-all`}
                        placeholder="Your email"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-text-secondary">Subject</label>
                    <input
                      id="subject"
                      {...register("subject")}
                      className={`w-full bg-background/50 border ${errors.subject ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-border focus:border-primary focus:ring-primary/20'} rounded-lg px-4 py-3 text-text-primary outline-none focus:ring-2 transition-all`}
                      placeholder="Project Inquiry"
                    />
                    {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-text-secondary">Message</label>
                    <textarea
                      id="message"
                      {...register("message")}
                      rows={5}
                      className={`w-full bg-background/50 border ${errors.message ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-border focus:border-primary focus:ring-primary/20'} rounded-lg px-4 py-3 text-text-primary outline-none focus:ring-2 transition-all resize-none`}
                      placeholder="Tell me about your project..."
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    variant="glow"
                    size="lg"
                    className="w-full h-12"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="mr-2 h-5 w-5" /> Send Message</>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
