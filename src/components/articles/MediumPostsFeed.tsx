"use client";

// src/components/articles/MediumPostsFeed.tsx
// Client Component: this is the intentional exception to the static site.
// It loads Medium articles in the visitor's browser after hydration, on
// every page load, so new posts show up without a GitHub Actions redeploy.

import { useEffect, useState } from "react";
import { MediumPostCard } from "@/components/articles/MediumPostCard";
import { profile } from "@/data/portfolio";
import { fetchMediumPosts, getCachedMediumPosts } from "@/lib/medium-feed";
import type { MediumPost } from "@/lib/medium-feed";

type FeedStatus = "loading" | "success" | "empty" | "error";

function ArticleSkeleton() {
  return (
    <div className="h-64 animate-pulse rounded-2xl border border-border bg-surface" />
  );
}

export function MediumPostsFeed() {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [status, setStatus] = useState<FeedStatus>("loading");

  useEffect(() => {
    let cancelled = false;

    // Load from cache immediately on mount after hydration
    const cached = getCachedMediumPosts();
    if (cached && cached.length > 0) {
      queueMicrotask(() => {
        if (!cancelled) {
          setPosts(cached);
          setStatus("success");
        }
      });
    }

    fetchMediumPosts().then((result) => {
      if (cancelled) return;

      if (result.posts.length === 0) {
        if (!cached || cached.length === 0) {
          setStatus(result.error ? "error" : "empty");
        }
        return;
      }

      setPosts(result.posts);
      setStatus("success");
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ArticleSkeleton />
        <ArticleSkeleton />
        <ArticleSkeleton />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mt-10 rounded-2xl border border-danger/40 bg-surface p-6 text-sm text-muted-foreground">
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
      <div className="mt-10 rounded-2xl border border-border bg-surface p-6 text-sm text-muted-foreground">
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
      {posts.map((post) => (
        <div key={post.id} className="h-full">
          <MediumPostCard post={post} />
        </div>
      ))}
    </div>
  );
}
