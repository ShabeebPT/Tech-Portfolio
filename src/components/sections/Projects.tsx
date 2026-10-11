"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import GsapFlipCard, {
  type GsapFlipCardItem,
} from "@/components/ui/gsap-card-flip";
import { projects } from "@/data/portfolioConfig";
import { Sparkles } from "lucide-react";

export function Projects() {
  const projectItems: GsapFlipCardItem[] = projects.map((project, index) => ({
    id: index,
    image: project.image,
    alt: project.title,
    caption: project.description,
    title: project.title,
    description: project.description,
    tech: project.tech,
    features: project.features,
    github: project.github,
    demo: project.demo,
  }));

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Featured Projects"
          subtitle="An interactive showcase of my work. Click the stack to expand, and tap any project to bring it forward."
        />

        <div className="relative rounded-3xl border border-text-primary/10 glass-card bg-card/40 backdrop-blur-xl overflow-hidden shadow-2xl">
          <GsapFlipCard
            items={projectItems}
            title="Featured Projects"
            meta="Full Stack Applications"
            description="Explore my recent client systems and web applications with interactive previews, tech stacks, and live links."
            rounded={20}
            heroWidth={540}
            heroHeight={640}
            thumbWidth={110}
            thumbHeight={130}
            thumbGap={12}
            stackRotation={3}
            stackOffsetX={6}
            stackOffsetY={10}
            minHeight="min-h-[720px] lg:min-h-[780px]"
          />

          {/* Interactive helper badge */}
          <div className="pointer-events-none absolute inset-x-0 bottom-6 z-40 hidden justify-center md:flex">
            <div className="rounded-full border border-text-primary/10 bg-background/80 px-4 py-1.5 text-xs font-mono text-text-secondary backdrop-blur-md flex items-center gap-2 shadow-lg">
              <Sparkles size={14} className="text-primary animate-pulse" />
              <span>
                Click the card deck to expand • Click any project to swap
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
