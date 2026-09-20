// src/components/sections/ContactSection.tsx
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ButtonAnchor } from "@/components/ui/ButtonAnchor";
import { profile } from "@/data/portfolio";

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-300 px-6 py-24 text-center">
      <ScrollReveal distance={34}>
        <div>
          <h2 className="font-heading text-3xl font-semibold text-foreground">
            Let&apos;s build useful software together.
          </h2>

          <p className="mt-4 text-muted-foreground">
            Open to software engineering opportunities and collaborations.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ButtonAnchor href={`mailto:${profile.email}`}>
              Email me
            </ButtonAnchor>

            <ButtonAnchor
              href={profile.socials.github}
              variant="secondary"
              external
            >
              GitHub
            </ButtonAnchor>

            <ButtonAnchor
              href={profile.socials.linkedin}
              variant="secondary"
              external
            >
              LinkedIn
            </ButtonAnchor>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
