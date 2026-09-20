// src/components/ui/SectionHeading.tsx
import { ScrollReveal } from "@/components/motion/ScrollReveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <ScrollReveal distance={32}>
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="font-mono text-sm uppercase tracking-wider text-primary">
            {eyebrow}
          </p>
        )}

        <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
          {title}
        </h2>

        {description && (
          <p className="mt-3 text-muted-foreground">{description}</p>
        )}
      </div>
    </ScrollReveal>
  );
}
