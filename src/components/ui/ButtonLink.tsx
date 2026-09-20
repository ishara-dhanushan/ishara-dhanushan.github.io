// src/components/ui/ButtonLink.tsx
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { MouseEventHandler, ReactNode } from "react";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
  onClick,
}: ButtonLinkProps) {
  const reduceMotion = useReducedMotion();

  const base =
    "inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-colors";

  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary-hover"
      : "border border-border text-foreground hover:bg-surface-hover";

  return (
    <motion.span
      className="inline-flex"
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
    >
      <Link
        href={href}
        onClick={onClick}
        className={`${base} ${styles}`}
        {...(external
          ? {
              target: "_blank",
              rel: "noopener noreferrer",
            }
          : {})}
      >
        {children}
      </Link>
    </motion.span>
  );
}
