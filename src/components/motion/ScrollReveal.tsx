// src/components/motion/ScrollReveal.tsx
"use client";

import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { useScrollDirectionRef } from "@/components/motion/ScrollDirectionProvider";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  amount?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  distance = 32,
  amount = 0.25,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  // Tracks whether this element has been revealed. Remains logically visible
  // once revealed scrolling down so it stays visible when scrolling back up.
  const visibleRef = useRef(false);

  const controls = useAnimationControls();
  const reduceMotion = useReducedMotion();

  const scrollDirectionRef = useScrollDirectionRef();

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    if (reduceMotion) {
      visibleRef.current = true;

      controls.set({
        opacity: 1,
        y: 0,
      });

      return;
    }

    // Start reveal/fade logic when roughly 25% of the block is inside the viewport.
    const threshold = Math.min(Math.max(amount, 0), 1);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        const direction = scrollDirectionRef.current;

        const hasReachedThreshold = entry.intersectionRatio >= threshold;

        // elementTop < 0 indicates entering/leaving through top;
        // elementTop > 0 indicates entering/leaving through bottom.
        const elementTop = entry.boundingClientRect.top;

        // Scrolling down: reveal when element reaches viewport threshold.
        if (
          direction === "down" &&
          hasReachedThreshold &&
          !visibleRef.current
        ) {
          visibleRef.current = true;

          void controls.start({
            opacity: 1,
            y: 0,

            transition: {
              duration: 0.5,
              delay,
              ease: "easeOut",
            },
          });

          return;
        }

        // Scrolling down (leaving through top): keep visible state so
        // it remains visible when scrolling back up.
        if (direction === "down" && !hasReachedThreshold) {
          return;
        }

        // Scrolling up (re-entering from top): maintain full visibility without re-animating.
        if (direction === "up" && hasReachedThreshold) {
          visibleRef.current = true;

          controls.set({
            opacity: 1,
            y: 0,
          });

          return;
        }

        // Scrolling up (leaving through bottom): fade out when below threshold
        // and elementTop > 0 to prevent items above the viewport from fading out.
        if (
          direction === "up" &&
          !hasReachedThreshold &&
          elementTop > 0 &&
          visibleRef.current
        ) {
          visibleRef.current = false;

          void controls.start({
            opacity: 0,
            y: distance,

            transition: {
              duration: 0.32,
              ease: "easeIn",
            },
          });
        }
      },
      {
        threshold: [0, threshold, 1],
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [amount, controls, delay, distance, reduceMotion, scrollDirectionRef]);

  return (
    <motion.div
      ref={elementRef}
      className={className}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: distance,
            }
      }
      animate={controls}
    >
      {children}
    </motion.div>
  );
}
