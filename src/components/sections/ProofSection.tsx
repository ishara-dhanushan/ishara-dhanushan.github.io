// src/components/sections/ProofSection.tsx
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { proofItems } from "@/data/portfolio";

export function ProofSection() {
  return (
    <section className="border-y border-border/75 bg-surface/50">
      <div className="mx-auto grid max-w-300 grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-5">
        {proofItems.map((item, index) => (
          <ScrollReveal key={item.label} delay={index * 0.04} distance={30}>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {item.label}
              </p>

              <p className="mt-2 text-sm text-foreground">{item.value}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
