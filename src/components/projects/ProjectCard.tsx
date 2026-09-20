// src/components/projects/ProjectCard.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/types/portfolio";

export function ProjectCard({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="flex h-full flex-col rounded-2xl border border-border/75 bg-surface/50 p-6 transition-colors hover:border-primary/60"
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.015,
              y: -3,
            }
      }
      transition={{
        type: "spring",
        stiffness: 360,
        damping: 28,
        mass: 0.65,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-heading text-lg font-semibold text-foreground">
          {project.title}
        </h3>

        <span className="shrink-0 font-mono text-xs text-muted-foreground">
          {project.ownership}
        </span>
      </div>

      <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {project.category}
      </p>

      <p className="mt-4 text-sm text-muted-foreground">{project.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        {project.hasCaseStudy && (
          <motion.a
            href={`projects/${project.slug}/`}
            className="font-medium text-primary hover:text-primary-hover"
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          >
            View Case Study
          </motion.a>
        )}

        {project.links.github && (
          <motion.a
            href={project.links.github}
            className="text-muted-foreground hover:text-foreground"
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          >
            GitHub
          </motion.a>
        )}

        {project.links.demo && (
          <motion.a
            href={project.links.demo}
            className="text-muted-foreground hover:text-foreground"
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          >
            Live Demo
          </motion.a>
        )}

        {project.links.video && (
          <motion.a
            href={project.links.video}
            className="text-muted-foreground hover:text-foreground"
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          >
            Demo Video
          </motion.a>
        )}

        {project.links.figma && (
          <motion.a
            href={project.links.figma}
            className="text-muted-foreground hover:text-foreground"
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          >
            Figma Design
          </motion.a>
        )}
      </div>
    </motion.article>
  );
}
