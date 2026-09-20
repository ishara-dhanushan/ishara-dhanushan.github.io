// src/components/layout/Header.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ButtonAnchor } from "@/components/ui/ButtonAnchor";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { profile } from "@/data/portfolio";
import {
  consumePendingSection,
  isHomePage,
  scrollToSection,
  SECTION_SCROLL_EVENT,
} from "@/utils/scrollToSection";

const navLinks = [
  {
    id: "about",
    label: "About",
  },
  {
    id: "education",
    label: "Education",
  },
  {
    id: "experience",
    label: "Experience",
  },
  {
    id: "projects",
    label: "Projects",
  },
  {
    id: "tech-stack",
    label: "Tech Stack",
  },
  {
    id: "articles",
    label: "Articles",
  },
  {
    id: "contact",
    label: "Contact",
  },
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const resumeHref = profile.resumeUrl;

  const [activeSection, setActiveSection] = useState<string | null>(null);

  const programmaticScrollRef = useRef(false);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNavigate = (sectionId: string) => {
    scrollToSection(sectionId, router);
  };

  useEffect(() => {
    let animationFrameId: number | null = null;

    const updateActiveSection = () => {
      animationFrameId = null;

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

      // Use a point inside the viewport to represent the section being read.
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

      scrollEndTimerRef.current = setTimeout(finishProgrammaticScroll, 140);
    };

    const handleScroll = () => {
      if (programmaticScrollRef.current) {
        scheduleScrollEnd();
        return;
      }

      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(updateActiveSection);
    };

    const handleSectionNavigation = (event: Event) => {
      const sectionEvent = event as CustomEvent<{
        sectionId: string;
      }>;

      const sectionId = sectionEvent.detail?.sectionId;

      if (!sectionId) {
        return;
      }

      programmaticScrollRef.current = true;

      const isNavigationSection = navLinks.some(
        (link) => link.id === sectionId
      );

      setActiveSection(
        sectionId === "top" ? null : isNavigationSection ? sectionId : null
      );

      if (scrollEndTimerRef.current !== null) {
        clearTimeout(scrollEndTimerRef.current);
      }

      scrollEndTimerRef.current = setTimeout(finishProgrammaticScroll, 300);
    };

    window.addEventListener(SECTION_SCROLL_EVENT, handleSectionNavigation);

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    updateActiveSection();

    return () => {
      window.removeEventListener(SECTION_SCROLL_EVENT, handleSectionNavigation);

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

  // Handle section scrolling after client-side route transitions to homepage.
  useEffect(() => {
    if (!isHomePage()) {
      return;
    }

    const pendingSection = consumePendingSection();

    if (!pendingSection) {
      return;
    }

    let innerFrameId: number | null = null;
    const outerFrameId = window.requestAnimationFrame(() => {
      innerFrameId = window.requestAnimationFrame(() => {
        scrollToSection(pendingSection);
      });
    });

    return () => {
      window.cancelAnimationFrame(outerFrameId);
      if (innerFrameId !== null) {
        window.cancelAnimationFrame(innerFrameId);
      }
    };
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/75 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-300 items-center justify-between px-6">
        <button
          type="button"
          onClick={() => handleNavigate("top")}
          className="font-heading text-lg font-semibold text-foreground"
        >
          {profile.initials}
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <button
                key={link.id}
                type="button"
                aria-current={isActive ? "location" : undefined}
                onClick={() => handleNavigate(link.id)}
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
              </button>
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
          onNavigate={handleNavigate}
        />
      </div>
    </header>
  );
}
