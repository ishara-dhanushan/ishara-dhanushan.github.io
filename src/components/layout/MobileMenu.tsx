// src/components/layout/MobileMenu.tsx
"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface MobileMenuProps {
  links: {
    id: string;
    href: string;
    label: string;
  }[];

  resumeHref: string;
  activeSection: string | null;
}

export function MobileMenu({
  links,
  resumeHref,
  activeSection,
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
                  <a
                    key={link.id}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`text-base transition-colors duration-200 ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}

              <a
                href={resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground"
              >
                Download CV
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
