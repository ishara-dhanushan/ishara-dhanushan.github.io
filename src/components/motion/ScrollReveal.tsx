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
      controls.set({ opacity: 1, y: 0 });
      return;
    }

    if (element.dataset.scrollRevealRestored === "true") {
      visibleRef.current = true;
      delete element.dataset.scrollRevealRestored;
      controls.set({ opacity: 1, y: 0 });
    }

    const revealThreshold = Math.min(Math.max(amount, 0), 1);
    const hideThreshold = revealThreshold * 0.5;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        if (element.dataset.scrollRevealRestored === "true") {
          visibleRef.current = true;
          delete element.dataset.scrollRevealRestored;
        }

        const direction = scrollDirectionRef.current;
        const visibleAmount = entry.intersectionRatio;
        const elementTop = entry.boundingClientRect.top;

        // Reveal at 25% while scrolling down.
        if (
          direction === "down" &&
          visibleAmount >= revealThreshold &&
          !visibleRef.current
        ) {
          visibleRef.current = true;
          controls.stop();

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

        // Recover once when hidden content enters from the top while scrolling up.
        if (
          direction === "up" &&
          entry.isIntersecting &&
          elementTop <= 0 &&
          !visibleRef.current
        ) {
          visibleRef.current = true;
          controls.stop();
          controls.set({ opacity: 1, y: 0 });
          return;
        }

        // Hide at 12.5% only while leaving through the bottom.
        if (
          direction === "up" &&
          visibleAmount <= hideThreshold &&
          elementTop > 0 &&
          visibleRef.current
        ) {
          visibleRef.current = false;
          controls.stop();

          void controls.start({
            opacity: 0,
            y: distance,
            transition: {
              duration: 0.3,
              ease: "easeIn",
            },
          });
        }
      },
      {
        threshold: [0, hideThreshold, revealThreshold, 1],
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
      data-scroll-reveal
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
