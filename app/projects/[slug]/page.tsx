import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaGithub, FaServer, FaShieldAlt, FaChartLine, FaLightbulb, FaCheckCircle, FaBookOpen } from "react-icons/fa";
import { mobileProjects, webProjects } from "@/lib/data";
import { writingPosts } from "@/lib/writing";
import { SITE } from "@/lib/constants";
import ProjectVisualFallback from "@/app/components/ProjectVisualFallback";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [...mobileProjects, ...webProjects].map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = [...mobileProjects, ...webProjects].find((p) => p.slug === slug);
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${project.type}`,
      description: project.description,
      images: [ogImage],
    },
  };
}

function extractMetrics(text: string): { value: string; label: string } | null {
  const patterns = [
    { regex: /(\d+)\+?\s*concurrent users/i, label: (m: string) => `${m.match(/\d+/)?.[0]}+ Users` },
    { regex: /<(\d+)ms\s*(p\d+)?\s*media latency/i, label: (m: string) => `<${m.match(/<(\d+)/)?.[1]}ms Latency` },
    { regex: /(\d+)%\s*reduction/i, label: (m: string) => `${m.match(/(\d+)/)?.[1]}% Reduction` },
    { regex: /(\d+)%\s*improvement/i, label: (m: string) => `${m.match(/(\d+)/)?.[1]}% Faster` },
    { regex: /(\d+)\+?\s*API\s*domain/i, label: (m: string) => `${m.match(/(\d+)/)?.[0]}+ APIs` },
    { regex: /(\d+)\+?\s*API\s*route/i, label: (m: string) => `${m.match(/(\d+)/)?.[0]}+ Routes` },
    { regex: /(\d+)\+?\s*%\s*unit test coverage/i, label: (m: string) => `${m.match(/(\d+)/)?.[0]}% Coverage` },
    { regex: /(\d+)K\+?\s*monthly request/i, label: (m: string) => `${m.match(/(\d+)/)?.[0]}K+ Monthly` },
    { regex: /zero\s*double-charge/i, label: () => "Zero Payment Failures" },
    { regex: /sub-?100ms/i, label: () => "<100ms Sync" },
  ];
  for (const p of patterns) {
    const match = text.match(p.regex);
    if (match) return { value: p.label(text), label: p.label(text) };
  }
  return null;
}

export default async function ProjectDetail({ params }: PageProps) {
  const { slug } = await params;

  const allProjects = [...mobileProjects, ...webProjects];
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const isMobile = project.type.includes("Mobile");
  const metrics = project.bulletPoints.map((b) => extractMetrics(b)).filter(Boolean) as { value: string; label: string }[];
  const projectToBlog: Record<string, string> = {
    healchakra: "healchakra-row-level-locks",
    bhojpos: "bhojpos-redis-caching",
    bidnexus: "bidnexus-optimistic-ui",
    secretsoulmate: "secretsoulmate-gemini-ai",
  };
  const relatedBlogSlug = projectToBlog[project.slug];

  const otherProjects = allProjects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <article className="relative min-h-screen bg-black text-gray-100 font-sans">
      <div className="absolute inset-0 z-0 opacity-20 blur-[150px] pointer-events-none select-none" aria-hidden="true">
        {project.image && <Image src={project.image} alt="" fill className="object-cover" />}
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/95 to-black pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 p-6 md:p-16 max-w-5xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-gray-500 font-mono">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/portfolio" className="hover:text-white transition-colors">Projects</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-300" aria-current="page">{project.title}</li>
          </ol>
        </nav>

        <Link
          href="/portfolio"
          className="inline-flex items-center text-gray-500 hover:text-white transition-colors mb-10 group text-sm font-medium"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-3 group-hover:bg-white/10 transition-colors">
            <FaArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
          </div>
          Back to Projects
        </Link>

        <header className="mb-12">
          <div className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-3">
            {project.type}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tighter text-white">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </header>

        {metrics.length > 0 && (
          <section className="mb-16 bg-white/[0.03] border border-white/10 rounded-2xl p-6" aria-label="Key results">
            <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-4">Key Results</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {metrics.slice(0, 4).map((m, i) => {
                const [val, ...rest] = m.value.split(" ");
                return (
                  <div key={i} className="text-center">
                    <div className="text-lg md:text-2xl font-bold text-white tracking-tight font-mono">
                      {val}
                    </div>
                    <div className="text-xs text-gray-500 font-mono mt-1">
                      {rest.join(" ")}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <div className="w-full mb-16 relative">
          <div className={`relative w-full ${isMobile ? "max-w-sm mx-auto" : ""} rounded-xl border border-white/10 bg-zinc-950 overflow-hidden shadow-2xl`}>
            <div className={`${isMobile ? "aspect-[9/19]" : "aspect-video"} relative`}>
              {project.image ? (
                <Image src={project.image} alt={`${project.title} screenshot`} fill className="object-cover" priority />
              ) : (
                <ProjectVisualFallback
                  title={project.title}
                  type={project.type}
                  techStack={project.techStack}
                  slug={project.slug}
                  isMobile={isMobile}
                />
              )}
            </div>
          </div>
        </div>

        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <FaServer className="text-blue-400 text-lg" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-white">Architecture & Implementation</h2>
          </div>
          <ol className="space-y-4">
            {project.bulletPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-4 bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:border-blue-500/20 hover:bg-blue-500/[0.02] transition-all">
                <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-400 text-[10px] font-mono font-bold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">{point}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-16 bg-gradient-to-br from-blue-500/[0.03] to-transparent border border-blue-500/10 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <FaLightbulb className="text-blue-400 text-lg" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-white">Engineering Decisions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: <FaShieldAlt className="text-blue-400" />, label: "Security", desc: "Zod schema validation + RBAC on all endpoints. Row-level security for multi-tenant isolation." },
              { icon: <FaChartLine className="text-blue-400" />, label: "Performance", desc: "Targeted PostgreSQL indexing for sub-100ms query times. Redis caching for API response reduction." },
              { icon: <FaCheckCircle className="text-blue-400" />, label: "Reliability", desc: "Race-condition-proof transactions via row-level locks. Idempotent payment reconciliation." },
              { icon: <FaServer className="text-blue-400" />, label: "Scale", desc: isMobile ? "Supabase Realtime for live state sync across concurrent mobile clients." : "LiveKit WebRTC for sub-150ms media routing at scale. WebSocket sync for real-time state." },
            ].map((item, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:border-blue-500/20 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg" aria-hidden="true">{item.icon}</span>
                  <span className="text-sm font-semibold text-white">{item.label}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-semibold text-gray-400 mb-4 font-mono tracking-widest uppercase">Technology Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <span
                key={t}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-200 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap justify-center gap-4 pt-12 border-t border-white/10">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95"
          >
            <FaGithub size={22} />
            <span>View Source Code</span>
          </a>
          {relatedBlogSlug && (
            <a
              href={`/writing/${relatedBlogSlug}`}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-zinc-900 text-white font-bold rounded-full border border-white/10 hover:bg-zinc-800 hover:border-white/30 transition-all hover:scale-105 active:scale-95"
            >
              <FaBookOpen size={18} />
              <span>Read the Engineering Breakdown</span>
            </a>
          )}
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-400 transition-all hover:scale-105 active:scale-95"
          >
            Discuss a similar project →
          </Link>
        </div>

        {otherProjects.length > 0 && (
          <nav className="mt-20 pt-12 border-t border-white/5" aria-label="Related projects">
            <h2 className="text-sm font-semibold text-gray-400 mb-6 font-mono tracking-widest uppercase">
              Keep exploring
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group block p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all"
                >
                  <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase">
                    {p.type}
                  </span>
                  <h3 className="text-base font-bold text-white mt-2 group-hover:text-blue-300 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.description}</p>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </article>
  );
}
