// src/components/case-study/CaseStudyFlow.tsx
interface FlowItem {
  label: string;
  detail?: string;
}

export function CaseStudyFlow({ items }: { items: FlowItem[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/75 bg-surface/50">
      {items.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className={`grid gap-3 p-5 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:items-start sm:p-6 ${
            index > 0 ? "border-t border-border/75" : ""
          }`}
        >
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            {String(index + 1).padStart(2, "0")}
          </p>

          <div>
            <p className="font-heading text-sm font-semibold text-foreground">
              {item.label}
            </p>

            {item.detail && (
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                {item.detail}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
