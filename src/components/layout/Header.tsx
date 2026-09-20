// src/components/layout/Header.tsx
import { ButtonAnchor } from "@/components/ui/ButtonAnchor";
import { profile } from "@/data/portfolio";
import { MobileMenu } from "./MobileMenu";
import { assetPrefix } from "@/utils/assetPrefix";

const navLinks = [
  { href: `${assetPrefix}/#about`, label: "About" },
  { href: `${assetPrefix}/#education`, label: "Education" },
  { href: `${assetPrefix}/#experience`, label: "Experience" },
  { href: `${assetPrefix}/#projects`, label: "Projects" },
  { href: `${assetPrefix}/#tech-stack`, label: "Tech Stack" },
  { href: `${assetPrefix}/#articles`, label: "Articles" },
  { href: `${assetPrefix}/#contact`, label: "Contact" },
];

export function Header() {
  const resumeHref = profile.resumeUrl;

  return (
    <header className="sticky top-0 z-50 border-b border-border/75 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-300 items-center justify-between px-6">
        <a
          href={`${assetPrefix}/#top`}
          className="font-heading text-lg font-semibold text-foreground"
        >
          {profile.initials}
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <ButtonAnchor href={resumeHref} variant="secondary" external>
            Download CV
          </ButtonAnchor>
        </div>

        <MobileMenu links={navLinks} resumeHref={resumeHref} />
      </div>
    </header>
  );
}
