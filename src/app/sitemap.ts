// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { projects } from "@/data/portfolio";
import { siteUrl } from "@/utils/siteUrl";

export const dynamic = "force-static";

// Keep these dates accurate. Update only the page that received a significant
// content, structured-data, or link change rather than changing every build.
const HOME_LAST_MODIFIED = "2026-09-27";

const CASE_STUDY_LAST_MODIFIED: Record<string, string> = {
  constructpro: "2026-09-27",
  "kochi-guru-pizza": "2026-09-27",
  fuelwise: "2026-09-27",
};

function getCaseStudyLastModified(slug: string): string {
  const lastModified = CASE_STUDY_LAST_MODIFIED[slug];

  if (!lastModified) {
    throw new Error(
      `Missing sitemap lastModified date for case study: ${slug}`
    );
  }

  return lastModified;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyRoutes = projects
    .filter((project) => project.hasCaseStudy)
    .map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: getCaseStudyLastModified(project.slug),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [
    {
      url: siteUrl,
      lastModified: HOME_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...caseStudyRoutes,
  ];
}
