// src/lib/medium-feed.ts
// Browser-only adapter for the runtime Medium feed. Per the implementation
// plan (6.4), this must never run at build time — it is called exclusively
// from the MediumPostsFeed Client Component after hydration.

export interface MediumPost {
  id: string;
  title: string;
  link: string;
  publishedAt: string; // ISO date string
  formattedDate: string; // e.g. "12 Aug 2026"
  excerpt: string;
  coverImage: string | null;
  categories: string[];
}

interface MediumFeedResult {
  posts: MediumPost[];
  servedFromCache: boolean;
  error: string | null;
}

const CACHE_KEY = "medium-feed-cache:v1";
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes
const REQUEST_TIMEOUT_MS = 8000;
const EXCERPT_LENGTH = 160;

// Feed endpoint stays in an env var so the provider (rss2json, a Cloudflare
// Worker, etc.) can be swapped without touching any component.
const FEED_ENDPOINT = process.env.NEXT_PUBLIC_MEDIUM_FEED_API_URL ?? "";
const MAX_ITEMS = 6;

interface CacheShape {
  cachedAt: number;
  posts: MediumPost[];
}

/**
 * Raw item shape returned by rss2json-compatible providers.
 * Treated defensively — every field is read as unknown and validated before use.
 */
interface RawFeedItem {
  title?: unknown;
  link?: unknown;
  guid?: unknown;
  pubDate?: unknown;
  description?: unknown;
  content?: unknown;
  thumbnail?: unknown;
  enclosure?: { link?: unknown };
  categories?: unknown;
}

/**
 * Top-level response structure from the RSS-to-JSON API.
 */
interface RawFeedResponse {
  status?: unknown;
  message?: unknown;
  items?: unknown;
}

/**
 * Type guard to safely check if an unknown value is a non-null object record.
 */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/**
 * Strips HTML down to plain text using the browser's native DOMParser.
 * Avoids dangerouslySetInnerHTML and securely extracts clean textual content.
 */
function stripHtml(html: string): string {
  if (typeof window === "undefined" || !window.DOMParser) {
    // Defensive fallback if DOMParser is ever unavailable
    return html.replace(/<[^>]*>/g, " ");
  }
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent ?? "";
}

/**
 * Normalizes whitespace and truncates text to a maximum character length,
 * appending an ellipsis (…) if truncation occurred.
 */
function truncate(text: string, maxLength: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength).trimEnd()}…`;
}

/**
 * Formats an ISO-8601 date string into a user-friendly format (e.g., "13 May 2026").
 */
function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Detects whether an image URL is Medium's 1x1 statistical tracking pixel.
 * Medium appends a tracking pixel (medium.com/_/stat) at the end of every post's HTML.
 */
function isTrackingPixel(url: string): boolean {
  return /medium\.com\/_\/stat/i.test(url) || /stat\?event=/i.test(url);
}

/**
 * Decodes common XML/HTML entities found in image URLs or attributes (e.g. &amp; -> &).
 */
function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/**
 * Extracts primary cover image from thumbnail, enclosure, or HTML body,
 * ignoring tracking pixels to allow fallback to brand gradient.
 */
function extractCoverImage(item: RawFeedItem, html: string): string | null {
  // 1. Check thumbnail property
  if (
    typeof item.thumbnail === "string" &&
    item.thumbnail.length > 0 &&
    !isTrackingPixel(item.thumbnail)
  ) {
    return decodeHtmlEntities(item.thumbnail);
  }

  // 2. Check enclosure media link
  if (
    isRecord(item.enclosure) &&
    typeof item.enclosure.link === "string" &&
    item.enclosure.link.length > 0 &&
    !isTrackingPixel(item.enclosure.link)
  ) {
    return decodeHtmlEntities(item.enclosure.link);
  }

  // 3. Scan HTML body for content images (skipping tracking pixels)
  const imgMatches = html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi);
  for (const match of imgMatches) {
    const src = match[1];
    if (src && !isTrackingPixel(src)) {
      return decodeHtmlEntities(src);
    }
  }

  return null;
}

/**
 * Normalizes dates to ISO-8601 ("YYYY-MM-DDTHH:mm:ssZ") for cross-browser parsing.
 */
function parsePubDate(pubDateStr: string): string {
  if (!pubDateStr) return "";
  const normalized = pubDateStr.includes(" ")
    ? pubDateStr.replace(" ", "T") + "Z"
    : pubDateStr;
  const parsedDate = new Date(normalized);
  if (!Number.isNaN(parsedDate.getTime())) {
    return parsedDate.toISOString();
  }
  const fallbackDate = new Date(pubDateStr);
  return !Number.isNaN(fallbackDate.getTime())
    ? fallbackDate.toISOString()
    : "";
}

/**
 * Validates and maps an untrusted raw feed item into a structured MediumPost object.
 * Returns null if required fields (title, link) are missing or invalid.
 */
function normalizeItem(raw: unknown): MediumPost | null {
  if (!isRecord(raw)) return null;
  const item = raw as RawFeedItem;

  const title = typeof item.title === "string" ? item.title.trim() : "";
  const link = typeof item.link === "string" ? item.link : "";
  if (!title || !link) return null;

  const id =
    typeof item.guid === "string" && item.guid.length > 0 ? item.guid : link;

  const pubDate = typeof item.pubDate === "string" ? item.pubDate : "";
  const publishedAt = parsePubDate(pubDate);

  const rawHtml =
    (typeof item.content === "string" && item.content) ||
    (typeof item.description === "string" && item.description) ||
    "";
  const plainText = stripHtml(rawHtml);

  const categories = Array.isArray(item.categories)
    ? item.categories.filter((c): c is string => typeof c === "string")
    : [];

  return {
    id,
    title,
    link,
    publishedAt,
    formattedDate: publishedAt ? formatDate(publishedAt) : "",
    excerpt: truncate(plainText, EXCERPT_LENGTH),
    coverImage: extractCoverImage(item, rawHtml),
    categories,
  };
}

/**
 * Safely reads cached Medium posts from localStorage in the browser.
 * Returns null if running on the server, storage is inaccessible, or cache is missing/corrupt.
 */
function readCache(): CacheShape | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheShape;
    if (!Array.isArray(parsed.posts) || typeof parsed.cachedAt !== "number") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Writes fetched Medium posts and current timestamp to localStorage.
 * Silently ignores storage errors (e.g., quota exceeded or private browsing mode).
 */
function writeCache(posts: MediumPost[]): void {
  if (typeof window === "undefined") return;
  try {
    const payload: CacheShape = { cachedAt: Date.now(), posts };
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Storage full or disabled — feed will refetch on next load
  }
}

/**
 * Returns cached posts immediately (even if stale) for instant paint after hydration,
 * or null if nothing is cached yet.
 */
export function getCachedMediumPosts(): MediumPost[] | null {
  const cache = readCache();
  return cache?.posts.length ? cache.posts : null;
}

/**
 * Determines whether a cache entry is still within its validity duration (TTL).
 */
function isCacheFresh(cache: CacheShape): boolean {
  return Date.now() - cache.cachedAt < CACHE_TTL_MS;
}

/**
 * Fetches latest Medium articles with 8s timeout, caching in localStorage
 * and falling back to cached posts on failure.
 */
export async function fetchMediumPosts(): Promise<MediumFeedResult> {
  const cache = readCache();

  if (!FEED_ENDPOINT) {
    return {
      posts: cache?.posts ?? [],
      servedFromCache: Boolean(cache),
      error: "Medium feed endpoint is not configured.",
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(FEED_ENDPOINT, {
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Feed request failed with status ${response.status}`);
    }

    const data = (await response.json()) as RawFeedResponse;
    if (data.status !== "ok") {
      const errorMessage =
        typeof data.message === "string" && data.message.length > 0
          ? data.message
          : "Feed request returned non-OK status.";
      throw new Error(errorMessage);
    }
    const rawItems = Array.isArray(data.items) ? data.items : [];
    const posts = rawItems
      .map(normalizeItem)
      .filter((post): post is MediumPost => post !== null)
      .sort((a, b) => {
        if (!a.publishedAt || !b.publishedAt) return 0;
        return (
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
      })
      .slice(0, MAX_ITEMS);

    if (posts.length === 0) {
      // Nothing valid came back — prefer stale cache over an empty state
      return {
        posts: cache?.posts ?? [],
        servedFromCache: Boolean(cache),
        error: cache ? null : "No articles were returned by the feed.",
      };
    }

    writeCache(posts);
    return { posts, servedFromCache: false, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return {
      posts: cache?.posts ?? [],
      servedFromCache: Boolean(cache),
      error: message,
    };
  } finally {
    clearTimeout(timeout);
  }
}

export const mediumFeedInternals = {
  isCacheFresh,
  CACHE_TTL_MS,
};
