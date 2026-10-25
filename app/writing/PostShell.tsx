import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { writingPosts } from "@/lib/writing";
import { SITE } from "@/lib/constants";
import { projectFor } from "@/lib/featured";

export default function PostShell({ slug, children }: { slug: string; children: React.ReactNode }) {
  const index = writingPosts.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const post = writingPosts[index];
  const project = projectFor(slug.split("-")[0]);
  const more = [1, 2].map((n) => writingPosts[(index + n) % writingPosts.length]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.description,
    author: { "@type": "Person", name: SITE.name, url: SITE.domain },
    datePublished: post.date,
    keywords: post.tags.join(", "),
    url: `${SITE.domain}/writing/${post.slug}`,
    mainEntityOfPage: `${SITE.domain}/writing/${post.slug}`,
  };

  return (
    <main className="min-h-screen bg-night text-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <article className="max-w-2xl mx-auto px-5 md:px-8 pt-12 md:pt-16 pb-24">
        <nav aria-label="Breadcrumb" className="mb-12 font-mono text-xs text-mist">
          <Link href="/writing" className="hover:text-cream">← writing</Link>
        </nav>

        <header className="mb-12">
          <p className="font-mono text-[11px] text-mist mb-5">
            {post.date.toLowerCase()} · {post.readTime.toLowerCase()} ·{" "}
            <span className="text-mint">{post.tags.slice(0, 3).join(", ").toLowerCase()}</span>
          </p>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.08] mb-6">{post.title}</h1>
          <p className="text-lg text-mist leading-relaxed">{post.description}</p>
          {project && (
            <Link
              href={`/projects/${project.slug}`}
              className="mt-8 inline-flex items-center gap-3 rounded-md border border-line px-3 py-2 font-mono text-[11px] text-mist hover:border-mint/40 hover:text-cream transition-colors"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${project.type.includes("Mobile") ? "bg-amber" : "bg-mint"}`} aria-hidden="true" />
              from the {project.title} case study →
            </Link>
          )}
        </header>

        <div className="border-t border-line mb-12" />

        <div className="space-y-6 text-cream/85 text-[16px] leading-[1.85]">{children}</div>

        <footer className="mt-20 border-t border-line pt-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-line">
              <Image src="/Haridwar.jpg" alt={SITE.name} fill sizes="56px" className="object-cover" />
            </div>
            <div>
              <p className="font-serif text-lg">Written by {SITE.name}</p>
              <p className="text-sm text-mist">
                Full-stack engineer in Amritsar.{" "}
                <Link href="/contact" className="text-mint hover:text-cream">
                  Have a similar problem? Let&apos;s talk →
                </Link>
              </p>
            </div>
          </div>

          <p className="font-mono text-xs text-mint mb-4">keep reading</p>
          <ul>
            {more.map((p) => (
              <li key={p.slug} className="border-t border-line last:border-b">
                <Link href={`/writing/${p.slug}`} className="group block py-5">
                  <p className="font-mono text-[11px] text-mist mb-1.5">{p.readTime.toLowerCase()}</p>
                  <p className="font-serif text-xl tracking-tight group-hover:text-mint transition-colors">{p.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </footer>
      </article>
    </main>
  );
}
