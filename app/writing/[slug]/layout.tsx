import type { Metadata } from "next";
import { writingPosts } from "@/lib/writing";
import { SITE } from "@/lib/constants";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = writingPosts.find((p) => p.slug === slug);

  if (!post) return {};

  const url = `${SITE.domain}/writing/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    keywords: [...post.tags, "Softjit Singh", "Full-Stack Engineer", "Technical Blog"],
    authors: [{ name: SITE.name, url: SITE.domain }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      siteName: `${SITE.name} Portfolio`,
      authors: [SITE.name],
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@softjit_singh",
    },
  };
}

export async function generateStaticParams() {
  return writingPosts.map((post) => ({ slug: post.slug }));
}

export default async function WritingPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = writingPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: SITE.name,
      url: SITE.domain,
    },
    publisher: {
      "@type": "Person",
      name: SITE.name,
    },
    datePublished: post.date,
    keywords: post.tags.join(", "),
    url: `${SITE.domain}/writing/${post.slug}`,
    mainEntityOfPage: `${SITE.domain}/writing/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {children}
    </>
  );
}
