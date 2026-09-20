// src/components/sections/EducationSection.tsx
import { HoverCard } from "@/components/motion/HoverCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/data/portfolio";

export function EducationSection() {
  return (
    <section id="education">
      <div className="mx-auto max-w-300 px-6 py-20">
        <SectionHeading eyebrow="Education" title="Academic background" />

        <div className="mt-10 space-y-6">
          {education.map((entry, index) => (
            <ScrollReveal key={entry.level} delay={index * 0.05} distance={32}>
              <HoverCard className="rounded-2xl border border-border/75 bg-surface/50 p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-heading text-base font-semibold text-foreground">
                    {entry.level}
                  </h3>

                  <span className="font-mono text-sm text-muted-foreground">
                    {entry.period}
                  </span>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {entry.institution}
                </p>

                <p className="mt-3 text-sm text-foreground">{entry.details}</p>
              </HoverCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
