// src/components/case-study/CaseStudySection.tsx
import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface CaseStudySectionProps {
  number: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export function CaseStudySection({
  number,
  title,
  description,
  children,
}: CaseStudySectionProps) {
  return (
    <section className="mx-auto max-w-300 px-6 py-20">
      <SectionHeading
        eyebrow={number}
        title={title}
        description={description}
      />

      <ScrollReveal className="mt-10" delay={0.04} distance={28}>
        {children}
      </ScrollReveal>
    </section>
  );
}
