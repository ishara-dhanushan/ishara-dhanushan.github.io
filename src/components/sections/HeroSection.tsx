// src/components/sections/HeroSection.tsx
"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TypewriterText } from "@/components/motion/TypewriterText";
import { ButtonAnchor } from "@/components/ui/ButtonAnchor";
import { profile } from "@/data/portfolio";
import { homeHref, scrollToSection } from "@/utils/scrollToSection";

export function HeroSection() {
  const resumeHref = profile.resumeUrl;

  return (
    <section id="top" className="mx-auto max-w-300 px-6 py-24 sm:py-32">
      {/* Constrain content to left, reserving right side for future profile image */}
      <div className="max-w-3xl">
        <ScrollReveal distance={30}>
          <p className="font-mono text-sm uppercase tracking-wider text-primary">
            Hi, I&apos;m
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.04} distance={34}>
          <h1 className="mt-3 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.08} distance={32}>
          <div className="mt-4 flex min-h-9 flex-wrap items-baseline gap-x-2 font-heading text-xl font-semibold sm:text-2xl">
            <span className="text-muted-foreground">I&apos;m a</span>

            <TypewriterText words={profile.roles} className="text-primary" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.12} distance={32}>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground">
            {profile.headline}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.16} distance={30}>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            {profile.summary}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2} distance={30}>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonAnchor
              href={homeHref}
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("projects");
              }}
            >
              View Projects
            </ButtonAnchor>

            <ButtonAnchor href={resumeHref} variant="secondary" external>
              Download CV
            </ButtonAnchor>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.24} distance={28}>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <a
              href={profile.socials.github}
              className="group inline-block transition-colors duration-200 hover:text-foreground"
            >
              <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5">
                GitHub
              </span>
            </a>

            <a
              href={profile.socials.linkedin}
              className="group inline-block transition-colors duration-200 hover:text-foreground"
            >
              <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5">
                LinkedIn
              </span>
            </a>

            <a
              href={profile.socials.medium}
              className="group inline-block transition-colors duration-200 hover:text-foreground"
            >
              <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5">
                Medium
              </span>
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="group inline-block transition-colors duration-200 hover:text-foreground"
            >
              <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5">
                Email
              </span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
