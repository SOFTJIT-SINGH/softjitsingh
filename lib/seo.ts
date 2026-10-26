import type { Metadata } from "next";
import { SITE } from "./constants";
import { writingPosts } from "./writing";

const OG_IMAGE = { url: "/og-image.png", width: 1200, height: 630, alt: `${SITE.name} — Full-Stack Engineer` };

export const PERSON_ID = `${SITE.domain}/#person`;

/**
 * Complete metadata for a page. Next.js does not merge a page's title into the root layout's
 * openGraph/twitter blocks, so every page sets its own, or link previews show the homepage.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; alt: string; width?: number; height?: number };
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  const images = [image ?? OG_IMAGE];
  const shareTitle = `${title} — ${SITE.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      title: shareTitle,
      description,
      url: `${SITE.domain}${path}`,
      siteName: SITE.name,
      locale: "en_IN",
      images,
      ...(publishedTime && { publishedTime, authors: [SITE.name] }),
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: images.map((i) => i.url),
      creator: "@softjit_singh",
    },
  };
}

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

/** "June 2026" → "2026-06" (ISO 8601 year-month), which search engines accept; the posts carry no day. */
export function isoMonth(date: string): string {
  const [month, year] = date.toLowerCase().split(/\s+/);
  const m = MONTHS.indexOf(month) + 1;
  return m > 0 && year ? `${year}-${String(m).padStart(2, "0")}` : date;
}

export function postMetadata(slug: string): Metadata {
  const post = writingPosts.find((p) => p.slug === slug)!;
  return {
    ...pageMetadata({
      title: post.title,
      description: post.description,
      path: `/writing/${slug}`,
      type: "article",
      publishedTime: isoMonth(post.date),
    }),
    keywords: [...post.tags, SITE.name],
  };
}

/** BreadcrumbList JSON-LD from [name, path] pairs, home first. */
export function breadcrumbs(trail: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE.domain}${path}`,
    })),
  };
}
