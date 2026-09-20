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

const SCROLL_POSITION_KEY = "portfolio-scroll-position";
const ScrollDirectionContext = createContext<ScrollDirectionRef | null>(null);

export function ScrollDirectionProvider({ children }: { children: ReactNode }) {
  const directionRef = useRef<ScrollDirection>("down");
  const lastScrollYRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    let storedScrollY = 0;

    try {
      const value = Number(sessionStorage.getItem(SCROLL_POSITION_KEY));
      storedScrollY = Number.isFinite(value) ? value : 0;
      sessionStorage.removeItem(SCROLL_POSITION_KEY);
    } catch {}

    let restoreFrame = 0;
    let restoreFrameId: number | null = null;

    // Restore content that has already reached the top of the viewport.
    const restoreReachedContent = () => {
      const restoredScrollY = Math.max(storedScrollY, window.scrollY);

      if (restoredScrollY > 0) {
        document
          .querySelectorAll<HTMLElement>("[data-scroll-reveal]")
          .forEach((element) => {
            const rect = element.getBoundingClientRect();

            if (rect.top < 0) {
              element.dataset.scrollRevealRestored = "true";
              element.style.opacity = "1";
              element.style.transform = "translateY(0px)";
            }
          });
      }

      restoreFrame += 1;

      if (restoreFrame < 20) {
        restoreFrameId = window.requestAnimationFrame(restoreReachedContent);
      }
    };

    restoreFrameId = window.requestAnimationFrame(restoreReachedContent);

    const updateDirection = () => {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollYRef.current;

      if (Math.abs(difference) >= 3) {
        directionRef.current = difference > 0 ? "down" : "up";
        lastScrollYRef.current = currentScrollY;
      }

      frameRef.current = null;
    };

    const handleScroll = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(updateDirection);
    };

    // Keep a fallback position for browsers that restore scrolling after React mounts.
    const saveScrollPosition = () => {
      try {
        sessionStorage.setItem(SCROLL_POSITION_KEY, String(window.scrollY));
      } catch {}
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pagehide", saveScrollPosition);
    window.addEventListener("beforeunload", saveScrollPosition);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pagehide", saveScrollPosition);
      window.removeEventListener("beforeunload", saveScrollPosition);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      if (restoreFrameId !== null) {
        window.cancelAnimationFrame(restoreFrameId);
      }
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
