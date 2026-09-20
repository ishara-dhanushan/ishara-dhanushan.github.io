// src/components/sections/HeroSection.tsx
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ButtonAnchor } from "@/components/ui/ButtonAnchor";
import { profile } from "@/data/portfolio";

export function HeroSection() {
  const resumeHref = profile.resumeUrl;

  return (
    <section id="top" className="mx-auto max-w-300 px-6 py-24 sm:py-32">
      <ScrollReveal distance={30}>
        <p className="font-mono text-sm uppercase tracking-wider text-primary">
          {profile.eyebrow}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.04} distance={34}>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          {profile.headline}
        </h1>
      </ScrollReveal>

      <ScrollReveal delay={0.08} distance={32}>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          {profile.summary}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.12} distance={30}>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="#projects">View Projects</ButtonLink>

          <ButtonAnchor href={resumeHref} variant="secondary" external>
            Download CV
          </ButtonAnchor>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.16} distance={28}>
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
    </section>
  );
}
