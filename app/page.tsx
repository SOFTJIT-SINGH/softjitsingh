import Link from "next/link";
import Constellation, { type Star } from "./components/home/Constellation";
import Astrolabe from "./components/home/Astrolabe";
import MagicPortrait from "./components/MagicPortrait";
import MobileShelf from "./components/home/MobileShelf";
import WebShowcase from "./components/home/WebShowcase";
import NumbersBoard from "./components/home/NumbersBoard";
import Typewriter from "./components/motion/Typewriter";
import ExploreMeter from "./components/home/ExploreMeter";
import Industries from "./components/home/Industries";
import StackIndex from "./components/home/StackIndex";
import Journey from "./components/home/Journey";
import { allProjects, featured } from "../lib/featured";
import { mobileProjects, webProjects } from "../lib/data";
import { writingPosts } from "../lib/writing";
import { SITE } from "@/lib/constants";


const HERO_LINES = [
  "shipped HealChakra to 500+ concurrent users in 90 days",
  "fixed a payment double-charge race within 2 weeks of launch",
  "cut BhojPOS API response time 44% with Redis caching",
  "CityGuard's SOS broadcasts live GPS in under a second",
  "taught a 110-session Next.js course",
];

const featuredSlugs = new Set(featured.map((f) => f.slug));
const featuredPosts = new Set(featured.map((f) => f.post));
const notes = writingPosts.filter((p) => !featuredPosts.has(p.slug)).slice(0, 4);

const stars: Star[] = allProjects.map((p) => ({
  slug: p.slug,
  title: p.title,
  type: p.type,
  tech: p.techStack,
  featured: featuredSlugs.has(p.slug),
}));

export default function Home() {
  return (
    <main className="min-h-screen bg-night text-cream font-sans selection:bg-mint selection:text-night overflow-x-hidden">
      <section className="relative min-h-[100svh] flex items-end bg-[radial-gradient(ellipse_80%_60%_at_70%_35%,#16224a_0%,#0a0f1e_70%)]">
        <Astrolabe className="astro-in absolute left-1/2 top-[3%] w-[135vw] max-w-none -translate-x-1/2 opacity-40 md:left-auto md:right-[-14%] md:top-1/2 md:w-[min(105vh,940px)] md:-translate-y-1/2 md:translate-x-0 md:opacity-45" />
        <Constellation stars={stars} />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 md:px-10 pt-[46svh] pb-16 md:pt-32 md:pb-24 pointer-events-none" data-hero-text data-hero-seq>
          <Link
            href="/projects/healchakra"
            className="pointer-events-auto mb-8 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-line bg-night/60 px-3.5 py-1.5 font-mono text-[11px] text-mist backdrop-blur hover:border-mint/50 hover:text-cream transition-colors"
          >
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-mint opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
            </span>
            latest ship <span className="text-cream">HealChakra</span> · 90-day build · 500+ concurrent users →
          </Link>
          <p className="font-mono text-xs text-mint mb-6">
            {SITE.name.toLowerCase().replace(" ", "_")} · full-stack engineer · amritsar · 31.63°n 74.87°e
            {SITE.openToWork && <span className="text-amber"> · open to work</span>}
          </p>
          <h1 className="font-serif text-[2.6rem] leading-[1.02] sm:text-6xl md:text-7xl lg:text-[5.25rem] tracking-tight max-w-3xl">
            {"Software that holds up when real people".split(" ").map((word, i) => (
              <span key={word + i}>
                <span className="hero-word" style={{ "--i": i } as React.CSSProperties}>
                  {word}
                </span>{" "}
              </span>
            ))}
            <span className="hero-word" style={{ "--i": 8 } as React.CSSProperties}>
              <em className="italic text-mint shimmer">show&nbsp;up.</em>
            </span>
          </h1>
          <p className="mt-8 text-lg text-mist leading-relaxed max-w-xl">
            I&apos;ve shipped {SITE.metrics.productionApps} web and mobile apps: a therapy platform with 500+ people
            online at once, a POS that runs restaurant rushes, a crime-reporting app with a one-second SOS.
          </p>
          <p className="mt-5 min-h-[1.5em] max-w-xl font-mono text-sm text-cream/90">
            <span className="text-mint">&gt; </span>
            <Typewriter lines={HERO_LINES} />
          </p>
          <div className="mt-10 flex max-w-xl flex-wrap items-center gap-x-6 gap-y-4 pointer-events-auto">
            <a
              href="#work"
              className="rounded-md bg-mint px-5 py-3 text-sm font-medium text-night hover:bg-cream transition-colors"
            >
              See all {allProjects.length} projects ↓
            </a>
            <Link href="/hire" className="text-sm text-cream underline underline-offset-4 decoration-mint/50 hover:decoration-mint">
              Need a website? See prices
            </Link>
            <a
              href={SITE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cream underline underline-offset-4 decoration-mint/50 hover:decoration-mint"
            >
              Resume ↗
            </a>
            <Link href="/contact" className="text-sm text-cream underline underline-offset-4 decoration-mint/50 hover:decoration-mint">
              Book a 15-min call
            </Link>
          </div>
          <p className="mt-14 font-mono text-[11px] text-mist/80 max-w-md leading-relaxed">
            <span className="text-mint">●</span> web <span className="ml-3 text-amber">●</span> mobile · every star is
            something I shipped, lines join projects that share a stack. hover or tap one.
          </p>
        </div>
      </section>

      <section id="work" data-explore-zone className="chart-rule border-t border-line bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(244,184,96,0.07)_0%,transparent_70%)]">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-24 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14 md:mb-16">
            <div>
              <p className="font-mono text-xs text-amber mb-3">chart i · in your pocket</p>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight max-w-2xl">
                {mobileProjects.length} mobile apps, <em className="italic text-amber">tap one.</em>
              </h2>
            </div>
            <p className="font-mono text-[11px] text-mist max-w-xs">
              React Native · Expo · Supabase realtime · Gemini AI
              <span className="lg:hidden text-amber"> · swipe →</span>
            </p>
          </div>
          <MobileShelf />
        </div>
      </section>

      <section data-explore-zone className="chart-rule border-t border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-24 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14 md:mb-16">
            <div>
              <p className="font-mono text-xs text-mint mb-3">chart ii · on the web</p>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight max-w-2xl">
                {webProjects.length} platforms, <em className="italic text-mint">running for real people.</em>
              </h2>
            </div>
            <Link href="/portfolio" className="font-mono text-[11px] text-mist hover:text-cream">
              filter by stack in the archive →
            </Link>
          </div>
          <WebShowcase />
        </div>
      </section>

      <section className="chart-rule border-t border-line bg-night-2/40">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-20 md:py-24">
          <p className="font-mono text-xs text-mint mb-10">chart iii · numbers, with receipts</p>
          <NumbersBoard />
        </div>
      </section>

      <section className="chart-rule border-t border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-24 md:py-28">
          <p className="font-mono text-xs text-mint mb-3">chart iv · who it&apos;s for</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-12 max-w-2xl">
            Real businesses, across eight kinds of work.
          </h2>
          <Industries />
        </div>
      </section>

      <section className="chart-rule border-t border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-24 md:py-28 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="font-mono text-xs text-mint mb-3">chart v · what I reach for</p>
            <h2 className="font-serif text-4xl tracking-tight mb-5">The stack, counted.</h2>
            <p className="text-mist leading-relaxed">
              Not a logo wall: this is how many of the {allProjects.length} shipped projects actually use each tool.
            </p>
          </div>
          <div className="md:col-span-8">
            <StackIndex projects={allProjects} />
          </div>
        </div>
      </section>

      <section className="chart-rule border-t border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-24 md:py-32 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="font-mono text-xs text-mint mb-3">chart vi · notes from production</p>
            <h2 className="font-serif text-4xl tracking-tight mb-5">When things broke, I wrote it down.</h2>
            <Link href="/writing" className="text-sm text-mint hover:text-cream">
              All {writingPosts.length} write-ups →
            </Link>
          </div>
          <ul data-stagger className="md:col-span-8">
            {notes.map((p) => (
              <li key={p.slug} className="border-t border-line last:border-b">
                <Link href={`/writing/${p.slug}`} className="group block py-6">
                  <p className="font-mono text-[11px] text-mist mb-2">{p.tags.slice(0, 3).join(" · ").toLowerCase()}</p>
                  <p className="font-serif text-xl md:text-2xl tracking-tight group-hover:text-mint transition-colors">
                    {p.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="chart-rule border-t border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-24 md:py-32 grid lg:grid-cols-12 gap-16 lg:gap-16 items-center">
          <div className="lg:col-span-4 py-6 lg:py-0">
            <MagicPortrait alt={`${SITE.name}, Haridwar`} />
          </div>
          <div className="lg:col-span-8 max-w-2xl mx-auto lg:mx-0">
            <p className="font-mono text-xs text-mint mb-3">chart vii · about</p>
            <h2 className="font-serif text-4xl tracking-tight mb-6">Hi, I&apos;m Softjit.</h2>
            <div className="space-y-5 text-lg text-mist leading-relaxed">
              <p>
                I live in Amritsar. In June 2024 I joined Pseudotek Solutions as a part-time, remote intern while
                starting my MCA at {SITE.education.school}, and grew into a Software Engineer (SDE-1) role there,
                teaching a 110-session Next.js course alongside it. Most recently I was a {SITE.employer.title.toLowerCase()}{" "}
                at {SITE.employer.name}. I finished the MCA in 2026 with an {SITE.education.cgpa} CGPA.
              </p>
              <p>
                A lot of my clients are local: a sweet shop that wanted online ordering, a food wholesaler that needed
                order tracking, a salon that needed bookings. Teaching taught me that explaining a thing is the fastest
                way to find out whether you understand it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="chart-rule border-t border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-24 md:py-32">
          <div className="mb-16 md:text-center">
            <p className="font-mono text-xs text-mint mb-3">chart viii · the journey</p>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight">From part-time intern to shipping production, in two years.</h2>
          </div>
          <Journey />
        </div>
      </section>

      <section className="chart-rule border-t border-line bg-[radial-gradient(ellipse_70%_100%_at_50%_100%,#1a2550_0%,#0a0f1e_70%)]">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-20 md:py-24 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <p className="font-mono text-xs text-amber mb-3">for businesses</p>
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight mb-4">Need a website for your business?</h2>
            <p className="text-lg text-mist max-w-xl">
              A five-page site with WhatsApp leads and a contact form, fixed at ₹5,000 and delivered in five days. Apps
              and dashboards are priced after a short chat.
            </p>
          </div>
          <Link
            href="/hire"
            className="inline-block rounded-md bg-cream text-night px-6 py-3.5 text-sm font-medium hover:bg-mint transition-colors"
          >
            See services and prices →
          </Link>
        </div>
      </section>

      <ExploreMeter />
    </main>
  );
}
