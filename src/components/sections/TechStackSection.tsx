// src/components/sections/TechStackSection.tsx
import { HoverCard } from "@/components/motion/HoverCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { coreStack, techGroups } from "@/data/portfolio";

export function TechStackSection() {
  return (
    <section id="tech-stack">
      <div className="mx-auto max-w-300 px-6 py-20">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Technologies I use to design, build, test, and deliver software products."
        />

        <ScrollReveal className="mt-10" distance={30}>
          <div className="flex flex-wrap gap-2">
            {coreStack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {techGroups.map((group, index) => (
            <ScrollReveal
              key={group.title}
              className="h-full"
              delay={(index % 3) * 0.05}
              distance={32}
            >
              <HoverCard className="h-full rounded-2xl border border-border/75 bg-surface/50 p-6">
                <h3 className="font-heading text-sm font-semibold text-foreground">
                  {group.title}
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  {group.technologies.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>

                {group.evidence && (
                  <p className="mt-4 text-xs text-muted-foreground">
                    {group.evidence}
                  </p>
                )}
              </HoverCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
