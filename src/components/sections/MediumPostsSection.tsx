// src/components/sections/MediumPostsSection.tsx
import { MediumPostsFeed } from "@/components/articles/MediumPostsFeed";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/portfolio";
import { fetchMediumPosts } from "@/lib/medium-feed";

// Server Component: fetches Medium posts during the static build so article
// content exists in the generated HTML. MediumPostsFeed then refreshes those
// posts in the browser after hydration to show newer publications.
export async function MediumPostsSection() {
  const buildFeed = await fetchMediumPosts("force-cache");
  const initialPosts = buildFeed.posts;

  return (
    <section id="articles">
      <div className="mx-auto max-w-300 px-6 py-20">
        <SectionHeading
          eyebrow="Writing"
          title="Latest articles"
          description="Recent articles, loaded live from Medium."
        />

        <MediumPostsFeed initialPosts={initialPosts} />

        <ScrollReveal distance={28}>
          <a
            href={profile.socials.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-block text-sm font-medium text-primary transition-colors duration-200 hover:text-primary-hover"
          >
            <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5">
              View all articles on Medium
            </span>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
