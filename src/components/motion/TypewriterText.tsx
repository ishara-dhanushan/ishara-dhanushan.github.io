// src/components/motion/TypewriterText.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface TypewriterTextProps {
  words: string[];
  className?: string;
}

export function TypewriterText({ words, className }: TypewriterTextProps) {
  const reduceMotion = useReducedMotion();

  const [wordIndex, setWordIndex] = useState(0);

  const [displayedText, setDisplayedText] = useState("");

  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0 || reduceMotion) {
      return;
    }

    const currentWord = words[wordIndex % words.length] ?? "";

    const wordIsComplete = displayedText === currentWord;

    const textIsEmpty = displayedText.length === 0;

    // Typing is intentionally slower than deleting.
    let delay = isDeleting ? 45 : 75;

    // Hold completed role before backspacing.
    if (!isDeleting && wordIsComplete) {
      delay = 1400;
    }

    // Small pause before typing the next role.
    if (isDeleting && textIsEmpty) {
      delay = 300;
    }

    const timer = window.setTimeout(() => {
      if (!isDeleting) {
        if (wordIsComplete) {
          setIsDeleting(true);
          return;
        }

        setDisplayedText(currentWord.slice(0, displayedText.length + 1));

        return;
      }

      if (textIsEmpty) {
        setIsDeleting(false);

        setWordIndex((currentIndex) => (currentIndex + 1) % words.length);

        return;
      }

      setDisplayedText(
        currentWord.slice(0, Math.max(0, displayedText.length - 1))
      );
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [displayedText, isDeleting, reduceMotion, wordIndex, words]);

  if (words.length === 0) {
    return null;
  }

  const visibleText = reduceMotion ? (words[0] ?? "") : displayedText;

  return (
    <span className={className}>
      {/* Give screen readers the complete role list instead of reading every typed character. */}
      <span className="sr-only">{words.join(", ")}</span>

      <span aria-hidden="true">{visibleText}</span>

      <motion.span
        aria-hidden="true"
        className="ml-1 inline-block text-primary"
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [1, 0, 1],
              }
        }
        transition={{
          duration: 0.9,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        |
      </motion.span>
    </span>
  );
}
