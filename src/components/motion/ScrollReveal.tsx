"use client";

import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
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
  const frameRef = useRef<number | null>(null);

  const controls = useAnimationControls();
  const reduceMotion = useReducedMotion();
  const scrollDirectionRef = useScrollDirectionRef();
  const pathname = usePathname();

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const revealThreshold = Math.min(Math.max(amount, 0), 1);

    const hideThreshold = revealThreshold * 0.5;

    const show = (animate: boolean) => {
      if (visibleRef.current) {
        return;
      }

      visibleRef.current = true;
      controls.stop();

      if (!animate) {
        controls.set({
          opacity: 1,
          y: 0,
        });

        return;
      }

      void controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay,
          ease: "easeOut",
        },
      });
    };

    const hide = () => {
      if (!visibleRef.current) {
        return;
      }

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
    };

    if (reduceMotion) {
      show(false);
      return;
    }

    if (element.dataset.scrollRevealRestored === "true") {
      delete element.dataset.scrollRevealRestored;

      show(false);
    } else {
      visibleRef.current = false;

      controls.set({
        opacity: 0,
        y: distance,
      });
    }

    const evaluateVisibility = () => {
      frameRef.current = null;

      const rect = element.getBoundingClientRect();

      const viewportHeight = window.innerHeight;

      const visibleTop = Math.max(rect.top, 0);

      const visibleBottom = Math.min(rect.bottom, viewportHeight);

      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      const referenceHeight = Math.min(rect.height, viewportHeight);

      const visibleAmount =
        referenceHeight > 0 ? visibleHeight / referenceHeight : 0;

      const direction = scrollDirectionRef.current;

      if (visibleAmount >= revealThreshold) {
        show(true);
        return;
      }

      // Content coming back through the top should already feel discovered.
      if (direction === "up" && rect.top <= 0 && rect.bottom > 0) {
        show(false);
        return;
      }

      // Only hide when scrolling upward and the element leaves through the bottom.
      if (
        direction === "up" &&
        visibleAmount <= hideThreshold &&
        rect.top > 0
      ) {
        hide();
      }
    };

    const scheduleEvaluation = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(evaluateVisibility);
    };

    const observer = new IntersectionObserver(scheduleEvaluation, {
      threshold: [0, hideThreshold, revealThreshold, 1],
    });

    observer.observe(element);

    const firstFrame = window.requestAnimationFrame(evaluateVisibility);

    let secondFrame: number | null = null;

    secondFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(evaluateVisibility);
    });

    window.addEventListener("scroll", scheduleEvaluation, { passive: true });

    window.addEventListener("resize", scheduleEvaluation);

    return () => {
      observer.disconnect();

      window.removeEventListener("scroll", scheduleEvaluation);

      window.removeEventListener("resize", scheduleEvaluation);

      window.cancelAnimationFrame(firstFrame);

      if (secondFrame !== null) {
        window.cancelAnimationFrame(secondFrame);
      }

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [
    amount,
    controls,
    delay,
    distance,
    pathname,
    reduceMotion,
    scrollDirectionRef,
  ]);

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
