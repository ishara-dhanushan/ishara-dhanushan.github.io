// src/components/background/AnimatedBackground.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

const blueGlow =
  "radial-gradient(circle, rgb(59 130 246 / 0.30) 0%, rgb(59 130 246 / 0.09) 44%, transparent 72%)";

const softBlueGlow =
  "radial-gradient(circle, rgb(96 165 250 / 0.22) 0%, rgb(59 130 246 / 0.06) 46%, transparent 74%)";

export function AnimatedBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background"
      aria-hidden="true"
    >
      <motion.div
        className="absolute -left-48 -top-52 h-152 w-152 rounded-full blur-3xl"
        style={{ background: blueGlow }}
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 80, 24, 0],
                y: [0, 36, 88, 0],
                scale: [1, 1.08, 1.02, 1],
                opacity: [0.7, 0.95, 0.78, 0.7],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -right-56 top-[22%] h-168 w-2xl rounded-full blur-3xl"
        style={{ background: softBlueGlow }}
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -72, -18, 0],
                y: [0, 76, -20, 0],
                scale: [1.04, 0.98, 1.08, 1.04],
                opacity: [0.55, 0.78, 0.64, 0.55],
              }
        }
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-64 left-[20%] h-160 w-160 rounded-full blur-3xl"
        style={{ background: blueGlow }}
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 96, -34, 0],
                y: [0, -64, -18, 0],
                scale: [0.96, 1.06, 1, 0.96],
                opacity: [0.42, 0.66, 0.52, 0.42],
              }
        }
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
