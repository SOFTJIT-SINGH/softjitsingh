import Image from "next/image";
import Link from "next/link";
import Footer from "./components/Footer";
import Constellation, { type Star } from "./components/home/Constellation";
import CodeSketch from "./components/home/CodeSketch";
import MoreWork from "./components/home/MoreWork";
import Industries from "./components/home/Industries";
import StackIndex from "./components/home/StackIndex";
import Journey from "./components/home/Journey";
import { mobileProjects, webProjects } from "../lib/data";
import { writingPosts } from "../lib/writing";
import { SITE } from "@/lib/constants";

const allProjects = [...webProjects, ...mobileProjects];
const projectFor = (slug: string) => allProjects.find((p) => p.slug === slug)!;

const featured = [
  {
    slug: "healchakra",
    story:
      "A mental-wellness platform where people talk to therapists over video, voice and chat, billed by the minute from a wallet. Two session-end events firing at once used to charge people twice, so I moved the deduction behind PostgreSQL row-level locks. It now holds 500+ concurrent users at under 150ms media latency.",
    post: "healchakra-row-level-locks",
    file: "wallet/deduct.sql",
    code: `begin;
select balance from wallets
  where user_id = $1
  for update;  -- a second session-end waits here
update wallets set balance = balance - $2
  where user_id = $1;
commit;`,
  },
  {
    slug: "bhojpos",
    story:
      "A point-of-sale system for restaurants. Every client gets their own isolated data and branding, and it runs through daily service. Putting Redis in front of the catalog API took average response time from 320ms to 180ms.",
    post: "bhojpos-redis-caching",
    file: "catalog/menu.ts",
    code: `const key = \`menu:\${tenantId}\`;
const hit = await redis.get(key);
if (hit) return JSON.parse(hit);  // the fast path
const menu = await Menu.find({ tenantId });
await redis.set(key, JSON.stringify(menu), "EX", TTL);
return menu;`,
  },
  {
    slug: "cityguard",
    story:
      "A crime-reporting app I built in eight weeks. Snap a photo and Gemini grades how serious it is. The SOS button sends your live location to your contacts and local authorities in under a second.",
    post: "cityguard-subsecond-sos-gemini",
    file: "sos/broadcast.ts",
    code: `const { coords } = await Location.getCurrentPositionAsync();
await supabase
  .channel(\`sos:\${userId}\`)
  .send({ type: "broadcast", event: "sos", payload: coords });
// contacts are already subscribed, no polling`,
  },
];

const numbers = [
  { value: "500+", label: "concurrent users", receipt: "HealChakra, in production" },
  { value: "<150ms", label: "p75 media latency", receipt: "LiveKit WebRTC sessions" },
  { value: "320→180", label: "ms average response", receipt: "BhojPOS, before and after Redis" },
  { value: "90%+", label: "unit test coverage", receipt: "BhojPOS backend, Vitest" },
];

const moreWorkLines: Record<string, string> = {
  secretsoulmate: "Gemini scores match chemistry; Redis rate limiting and row-level security keep it safe.",
  bidnexus: "Live auctions with optimistic bids and sub-100ms sync, so nobody sees a stale price.",
  meharfoods: "Wholesale ordering for an Amritsar distributor, with live order tracking and automatic PDF invoices.",
  ksarts: "Sales forecasts and customer segments from a Python ML service behind a Next.js dashboard.",
  routesync: "Group itineraries that stay in sync on every phone, even on flaky networks.",
  omsweets: "Online ordering and Razorpay payments for an Amritsar sweet shop, also taught as a 12-session build-along.",
};

const featuredSlugs = new Set(featured.map((f) => f.slug));
const moreWork = Object.entries(moreWorkLines).map(([slug, line]) => ({ ...projectFor(slug), line }));
const shownSlugs = new Set([...featuredSlugs, ...Object.keys(moreWorkLines)]);
const archive = allProjects.filter((p) => !shownSlugs.has(p.slug));
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
        <Constellation stars={stars} />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 md:px-10 pt-[46svh] pb-16 md:pt-32 md:pb-24 pointer-events-none">
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
            {SITE.name.toLowerCase().replace(" ", "_")} · full-stack engineer · amritsar, india
            {SITE.openToWork && <span className="text-amber"> · open to work</span>}
          </p>
          <h1 className="font-serif text-[2.6rem] leading-[1.02] sm:text-6xl md:text-7xl lg:text-[5.25rem] tracking-tight max-w-3xl">
            Software that holds up when real people{" "}
            <em className="italic text-mint">show&nbsp;up.</em>
          </h1>
          <p className="mt-8 text-lg text-mist leading-relaxed max-w-xl">
            I&apos;ve shipped {SITE.metrics.productionApps} web and mobile apps: a therapy platform with 500+ people
            online at once, a POS that runs restaurant rushes, a crime-reporting app with a one-second SOS.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 pointer-events-auto">
            <a
              href="#work"
              className="rounded-md bg-mint px-5 py-3 text-sm font-medium text-night hover:bg-cream transition-colors"
            >
              See the work
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

      <section id="work" className="border-t border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-24 md:py-32">
          <p className="font-mono text-xs text-mint mb-3">01 · selected work</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-16 md:mb-20 max-w-2xl">
            Three projects, and what&apos;s under the hood.
          </h2>
          <div className="space-y-24 md:space-y-32">
            {featured.map((f, i) => {
              const project = projectFor(f.slug);
              const isMobile = project.type.includes("Mobile");
              return (
                <article key={f.slug} className="grid md:grid-cols-12 gap-10 md:gap-12 items-start">
                  <div className={`min-w-0 ${isMobile ? "md:col-span-5" : "md:col-span-7"} ${i % 2 ? "md:order-2" : ""}`}>
                    {isMobile ? (
                      <Link href={`/projects/${project.slug}`} className="flex justify-center">
                        <div className="relative w-[15rem] aspect-[9/19] rounded-[2.25rem] border-[7px] border-[#1c2440] bg-black overflow-hidden ring-1 ring-amber/20 shadow-[0_30px_80px_-30px_rgba(244,184,96,0.35)]">
                          <Image src={project.image} alt={`${project.title} screenshot`} fill sizes="240px" className="object-cover object-top" />
                        </div>
                      </Link>
                    ) : (
                      <Link
                        href={`/projects/${project.slug}`}
                        className="group block rounded-lg border border-line bg-night-2 overflow-hidden shadow-[0_30px_80px_-40px_rgba(124,242,201,0.35)]"
                      >
                        <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-line">
                          <span className="h-2.5 w-2.5 rounded-full bg-line" />
                          <span className="h-2.5 w-2.5 rounded-full bg-line" />
                          <span className="h-2.5 w-2.5 rounded-full bg-line" />
                          <span className="ml-3 font-mono text-[11px] text-mist">{project.slug}</span>
                        </div>
                        <div className="relative aspect-[16/10]">
                          <Image
                            src={project.image}
                            alt={`${project.title} screenshot`}
                            fill
                            sizes="(max-width: 768px) 100vw, 58vw"
                            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                          />
                        </div>
                      </Link>
                    )}
                  </div>
                  <div className={`min-w-0 ${isMobile ? "md:col-span-7" : "md:col-span-5"}`}>
                    <p className="font-mono text-xs text-mist mb-3">
                      0{i + 1} · <span className={isMobile ? "text-amber" : "text-mint"}>{project.type.toLowerCase()}</span>
                    </p>
                    <h3 className="font-serif text-4xl md:text-5xl tracking-tight mb-5">{project.title}</h3>
                    <p className="text-mist leading-relaxed mb-6">{f.story}</p>
                    <ul className="flex flex-wrap gap-2 mb-8">
                      {project.techStack.map((t) => (
                        <li key={t} className="rounded border border-line px-2 py-1 font-mono text-[11px] text-mist">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <CodeSketch file={f.file} code={f.code} />
                    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <Link href={`/projects/${project.slug}`} className="text-mint hover:text-cream">
                        Case study →
                      </Link>
                      <Link href={`/writing/${f.post}`} className="text-cream/80 hover:text-cream">
                        How it works
                      </Link>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-cream/80 hover:text-cream">
                        Code ↗
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-24 md:py-28">
          <p className="font-mono text-xs text-mint mb-3">02 · more work</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-12 max-w-2xl">Six more I&apos;m proud of.</h2>
          <MoreWork projects={moreWork} />
        </div>
      </section>

      <section className="border-t border-line bg-night-2/40">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-20 md:py-24">
          <p className="font-mono text-xs text-mint mb-10">03 · numbers, with receipts</p>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            {numbers.map((n) => (
              <div key={n.label} className="border-l border-line pl-5">
                <dd className="font-serif text-4xl md:text-5xl tracking-tight text-cream">{n.value}</dd>
                <dt className="mt-3 text-sm text-cream/90">{n.label}</dt>
                <p className="mt-1 font-mono text-[11px] text-mist">{n.receipt}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-24 md:py-28">
          <p className="font-mono text-xs text-mint mb-3">04 · who it&apos;s for</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-12 max-w-2xl">
            Real businesses, across eight kinds of work.
          </h2>
          <Industries />
        </div>
      </section>

      <section className="border-t border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-24 md:py-28 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="font-mono text-xs text-mint mb-3">05 · what I reach for</p>
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

      <section className="border-t border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-24 md:py-32 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="font-mono text-xs text-mint mb-3">06 · notes from production</p>
            <h2 className="font-serif text-4xl tracking-tight mb-5">When things broke, I wrote it down.</h2>
            <Link href="/writing" className="text-sm text-mint hover:text-cream">
              All {writingPosts.length} write-ups →
            </Link>
          </div>
          <ul className="md:col-span-8">
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

      <section className="border-t border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-24 md:py-32">
          <div className="flex items-baseline justify-between mb-10">
            <p className="font-mono text-xs text-mint">07 · everything else ({archive.length})</p>
            <Link href="/portfolio" className="text-sm text-mist hover:text-cream">
              Full archive →
            </Link>
          </div>
          <ul>
            {archive.map((p) => {
              const isMobile = p.type.includes("Mobile");
              return (
                <li key={p.slug} className="border-t border-line last:border-b">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_14rem_9rem_1fr_auto] gap-x-5 gap-y-1 py-5 items-baseline hover:bg-night-2 -mx-3 px-3 rounded transition-colors"
                  >
                    <span className={`h-2 w-2 rounded-full self-center ${isMobile ? "bg-amber" : "bg-mint"}`} aria-hidden="true" />
                    <span className="font-serif text-xl md:text-2xl tracking-tight group-hover:text-mint transition-colors">
                      {p.title}
                    </span>
                    <span className="hidden md:block font-mono text-xs text-mist">{p.type.toLowerCase()}</span>
                    <span className="hidden md:block font-mono text-xs text-mist truncate">
                      {p.techStack.slice(0, 4).join(", ")}
                    </span>
                    <span aria-hidden="true" className="text-mist group-hover:text-mint group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-24 md:py-32 grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-4">
            <div className="relative aspect-[4/5] max-w-xs rounded-lg border border-line overflow-hidden">
              <Image src="/Haridwar.jpg" alt={`${SITE.name}, Haridwar`} fill sizes="320px" className="object-cover" />
            </div>
          </div>
          <div className="md:col-span-8 max-w-2xl">
            <p className="font-mono text-xs text-mint mb-3">08 · about</p>
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
            <div className="mt-14">
              <p className="font-mono text-xs text-mist mb-6">// the journey so far</p>
              <Journey />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-[radial-gradient(ellipse_70%_100%_at_50%_100%,#1a2550_0%,#0a0f1e_70%)]">
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

      <Footer />
    </main>
  );
}
