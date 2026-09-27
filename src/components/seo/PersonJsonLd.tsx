// src/components/seo/PersonJsonLd.tsx
import { profile } from "@/data/portfolio";
import { siteUrl } from "@/utils/siteUrl";

export function PersonJsonLd() {
  const websiteId = `${siteUrl}/#website`;
  const profilePageId = `${siteUrl}/#profile-page`;
  const personId = `${siteUrl}/#person`;

  // Home-page structured data graph describing the website, profile page,
  // and the person the portfolio is primarily about.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${siteUrl}/`,
        name: profile.name,
        alternateName: "ishara-dhanushan.github.io",
        creator: {
          "@id": personId,
        },
      },
      {
        "@type": "ProfilePage",
        "@id": profilePageId,
        url: `${siteUrl}/`,
        isPartOf: {
          "@id": websiteId,
        },
        mainEntity: {
          "@id": personId,
        },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        url: `${siteUrl}/`,
        email: `mailto:${profile.email}`,
        jobTitle: "Software Engineer",
        description: profile.summary,
        mainEntityOfPage: {
          "@id": profilePageId,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kurunegala",
          addressCountry: "LK",
        },
        affiliation: {
          "@type": "CollegeOrUniversity",
          name: "University of Kelaniya",
        },
        sameAs: [
          profile.socials.github,
          profile.socials.linkedin,
          profile.socials.medium,
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
