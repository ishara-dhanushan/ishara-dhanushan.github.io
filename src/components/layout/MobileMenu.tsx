// src/components/layout/MobileMenu.tsx
"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ButtonAnchor } from "@/components/ui/ButtonAnchor";

interface MobileMenuProps {
  links: {
    id: string;
    label: string;
  }[];
  resumeHref: string;
  activeSection: string | null;
  onNavigate: (sectionId: string) => void;
}

export function MobileMenu({
  links,
  resumeHref,
  activeSection,
  onNavigate,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div className="md:hidden">
      <motion.button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((previous) => !previous)}
        whileTap={
          reduceMotion
            ? undefined
            : {
                scale: 0.92,
              }
        }
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border/75 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: -18,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={
              reduceMotion
                ? undefined
                : {
                    opacity: 0,
                    y: -18,
                  }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.22,
              ease: "easeOut",
            }}
            className="absolute inset-x-0 top-16 border-b border-border/75 bg-background/95 px-6 py-6 backdrop-blur"
          >
            <nav className="flex flex-col gap-4">
              {links.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <button
                    key={link.id}
                    type="button"
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => {
                      onNavigate(link.id);
                      setOpen(false);
                    }}
                    className={`text-left text-base transition-colors duration-200 ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}

              <div className="mt-2">
                <ButtonAnchor href={resumeHref} external>
                  Download CV
                </ButtonAnchor>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
