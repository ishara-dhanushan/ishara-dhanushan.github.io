"use client";

// src/components/articles/MediumPostsFeed.tsx
// Client Component: this is the intentional exception to the static site.
// It loads Medium articles in the visitor's browser after hydration, on
// every page load, so new posts show up without a GitHub Actions redeploy.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MediumPostCard } from "@/components/articles/MediumPostCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { profile } from "@/data/portfolio";
import { fetchMediumPosts, getCachedMediumPosts } from "@/lib/medium-feed";
import type { MediumPost } from "@/lib/medium-feed";

type FeedStatus = "loading" | "success" | "empty" | "error";

function ArticleSkeleton() {
  return (
    <div className="h-64 animate-pulse rounded-2xl border border-border/75 bg-surface/50" />
  );
}

export function MediumPostsFeed() {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [status, setStatus] = useState<FeedStatus>("loading");
  const hasFetchedRef = useRef(false);

  const cachedPosts = useMemo(() => getCachedMediumPosts(), []);

  const loadPosts = useCallback(async () => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    if (cachedPosts && cachedPosts.length > 0) {
      setPosts(cachedPosts);
      setStatus("success");
    }

    try {
      const result = await fetchMediumPosts();
      if (result.posts.length > 0) {
        setPosts(result.posts);
        setStatus("success");
      } else if (!cachedPosts || cachedPosts.length === 0) {
        setStatus(result.error ? "error" : "empty");
      }
    } catch {
      if (!cachedPosts || cachedPosts.length === 0) {
        setStatus("error");
      }
    }
  }, [cachedPosts]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

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
