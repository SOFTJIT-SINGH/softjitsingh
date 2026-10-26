import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PAGE_META, SITE } from "@/lib/constants";
import { allProjects } from "@/lib/featured";
import Journey from "@/app/components/home/Journey";
import StackIndex from "@/app/components/home/StackIndex";
import MagicPortrait from "@/app/components/MagicPortrait";

export const metadata: Metadata = pageMetadata({
  title: PAGE_META.about.title,
  description: PAGE_META.about.description,
  path: "/about",
});

const skills = [
  {
    title: "Full-stack web",
    body: "Production platforms on Next.js 16 and TypeScript, with PostgreSQL or MongoDB underneath and Zod validating everything that comes in.",
  },
  {
    title: "Backend and data",
    body: "Multi-tenant schemas with row-level security, Redis caching, and payment flows that survive two requests arriving at once.",
  },
  {
    title: "Mobile",
    body: "Cross-platform React Native (Expo) apps with real-time sync, AI features, and offline support for patchy networks.",
  },
  {
    title: "Real-time systems",
    body: "Video and voice over LiveKit WebRTC, WebSocket and Socket.io state sync, and push notifications.",
  },
];

const principles = [
  {
    title: "Architect",
    body: "TypeScript strict mode, Zod schemas and role-based access from the first line. Every endpoint declares who can call it.",
  },
  {
    title: "Engineer",
    body: "Transactions that can't race, row-level locks where money moves, and tenant data that never leaks between clients.",
  },
  {
    title: "Ship",
    body: "Small releases in 3–5 day cycles, to real users, with a way back if something goes wrong.",
  },
  {
    title: "Validate",
    body: "Never trust the client. Server-side validation, idempotent webhooks, and rate limits where abuse is likely.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-night text-cream">
      <section className="max-w-6xl mx-auto px-5 md:px-10 pt-16 md:pt-24 pb-20 grid lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-8">
          <p className="font-mono text-xs text-mint mb-6">
            about · {SITE.location.toLowerCase()}
            {SITE.openToWork && <span className="text-amber"> · open to work</span>}
          </p>
          <h1 className="font-serif text-5xl md:text-7xl tracking-tight leading-[1.02] mb-8">
            I&apos;m Softjit. I build software for people who <em className="italic text-mint">need it to work.</em>
          </h1>
          <div className="space-y-5 text-lg text-mist leading-relaxed max-w-2xl">
            <p>
              I&apos;m a full-stack engineer in Amritsar. Since June 2024 I&apos;ve shipped {allProjects.length} web and mobile
              apps, from a therapy platform with {SITE.metrics.concurrentUsers} people online at once to a POS that runs
              restaurant rushes and a crime-reporting app with a one-second SOS.
            </p>
            <p>
              I started as a part-time, remote intern at Pseudotek Solutions while doing my MCA at {SITE.education.school},
              grew into a Software Engineer (SDE-1) role there and taught a 110-session Next.js course on the side. Most
              recently I was a {SITE.employer.title.toLowerCase()} at {SITE.employer.name}.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <a
              href={SITE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-mint px-5 py-3 font-medium text-night hover:bg-cream transition-colors"
            >
              Read my resume ↗
            </a>
            <Link href="/contact" className="underline underline-offset-4 decoration-mint/50 hover:decoration-mint">
              Get in touch
            </Link>
          </div>
        </div>
        <div className="order-first lg:order-none lg:col-span-4 py-6 lg:py-0">
          <MagicPortrait alt={`${SITE.name} in Haridwar`} priority />
        </div>
      </section>

      <section className="chart-rule border-t border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-20 md:py-24">
          <p className="font-mono text-xs text-mint mb-3">chart i · what I do</p>
          <h2 className="font-serif text-4xl tracking-tight mb-12">Four things I&apos;m good at.</h2>
          <ul data-stagger className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-line">
            {skills.map((s) => (
              <li key={s.title} className="border-r border-b border-line p-6">
                <h3 className="font-serif text-xl tracking-tight mb-3">{s.title}</h3>
                <p className="text-sm text-mist leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="chart-rule border-t border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-20 md:py-24">
          <div className="mb-14 md:text-center">
            <p className="font-mono text-xs text-mint mb-3">chart ii · the journey</p>
            <h2 className="font-serif text-4xl tracking-tight">From part-time intern to shipping production, in two years.</h2>
          </div>
          <Journey />
        </div>
      </section>

      <section className="chart-rule border-t border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-20 md:py-24">
          <p className="font-mono text-xs text-mint mb-3">chart iii · how I work</p>
          <h2 className="font-serif text-4xl tracking-tight mb-12">Production-grade by default.</h2>
          <ol data-stagger className="grid md:grid-cols-2 gap-x-12">
            {principles.map((p, i) => (
              <li key={p.title} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-7">
                <span className="font-mono text-xs text-mint pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-serif text-2xl tracking-tight mb-2">{p.title}</h3>
                  <p className="text-mist leading-relaxed">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="chart-rule border-t border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-20 md:py-24 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="font-mono text-xs text-mint mb-3">chart iv · the stack</p>
            <h2 className="font-serif text-4xl tracking-tight mb-5">What I reach for.</h2>
            <p className="text-mist leading-relaxed">Counted across all {allProjects.length} shipped projects.</p>
          </div>
          <div className="md:col-span-8">
            <StackIndex projects={allProjects} limit={16} />
          </div>
        </div>
      </section>
    </main>
  );
}
