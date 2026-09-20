// src/components/sections/ExperienceSection.tsx
import Image from "next/image";
import { HoverCard } from "@/components/motion/HoverCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { experience } from "@/data/portfolio";

export function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto max-w-300 px-6 py-20">
      <SectionHeading eyebrow="Experience" title="Professional experience" />

      <ScrollReveal className="mt-10" distance={34}>
        <HoverCard className="rounded-2xl border border-border/75 bg-surface/50 p-8">
          <div className="flex items-start gap-4 sm:gap-5">
            {experience.logo && (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white p-2.5 shadow-sm sm:h-16 sm:w-16 sm:p-3">
                <Image
                  src={experience.logo}
                  alt={`${experience.company} logo`}
                  className="h-full w-full object-contain"
                  width={128}
                  height={128}
                />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {experience.role} · {experience.company}
                </h3>

                <span className="font-mono text-sm text-muted-foreground">
                  {experience.period}
                </span>
              </div>

              <p className="mt-2 text-muted-foreground">{experience.summary}</p>
            </div>
          </div>

          <ul className="mt-6 space-y-2">
            {experience.highlights.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-foreground">
                <span
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"
                  aria-hidden="true"
                />

                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {experience.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </HoverCard>
      </ScrollReveal>
    </section>
  );
}
