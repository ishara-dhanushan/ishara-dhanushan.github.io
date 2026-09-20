// src/components/sections/CredentialsSection.tsx
import { HoverCard } from "@/components/motion/HoverCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { credentials } from "@/data/portfolio";

export function CredentialsSection() {
  return (
    <section id="certifications" className="mx-auto max-w-300 px-6 py-20">
      <SectionHeading
        eyebrow="Certifications"
        title="Relevant certifications"
      />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {credentials.map((credential, index) => (
          <ScrollReveal
            key={credential.name}
            className="h-full"
            delay={(index % 3) * 0.05}
            distance={32}
          >
            <HoverCard className="h-full rounded-2xl border border-border/75 bg-surface/50 p-5">
              <p className="font-heading text-sm font-semibold text-foreground">
                {credential.name}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {credential.issuer}
              </p>
            </HoverCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
