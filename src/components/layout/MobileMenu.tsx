// src/components/layout/MobileMenu.tsx
"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface MobileMenuProps {
  links: { href: string; label: string }[];
  resumeHref: string;
}

export function MobileMenu({ links, resumeHref }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  const reduceMotion = useReducedMotion();

  return (
    <div className="md:hidden">
      <motion.button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
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
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
            className="absolute inset-x-0 top-16 border-b border-border bg-background px-6 py-6"
          >
            <nav className="flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}

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
