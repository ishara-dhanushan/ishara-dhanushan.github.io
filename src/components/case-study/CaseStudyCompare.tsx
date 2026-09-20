import { HoverCard } from "@/components/motion/HoverCard";

interface CompareSide {
  label: string;
  value: string;
  detail: string;
}

export function CaseStudyCompare({
  before,
  after,
}: {
  before: CompareSide;
  after: CompareSide;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {[before, after].map((item) => (
        <HoverCard
          key={item.label}
          className="h-full rounded-2xl border border-border/75 bg-surface/50 p-6 transition-colors duration-200 hover:border-primary/50"
        >
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            {item.label}
          </p>
          <p className="mt-3 font-heading text-xl font-semibold text-foreground">
            {item.value}
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {item.detail}
          </p>
        </HoverCard>
      ))}
    </div>
  );
}
