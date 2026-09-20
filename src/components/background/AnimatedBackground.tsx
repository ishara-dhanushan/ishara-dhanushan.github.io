// src/components/background/AnimatedBackground.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const blueGlow =
  "radial-gradient(circle, rgb(59 130 246 / 0.30) 0%, rgb(59 130 246 / 0.09) 44%, transparent 72%)";

const softBlueGlow =
  "radial-gradient(circle, rgb(96 165 250 / 0.22) 0%, rgb(59 130 246 / 0.06) 46%, transparent 74%)";

const faintBlueGlow =
  "radial-gradient(circle, rgb(37 99 235 / 0.16) 0%, rgb(59 130 246 / 0.045) 48%, transparent 75%)";

function useIsMobile() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const update = () => {
      setMobile(mediaQuery.matches);
    };

    update();

    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  return mobile;
}

export function AnimatedBackground() {
  const reduceMotion = useReducedMotion();
  const mobile = useIsMobile();

  const disableMotion = reduceMotion || mobile;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background"
      style={{
        contain: "paint",
      }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute -left-48 -top-52 will-change-transform"
        animate={
          disableMotion
            ? undefined
            : {
                x: [0, 55, 18, 0],
                y: [0, 24, 55, 0],
              }
        }
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="h-152 w-152 rounded-full blur-3xl"
          style={{
            background: blueGlow,
            transform: "translateZ(0)",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute -right-52 top-[28%] will-change-transform"
        animate={
          disableMotion
            ? undefined
            : {
                x: [0, -48, -12, 0],
                y: [0, 42, -16, 0],
              }
        }
        transition={{
          duration: 36,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="h-160 w-160 rounded-full blur-3xl"
          style={{
            background: softBlueGlow,
            transform: "translateZ(0)",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute -bottom-72 left-[30%] will-change-transform"
        animate={
          disableMotion
            ? undefined
            : {
                x: [0, 34, -22, 0],
                y: [0, -32, -10, 0],
              }
        }
        transition={{
          duration: 42,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="h-144 w-xl rounded-full blur-3xl"
          style={{
            background: faintBlueGlow,
            transform: "translateZ(0)",
          }}
        />
      </motion.div>
    </div>
  );
}
