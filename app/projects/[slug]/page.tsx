import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { allProjects, featured, projectFor } from "@/lib/featured";
import { writingPosts } from "@/lib/writing";
import { SITE } from "@/lib/constants";
import CodeSketch from "@/app/components/home/CodeSketch";
import PhoneFrame from "@/app/components/PhoneFrame";
import Tilt from "@/app/components/motion/Tilt";
import { projectMetrics } from "@/lib/metrics";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectFor(slug);
  if (!project) return {};
  const ogImage = project.image || `${SITE.domain}/og-image.png`;
  return {
    title: `${project.title} — ${project.type}`,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} — ${project.type}`,
      description: project.description,
      url: `${SITE.domain}/projects/${project.slug}`,
      images: [{ url: ogImage, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${project.type}`,
      description: project.description,
      images: [ogImage],
    },
  };
}

function sourceLink(link: string) {
  if (!link) return null;
  if (link.includes("github.com")) return { href: link, label: "Source code ↗" };
  return { href: link, label: `Visit ${new URL(link).hostname} ↗` };
}

export default async function ProjectDetail({ params }: PageProps) {
  const { slug } = await params;
  const project = projectFor(slug);
  if (!project) notFound();

  const isMobile = project.type.includes("Mobile");
  const accent = isMobile ? "text-amber" : "text-mint";
  const feature = featured.find((f) => f.slug === project.slug);
  const post = writingPosts.find((p) => p.slug.startsWith(`${project.slug}-`));
  const source = sourceLink(project.link);

  const metrics = projectMetrics(project);

  const index = allProjects.findIndex((p) => p.slug === project.slug);
  const prev = allProjects[(index - 1 + allProjects.length) % allProjects.length];
  const next = allProjects[(index + 1) % allProjects.length];

  return (
    <main className="min-h-screen bg-night text-cream">
      <article className="max-w-6xl mx-auto px-5 md:px-10 pt-12 md:pt-16 pb-24">
        <nav aria-label="Breadcrumb" className="mb-12 font-mono text-xs text-mist">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-cream">home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/portfolio" className="hover:text-cream">projects</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-cream" aria-current="page">{project.slug}</li>
          </ol>
        </nav>

        <header className="grid md:grid-cols-12 gap-8 mb-14">
          <div className="md:col-span-8">
            <p className={`font-mono text-xs mb-4 ${accent}`}>{project.type.toLowerCase()}</p>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">{project.title}</h1>
            <p className="text-lg md:text-xl text-mist leading-relaxed max-w-2xl">{feature?.story ?? project.description}</p>
          </div>
          <div className="md:col-span-4 md:pt-10 flex flex-col gap-3 text-sm">
            {source && (
              <a href={source.href} target="_blank" rel="noopener noreferrer" className="rounded-md bg-mint px-5 py-3 text-center font-medium text-night hover:bg-cream transition-colors">
                {source.label}
              </a>
            )}
            {post && (
              <Link href={`/writing/${post.slug}`} className="rounded-md border border-line px-5 py-3 text-center hover:border-mist/50 transition-colors">
                Read the engineering write-up
              </Link>
            )}
            <Link href="/contact" className="px-5 py-2 text-center text-mist hover:text-cream transition-colors">
              Want something like this? Let&apos;s talk →
            </Link>
          </div>
        </header>

        {metrics.length > 0 && (
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 border-y border-line py-8 mb-16">
            {metrics.map((m) => (
              <div key={m.label}>
                <dd className="font-serif text-3xl md:text-4xl tracking-tight">{m.value}</dd>
                <dt className="mt-1 font-mono text-[11px] text-mist">{m.label}</dt>
              </div>
            ))}
          </dl>
        )}

        <figure className="mb-20">
          {isMobile ? (
            <div className="flex justify-center rounded-lg border border-line bg-[radial-gradient(ellipse_at_center,#16224a_0%,#0a0f1e_70%)] py-12">
              <div className="group animate-float">
                <Tilt max={10}>
                  <PhoneFrame src={project.image} alt={`${project.title} screenshot`} sizes="272px" priority className="w-[17rem]" />
                </Tilt>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-line bg-night-2 overflow-hidden shadow-[0_40px_100px_-50px_rgba(124,242,201,0.35)]">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line">
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="ml-3 font-mono text-[11px] text-mist">{project.slug}</span>
              </div>
              <div className="relative aspect-[16/9]">
                <Image src={project.image} alt={`${project.title} screenshot`} fill priority sizes="(max-width: 1152px) 100vw, 1072px" className="object-cover object-top" />
              </div>
            </div>
          )}
        </figure>

        <section className="grid md:grid-cols-12 gap-10 md:gap-12 mb-20">
          <div className="md:col-span-4">
            <p className={`font-mono text-xs mb-3 ${accent}`}>how it&apos;s built</p>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-6">What I did, and why it mattered.</h2>
            <ul className="flex flex-wrap gap-2">
              {project.techStack.map((t) => (
                <li key={t} className="rounded border border-line px-2 py-1 font-mono text-[11px] text-mist">{t}</li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-8 min-w-0">
            <ol>
              {project.bulletPoints.map((point, i) => (
                <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-6 last:border-b">
                  <span className={`font-mono text-xs pt-1 ${accent}`}>{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-cream/90 leading-relaxed">{point}</p>
                </li>
              ))}
            </ol>
            {feature && (
              <div className="mt-10">
                <CodeSketch file={feature.file} code={feature.code} />
              </div>
            )}
          </div>
        </section>

        {post && (
          <Link
            href={`/writing/${post.slug}`}
            className="group mb-20 block rounded-lg border border-line bg-night-2/60 p-6 md:p-8 hover:border-mint/40 transition-colors"
          >
            <p className="font-mono text-[11px] text-mint mb-3">
              the deep dive · {post.readTime.toLowerCase()}
            </p>
            <p className="font-serif text-2xl md:text-3xl tracking-tight group-hover:text-mint transition-colors">{post.title}</p>
            <p className="mt-3 text-mist max-w-2xl">{post.description}</p>
          </Link>
        )}

        <nav aria-label="More projects" className="grid sm:grid-cols-2 gap-4 border-t border-line pt-10">
          {[
            { p: prev, dir: "← previous" },
            { p: next, dir: "next →" },
          ].map(({ p, dir }) => (
            <Link
              key={dir}
              href={`/projects/${p.slug}`}
              className={`group rounded-lg border border-line p-5 hover:bg-night-2 transition-colors ${dir.startsWith("next") ? "sm:text-right" : ""}`}
            >
              <p className="font-mono text-[11px] text-mist mb-2">{dir}</p>
              <p className="font-serif text-2xl tracking-tight group-hover:text-mint transition-colors">{p.title}</p>
              <p className={`mt-1 font-mono text-[11px] ${p.type.includes("Mobile") ? "text-amber" : "text-mint"}`}>{p.type.toLowerCase()}</p>
            </Link>
          ))}
        </nav>
      </article>
    </main>
  );
}
