// src/components/case-study/CaseStudyNavigation.tsx
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

interface ProjectNavItem {
  href: string;
  title: string;
}

interface CaseStudyNavigationProps {
  previous?: ProjectNavItem;
  next?: ProjectNavItem;
}

function ProjectLink({
  item,
  direction,
}: {
  item: ProjectNavItem;
  direction: "previous" | "next";
}) {
  const reduceMotion = useReducedMotion();

  const previous = direction === "previous";

  return (
    <motion.div
      className="h-full"
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -2,
              scale: 1.01,
            }
      }
      whileTap={
        reduceMotion
          ? undefined
          : {
              scale: 0.98,
            }
      }
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 30,
        mass: 0.6,
      }}
    >
      <Link
        href={item.href}
        scroll={false}
        className={`group block h-full rounded-2xl border border-border/75 bg-surface/50 p-6 transition-colors duration-200 hover:border-primary/60 ${
          previous ? "text-left" : "text-left sm:text-right"
        }`}
      >
        <span
          className={`flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground ${
            previous ? "" : "sm:justify-end"
          }`}
        >
          {previous && (
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            >
              ←
            </span>
          )}

          {previous ? "Previous case study" : "Next case study"}

          {!previous && (
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          )}
        </span>

        <span className="mt-3 block font-heading text-lg font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
          {item.title}
        </span>
      </Link>
    </motion.div>
  );
}

export function CaseStudyNavigation({
  previous,
  next,
}: CaseStudyNavigationProps) {
  return (
    <section className="mx-auto max-w-300 px-6 pb-20 pt-10">
      <div className="grid gap-6 sm:grid-cols-2">
        {previous ? (
          <ProjectLink item={previous} direction="previous" />
        ) : (
          <div />
        )}

        {next && <ProjectLink item={next} direction="next" />}
      </div>
    </section>
  );
}
