// src/components/case-study/CaseStudyHero.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ButtonAnchor } from "@/components/ui/ButtonAnchor";
import { Tag } from "@/components/ui/Tag";
import type { ProjectLinks } from "@/types/portfolio";
import { assetPrefix } from "@/utils/assetPrefix";

interface CaseStudyHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  role: string;
  scope: string;
  status: string;
  stack: string[];
  links: ProjectLinks;
  focus: string[];
}

export function CaseStudyHero({
  eyebrow,
  title,
  description,
  role,
  scope,
  status,
  stack,
  links,
  focus,
}: CaseStudyHeroProps) {
  const meta = [
    ["Role", role],
    ["Project", scope],
    ["Status", status],
  ];

  return (
    <>
      <section className="mx-auto max-w-300 px-6 py-24 sm:py-32">
        <ScrollReveal distance={22}>
          <Link
            href="/"
            scroll={false}
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            <ArrowLeft
              size={16}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Back to portfolio
          </Link>
        </ScrollReveal>

        <div className="mt-10 max-w-4xl">
          <ScrollReveal delay={0.04} distance={28}>
            <p className="font-mono text-sm uppercase tracking-wider text-primary">
              {eyebrow}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08} distance={32}>
            <h1 className="mt-3 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              {title}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.12} distance={30}>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground">
              {description}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.16} distance={28}>
            <div className="mt-8 flex flex-wrap gap-4">
              {links.demo && (
                <ButtonAnchor href={links.demo} external>
                  <ExternalLink size={16} aria-hidden="true" />
                  Live Demo
                </ButtonAnchor>
              )}

              {links.github && (
                <ButtonAnchor href={links.github} variant="secondary" external>
                  <Image
                    src={`${assetPrefix}/logos/github-white-icon.svg`}
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden="true"
                  />
                  GitHub
                </ButtonAnchor>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} distance={26}>
            <div className="mt-8 flex flex-wrap gap-2">
              {stack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.24} distance={24}>
            <div className="mt-10 grid max-w-3xl gap-x-10 gap-y-3 sm:grid-cols-2">
              {focus.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 text-sm leading-6 text-muted-foreground"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />

                  <span>{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-y border-border/75 bg-surface/50">
        <div className="mx-auto grid max-w-300 grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-3">
          {meta.map(([label, value], index) => (
            <ScrollReveal key={label} delay={index * 0.04} distance={24}>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {label}
                </p>

                <p className="mt-2 text-sm text-foreground">{value}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
