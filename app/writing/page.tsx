import type { Metadata } from "next";
import Link from "next/link";
import { writingPosts } from "@/lib/writing";
import { PAGE_META } from "@/lib/constants";
import { projectFor } from "@/lib/featured";

export const metadata: Metadata = {
  title: PAGE_META.writing.title,
  description: PAGE_META.writing.description,
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  return (
    <main className="min-h-screen bg-night text-cream">
      <div className="max-w-6xl mx-auto px-5 md:px-10 pt-16 md:pt-24 pb-24">
        <p className="font-mono text-xs text-mint mb-6">writing · {writingPosts.length} posts</p>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight leading-[1.02] mb-6 max-w-4xl">
          Notes from production.
        </h1>
        <p className="text-lg text-mist max-w-2xl leading-relaxed mb-16">
          Each post takes one real problem from a project I shipped: what broke or what was hard, what I tried, and the
          design that held up. PostgreSQL locks, Redis caching, WebSocket sync, multi-tenant schemas, ML services.
        </p>

        <ul data-stagger>
          {writingPosts.map((post, i) => {
            const project = projectFor(post.slug.split("-")[0]);
            return (
              <li key={post.slug} className="border-t border-line last:border-b">
                <Link
                  href={`/writing/${post.slug}`}
                  className="group grid md:grid-cols-[4rem_1fr_12rem] gap-x-6 gap-y-3 py-8 hover:bg-night-2/50 -mx-3 px-3 rounded transition-colors"
                >
                  <span className="font-mono text-xs text-mist pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h2 className="font-serif text-2xl md:text-3xl tracking-tight leading-snug group-hover:text-mint transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-mist leading-relaxed max-w-2xl">{post.description}</p>
                  </div>
                  <div className="font-mono text-[11px] text-mist md:text-right space-y-1.5 md:pt-2">
                    <p>{post.date.toLowerCase()} · {post.readTime.toLowerCase()}</p>
                    {project && (
                      <p className={project.type.includes("Mobile") ? "text-amber" : "text-mint"}>{project.title.toLowerCase()}</p>
                    )}
                    <p className="text-mist/70">{post.tags.slice(0, 2).join(", ").toLowerCase()}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
