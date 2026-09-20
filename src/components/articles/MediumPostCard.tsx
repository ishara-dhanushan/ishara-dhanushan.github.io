// src/components/articles/MediumPostCard.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { MediumPost } from "@/lib/medium-feed";

export function MediumPostCard({ post }: { post: MediumPost }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const reduceMotion = useReducedMotion();

  const showImage = post.coverImage && !imageFailed;

  return (
    <motion.a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/75 bg-surface/50 transition-colors hover:border-primary/60"
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.015,
              y: -3,
            }
      }
      whileTap={
        reduceMotion
          ? undefined
          : {
              scale: 0.99,
            }
      }
      transition={{
        type: "spring",
        stiffness: 360,
        damping: 28,
        mass: 0.65,
      }}
    >
      <div className="aspect-video w-full overflow-hidden bg-background">
        {showImage ? (
          <motion.img
            src={post.coverImage as string}
            alt=""
            loading="lazy"
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                  }
            }
            animate={{
              opacity: imageLoaded ? 1 : 0,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.3,
            }}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.025]"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageFailed(true)}
          />
        ) : (
          // Local fallback: no extra asset file required — just the brand gradient.
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary-subtle to-background">
            <span className="font-mono text-xs uppercase tracking-wider text-primary-subtle-foreground">
              Medium
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {post.formattedDate && (
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {post.formattedDate}
          </p>
        )}

        <h3 className="mt-2 font-heading text-lg font-semibold text-foreground">
          {post.title}
        </h3>

        <p className="mt-3 text-sm text-muted-foreground">{post.excerpt}</p>

        <span className="mt-auto pt-4 text-sm font-medium text-primary group-hover:text-primary-hover">
          Read on Medium →
        </span>
      </div>
    </motion.a>
  );
}
