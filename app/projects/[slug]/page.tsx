import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaGithub, FaServer, FaShieldAlt, FaChartLine, FaLightbulb, FaCheckCircle, FaBookOpen } from "react-icons/fa";
import { mobileProjects, webProjects } from "@/lib/data";
import { writingPosts } from "@/lib/writing";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function extractMetrics(text: string): { value: string; label: string } | null {
  const patterns = [
    { regex: /(\d+)\+?\s*concurrent users/i, label: (m: string) => `${m.match(/\d+/)?.[0]}+ Users` },
    { regex: /<(\d+)ms\s*(p\d+)?\s*media latency/i, label: (m: string) => `<${m.match(/<(\d+)/)?.[1]}ms Latency` },
    { regex: /(\d+)%\s*reduction/i, label: (m: string) => `${m.match(/(\d+)/)?.[1]}% Reduction` },
    { regex: /(\d+)%\s*improvement/i, label: (m: string) => `${m.match(/(\d+)/)?.[1]}% Faster` },
    { regex: /(\d+)\+?\s*API\s*domain/i, label: (m: string) => `${m.match(/(\d+)/)?.[1]}+ APIs` },
    { regex: /(\d+)\+?\s*API\s*route/i, label: (m: string) => `${m.match(/(\d+)/)?.[1]}+ Routes` },
    { regex: /(\d+)\+?\s*%\s*unit test coverage/i, label: (m: string) => `${m.match(/(\d+)/)?.[1]}% Coverage` },
    { regex: /(\d+)K\+?\s*monthly request/i, label: (m: string) => `${m.match(/(\d+)/)?.[1]}K+ Monthly` },
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
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const allProjects = [...mobileProjects, ...webProjects];
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const isMobile = project.type.includes("Mobile");
  const metrics = project.bulletPoints.map(b => extractMetrics(b)).filter(Boolean) as { value: string; label: string }[];

  return (
    <div className="relative min-h-screen bg-black text-gray-100 font-sans">
      <div className="absolute inset-0 z-0 opacity-20 blur-[150px] pointer-events-none select-none">
        {project.image && <Image src={project.image} alt="" fill className="object-cover" />}
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/95 to-black pointer-events-none"></div>

      <div className="relative z-10 p-6 md:p-16 max-w-5xl mx-auto">

        {/* Back Button */}
        <Link href="/#projects" className="inline-flex items-center text-gray-500 hover:text-white transition-colors mb-10 group text-sm font-medium">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-3 group-hover:bg-white/10 transition-colors">
            <FaArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
          </div>
          Back to Projects
        </Link>

        {/* Hero Header */}
        <div className="mb-12">
          <div className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-3">
            {project.type}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tighter text-white">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </div>

        {/* Key Metrics Bar */}
        {metrics.length > 0 && (
          <div className="mb-16 bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-4">Key Results</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {metrics.slice(0, 4).map((m, i) => (
                <div key={i} className="text-center">
                  <div className="text-lg md:text-2xl font-bold text-white tracking-tight font-mono">
                    {m.value.split(" ")[0]}
                  </div>
                  <div className="text-xs text-gray-500 font-mono mt-1">
                    {m.value.split(" ").slice(1).join(" ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Image */}
        <div className="w-full mb-16 relative">
          <div className={`relative w-full ${isMobile ? 'max-w-sm mx-auto' : ''} rounded-xl border border-white/10 bg-zinc-950 overflow-hidden shadow-2xl`}>
            <div className={`${isMobile ? 'aspect-[9/19]' : 'aspect-video'} relative`}>
              {project.image ? (
                <Image src={project.image} alt={project.title} fill className="object-cover" priority />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black text-zinc-600 font-bold text-xl uppercase tracking-widest">
                  {project.title}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Architecture & Implementation */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <FaServer className="text-blue-400 text-lg" />
            <h2 className="text-lg font-semibold text-white">Architecture & Implementation</h2>
          </div>
          <div className="space-y-4">
            {project.bulletPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-4 bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:border-blue-500/20 hover:bg-blue-500/[0.02] transition-all">
                <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-400 text-[10px] font-mono font-bold">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Decision Notes */}
        <div className="mb-16 bg-gradient-to-br from-blue-500/[0.03] to-transparent border border-blue-500/10 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <FaLightbulb className="text-blue-400 text-lg" />
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
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-semibold text-white">{item.label}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-12">
          <h2 className="text-sm font-semibold text-gray-400 mb-4 font-mono tracking-widest uppercase">Technology Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((t, i) => (
              <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-200 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Source Code & Deep-Dive */}
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
          {writingPosts.find(p => project.slug === "healchakra" && p.slug === "healchakra-row-level-locks") && (
            <a
              href="/writing/healchakra-row-level-locks"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-zinc-900 text-white font-bold rounded-full border border-white/10 hover:bg-zinc-800 hover:border-white/30 transition-all hover:scale-105 active:scale-95"
            >
              <FaBookOpen size={18} />
              <span>Read the Technical Deep-Dive</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
