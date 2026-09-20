// src/components/layout/Footer.tsx
import { profile } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/75 bg-surface/50">
      <div className="mx-auto flex max-w-300 flex-col gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile.name}. Built with Next.js and Tailwind CSS.
        </p>
        <a
          href="#top"
          className="text-foreground transition-colors hover:text-primary"
        >
          Back to top
        </a>
      </div>
    </footer>
  );
}
