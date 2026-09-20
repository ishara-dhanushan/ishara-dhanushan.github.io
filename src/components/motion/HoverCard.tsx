// src/components/motion/HoverCard.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  lift?: number;
}

export function HoverCard({
  children,
  className,
  scale = 1.01,
  lift = -2,
}: HoverCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale,
              y: lift,
            }
      }
      transition={{
        type: "spring",
        stiffness: 360,
        damping: 28,
        mass: 0.65,
      }}
    >
      {children}
    </motion.div>
  );
}
