// src/components/case-study/CaseStudyMetric.tsx
import { HoverCard } from "@/components/motion/HoverCard";

interface CaseStudyMetricProps {
  value: string;
  label: string;
  detail?: string;
}

export function CaseStudyMetric({
  value,
  label,
  detail,
}: CaseStudyMetricProps) {
  return (
    <HoverCard className="h-full rounded-2xl border border-border/75 bg-surface/50 p-6 transition-colors duration-200 hover:border-primary/50">
      <p className="font-heading text-3xl font-semibold text-foreground">
        {value}
      </p>
      <p className="mt-2 text-sm font-medium text-foreground">{label}</p>
      {detail && (
        <p className="mt-2 text-xs leading-5 text-muted-foreground">{detail}</p>
      )}
    </HoverCard>
  );
}
