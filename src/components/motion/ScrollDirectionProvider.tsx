// src/components/motion/ScrollDirectionProvider.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

type ScrollDirection = "up" | "down";

type ScrollDirectionRef = {
  current: ScrollDirection;
};

const ScrollDirectionContext = createContext<ScrollDirectionRef | null>(null);

export function ScrollDirectionProvider({ children }: { children: ReactNode }) {
  const directionRef = useRef<ScrollDirection>("down");
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollYRef.current;

      // Ignore tiny scroll changes caused by browser rounding,
      // touch inertia, or layout settling.
      if (Math.abs(difference) >= 2) {
        directionRef.current = difference > 0 ? "down" : "up";
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ScrollDirectionContext.Provider value={directionRef}>
      {children}
    </ScrollDirectionContext.Provider>
  );
}

export function useScrollDirectionRef() {
  const context = useContext(ScrollDirectionContext);

  if (context === null) {
    throw new Error(
      "useScrollDirectionRef must be used within ScrollDirectionProvider"
    );
  }

  return context;
}
