// src/components/seo/PersonJsonLd.tsx
import { profile } from "@/data/portfolio";
import { siteUrl } from "@/utils/siteUrl";

export function PersonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl,
    email: `mailto:${profile.email}`,
    jobTitle: profile.roles[0],
    description: profile.summary,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kurunegala",
      addressCountry: "LK",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Kelaniya",
    },
    sameAs: [
      profile.socials.github,
      profile.socials.linkedin,
      profile.socials.medium,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
