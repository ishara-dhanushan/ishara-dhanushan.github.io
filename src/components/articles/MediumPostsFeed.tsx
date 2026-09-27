"use client";

// src/components/articles/MediumPostsFeed.tsx
// Client Component: receives build-time Medium posts for the initial static
// HTML, then refreshes them in the visitor's browser after hydration so new
// publications appear without requiring a GitHub Pages redeployment.

import { useEffect, useMemo, useRef, useState } from "react";
import { MediumPostCard } from "@/components/articles/MediumPostCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { profile } from "@/data/portfolio";
import { fetchMediumPosts, getCachedMediumPosts } from "@/lib/medium-feed";
import type { MediumPost } from "@/lib/medium-feed";

type FeedStatus = "loading" | "success" | "empty" | "error";

interface MediumPostsFeedProps {
  initialPosts: MediumPost[];
}

function ArticleSkeleton() {
  return (
    <div className="h-64 animate-pulse rounded-2xl border border-border/75 bg-surface/50" />
  );
}

let memoryPosts: MediumPost[] | null = null;
let memoryStatus: FeedStatus | null = null;

export function MediumPostsFeed({ initialPosts }: MediumPostsFeedProps) {
  const startingPosts = memoryPosts ?? initialPosts;

  const [posts, setPosts] = useState<MediumPost[]>(() => startingPosts);
  const [status, setStatus] = useState<FeedStatus>(
    () => memoryStatus ?? (startingPosts.length > 0 ? "success" : "loading")
  );

  const fetchedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const cached = getCachedMediumPosts();

    // Prefer cached posts after hydration until fresh data is fetched from the API,
    // since the cache may contain newer articles than the last static build.
    if (!memoryPosts && cached && cached.length > 0) {
      queueMicrotask(() => {
        if (!cancelled) {
          memoryPosts = cached;
          memoryStatus = "success";
          setPosts(cached);
          setStatus("success");
        }
      });
    }

    async function load() {
      const result = await fetchMediumPosts();

      if (cancelled) return;

      if (result.posts.length > 0) {
        memoryPosts = result.posts;
        memoryStatus = "success";
        setPosts(result.posts);
        setStatus("success");
      } else if (
        !memoryPosts &&
        initialPosts.length === 0 &&
        (!cached || cached.length === 0)
      ) {
        const nextStatus = result.error ? "error" : "empty";

        memoryStatus = nextStatus;
        setStatus(nextStatus);
      }
    }

    // initialPosts deliberately does not stop this request. The static posts are
    // the SEO/fallback content; this request replaces them with the newest feed.
    if (!fetchedRef.current && !memoryPosts) {
      fetchedRef.current = true;
      load();
    }

    return () => {
      cancelled = true;
    };
  }, [initialPosts]);

  const skeletons = useMemo(
    () => (
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ArticleSkeleton />
        <ArticleSkeleton />
        <ArticleSkeleton />
      </div>
    ),
    []
  );

  const renderedPosts = useMemo(
    () =>
      posts.map((post, index) => (
        <ScrollReveal
          key={post.id}
          className="h-full"
          delay={(index % 3) * 0.05}
          distance={34}
        >
          <MediumPostCard post={post} />
        </ScrollReveal>
      )),
    [posts]
  );

  if (status === "loading") {
    return skeletons;
  }

  if (status === "error") {
    return (
      <div className="mt-10 rounded-2xl border border-danger/40 bg-surface/50 p-6 text-sm text-muted-foreground">
        Couldn&apos;t load the latest articles right now.{" "}
        <a
          href={profile.socials.medium}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary hover:text-primary-hover"
        >
          Read them directly on Medium
        </a>
        .
      </div>
    );
  }

  if (status === "empty") {
    return (
      <div className="mt-10 rounded-2xl border border-border/75 bg-surface/50 p-6 text-sm text-muted-foreground">
        No articles to show yet.{" "}
        <a
          href={profile.socials.medium}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary hover:text-primary-hover"
        >
          Visit the Medium profile
        </a>{" "}
        for the full archive.
      </div>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {renderedPosts}
    </div>
  );
}
