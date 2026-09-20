// src/components/sections/CapabilitiesSection.tsx
import { HoverCard } from "@/components/motion/HoverCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { capabilities } from "@/data/portfolio";

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="mx-auto max-w-300 px-6 py-20">
      <SectionHeading
        eyebrow="Engineering Capabilities"
        title="How the stack gets applied"
      />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {capabilities.map((capability, index) => (
          <ScrollReveal
            key={capability}
            className="h-full"
            delay={(index % 2) * 0.05}
            distance={32}
          >
            <HoverCard className="flex h-full gap-3 rounded-2xl border border-border/75 bg-surface/50 p-5 text-sm text-foreground">
              <span
                className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden="true"
              />

              <span>{capability}</span>
            </HoverCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
