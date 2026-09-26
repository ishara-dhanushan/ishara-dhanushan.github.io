// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { projects } from "@/data/portfolio";
import { siteUrl } from "@/utils/siteUrl";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyRoutes = projects
    .filter((project) => project.hasCaseStudy)
    .map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...caseStudyRoutes,
  ];
}
