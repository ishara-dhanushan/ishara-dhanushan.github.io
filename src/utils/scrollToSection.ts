// src/utils/scrollToSection.ts
import { assetPrefix } from "@/utils/assetPrefix";

const PENDING_SECTION_KEY = "portfolio-pending-section";

export const SECTION_SCROLL_EVENT = "portfolio-section-scroll";
export const homeHref = `${assetPrefix}/`;

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }

  return path;
}

export function isHomePage() {
  if (typeof window === "undefined") {
    return false;
  }

  return normalizePath(window.location.pathname) === normalizePath(homeHref);
}

export function scrollToSection(sectionId: string) {
  if (typeof window === "undefined") {
    return;
  }

  if (!isHomePage()) {
    try {
      sessionStorage.setItem(PENDING_SECTION_KEY, sectionId);
    } catch {}

    window.location.assign(homeHref);
    return;
  }

  const section = document.getElementById(sectionId);

  if (!section) {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(SECTION_SCROLL_EVENT, {
      detail: { sectionId },
    })
  );

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function consumePendingSection() {
  if (typeof window === "undefined" || !isHomePage()) {
    return null;
  }

  try {
    const sectionId = sessionStorage.getItem(PENDING_SECTION_KEY);

    if (!sectionId) {
      return null;
    }

    sessionStorage.removeItem(PENDING_SECTION_KEY);

    return sectionId;
  } catch {
    return null;
  }
}
