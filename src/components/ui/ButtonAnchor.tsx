// src/components/ui/ButtonAnchor.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface ButtonAnchorProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
}

export function ButtonAnchor({
  href,
  children,
  variant = "primary",
  external,
}: ButtonAnchorProps) {
  const reduceMotion = useReducedMotion();

  const base =
    "inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-colors";

  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary-hover"
      : "border border-border text-foreground hover:bg-surface-hover";

  return (
    <motion.a
      href={href}
      className={`${base} ${styles}`}
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.02,
              y: -2,
            }
      }
      whileTap={
        reduceMotion
          ? undefined
          : {
              scale: 0.96,
            }
      }
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.55,
      }}
      {...(external
        ? {
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : {})}
    >
      {children}
    </motion.a>
  );
}
