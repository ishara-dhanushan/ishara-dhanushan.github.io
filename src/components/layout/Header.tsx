// src/components/layout/Header.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { ButtonAnchor } from "@/components/ui/ButtonAnchor";
import { profile } from "@/data/portfolio";
import { assetPrefix } from "@/utils/assetPrefix";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  {
    id: "about",
    href: `${assetPrefix}/#about`,
    label: "About",
  },
  {
    id: "education",
    href: `${assetPrefix}/#education`,
    label: "Education",
  },
  {
    id: "experience",
    href: `${assetPrefix}/#experience`,
    label: "Experience",
  },
  {
    id: "projects",
    href: `${assetPrefix}/#projects`,
    label: "Projects",
  },
  {
    id: "tech-stack",
    href: `${assetPrefix}/#tech-stack`,
    label: "Tech Stack",
  },
  {
    id: "articles",
    href: `${assetPrefix}/#articles`,
    label: "Articles",
  },
  {
    id: "contact",
    href: `${assetPrefix}/#contact`,
    label: "Contact",
  },
];

export function Header() {
  const resumeHref = profile.resumeUrl;

  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Pauses scroll-spy during programmatic smooth scrolling so intermediate sections don't flash.
  const programmaticScrollRef = useRef(false);

  // Smooth scrolling emits many scroll events. We use a short debounce
  // to detect when those events have actually stopped.
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let animationFrameId: number | null = null;

    const updateActiveSection = () => {
      animationFrameId = null;

      // When right at the top of the page, no navbar section should be
      // highlighted because the user is viewing the hero rather than About.
      if (window.scrollY < 80) {
        setActiveSection(null);
        return;
      }

      const sections = navLinks
        .map((link) => ({
          id: link.id,
          element: document.getElementById(link.id),
        }))
        .filter(
          (
            section
          ): section is {
            id: string;
            element: HTMLElement;
          } => section.element !== null
        );

      if (sections.length === 0) {
        setActiveSection(null);
        return;
      }

      // A point around one-third down the viewport generally represents what
      // the user is actively reading better than the very top edge.
      const activationPoint = window.scrollY + window.innerHeight * 0.35;

      let currentSection: string | null = null;

      for (const section of sections) {
        const sectionTop =
          section.element.getBoundingClientRect().top + window.scrollY;

        if (sectionTop <= activationPoint) {
          currentSection = section.id;
        } else {
          break;
        }
      }

      // Contact can be shorter than the viewport, so explicitly mark it
      // as active when the bottom of the page has been reached.
      const reachedPageBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4;

      if (reachedPageBottom) {
        currentSection = "contact";
      }

      setActiveSection((previousSection) =>
        previousSection === currentSection ? previousSection : currentSection
      );
    };

    const finishProgrammaticScroll = () => {
      programmaticScrollRef.current = false;
      scrollEndTimerRef.current = null;

      updateActiveSection();
    };

    const scheduleScrollEnd = () => {
      if (scrollEndTimerRef.current !== null) {
        clearTimeout(scrollEndTimerRef.current);
      }

      // Every scroll event resets this timer. It therefore runs only after
      // smooth scrolling has actually stopped.
      scrollEndTimerRef.current = setTimeout(finishProgrammaticScroll, 140);
    };

    const handleScroll = () => {
      // Keep the clicked destination highlighted while smooth scrolling
      // passes through intermediate sections.
      if (programmaticScrollRef.current) {
        scheduleScrollEnd();
        return;
      }

      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(updateActiveSection);
    };

    const handleInternalNavigation = (event: MouseEvent) => {
      const clickedElement = event.target;

      if (!(clickedElement instanceof Element)) {
        return;
      }

      // The actual click may occur on a span/icon inside the anchor, so locate
      // the closest anchor rather than requiring event.target to be <a>.
      const anchor = clickedElement.closest("a[href]");

      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      // Only handle same-page navigation to avoid external URLs altering navbar state.
      const destination = new URL(anchor.href, window.location.href);

      const currentLocation = new URL(window.location.href);

      const isSamePage =
        destination.origin === currentLocation.origin &&
        destination.pathname === currentLocation.pathname &&
        destination.search === currentLocation.search;

      if (!isSamePage) {
        return;
      }

      const targetId = destination.hash.replace("#", "");

      if (!targetId) {
        return;
      }

      const isTopLink = targetId === "top";

      const isNavigationSection = navLinks.some((link) => link.id === targetId);

      // Ignore hashes that are unrelated to the portfolio navigation.
      if (!isTopLink && !isNavigationSection) {
        return;
      }

      // Pause scroll-spy before the browser begins smooth scrolling.
      programmaticScrollRef.current = true;

      if (isTopLink) {
        // The hero/top area has no navbar title, so clear the active state.
        setActiveSection(null);
      } else {
        // Highlight the destination immediately. It will remain highlighted
        // while the page smoothly scrolls toward it.
        setActiveSection(targetId);
      }

      // Handles cases where almost no scrolling occurs because the target
      // is already very close to the current position.
      if (scrollEndTimerRef.current !== null) {
        clearTimeout(scrollEndTimerRef.current);
      }

      scrollEndTimerRef.current = setTimeout(finishProgrammaticScroll, 300);
    };

    updateActiveSection();

    // Capture-phase listening means every same-page hash link is detected,
    // even when the clicked component also has its own click handler.
    document.addEventListener("click", handleInternalNavigation, true);

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      document.removeEventListener("click", handleInternalNavigation, true);

      window.removeEventListener("scroll", handleScroll);

      window.removeEventListener("resize", handleScroll);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      if (scrollEndTimerRef.current !== null) {
        clearTimeout(scrollEndTimerRef.current);
      }
    };
  }, []);

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
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.id}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`group py-2 text-sm transition-colors duration-200 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="relative inline-block">
                  {link.label}

                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-primary transition-transform duration-300 ease-out ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </span>
              </a>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <ButtonAnchor href={resumeHref} variant="secondary" external>
            Download CV
          </ButtonAnchor>
        </div>

        <MobileMenu
          links={navLinks}
          resumeHref={resumeHref}
          activeSection={activeSection}
        />
      </div>
    </header>
  );
}
