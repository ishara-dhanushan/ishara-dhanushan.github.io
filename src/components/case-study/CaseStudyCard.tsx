// src/components/case-study/CaseStudyCard.tsx
import type { ReactNode } from "react";
import { HoverCard } from "@/components/motion/HoverCard";

interface CaseStudyCardProps {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export function CaseStudyCard({
  eyebrow,
  title,
  children,
  className = "",
}: CaseStudyCardProps) {
  return (
    <HoverCard
      className={`h-full rounded-2xl border border-border/75 bg-surface/50 p-6 transition-colors duration-200 hover:border-primary/50 ${className}`}
    >
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-wider text-primary">
          {eyebrow}
        </p>
      )}

      <h3 className="mt-2 font-heading text-lg font-semibold text-foreground">
        {title}
      </h3>

      <div className="mt-3 text-sm leading-6 text-muted-foreground">
        {children}
      </div>
    </HoverCard>
  );
}
