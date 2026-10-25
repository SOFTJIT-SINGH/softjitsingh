import Image from "next/image";
import Link from "next/link";
import Footer from "./components/Footer";
import { mobileProjects, webProjects } from "../lib/data";
import { SITE } from "@/lib/constants";

const allProjects = [...webProjects, ...mobileProjects];

const featured = [
  {
    slug: "healchakra",
    story:
      "A mental-wellness platform where people talk to therapists over video, voice and chat, billed by the minute from a wallet. Two session-end events firing at once used to charge people twice, so I moved the deduction behind PostgreSQL row-level locks. It now holds 500+ concurrent users at under 150ms media latency.",
    post: "healchakra-row-level-locks",
  },
  {
    slug: "bhojpos",
    story:
      "A point-of-sale system for restaurants. Every client gets their own isolated data and branding, and it runs in daily service. Putting Redis in front of the catalog API took average response time from 320ms to 180ms.",
    post: "bhojpos-redis-caching",
  },
  {
    slug: "cityguard",
    story:
      "A crime-reporting app I built in eight weeks. Snap a photo and Gemini grades how serious it is; the SOS button sends your live location to your contacts and local authorities in under a second.",
    post: "cityguard-subsecond-sos-gemini",
  },
];

const featuredSlugs = new Set(featured.map((f) => f.slug));
const archive = allProjects.filter((p) => !featuredSlugs.has(p.slug));

const quietLink =
  "underline underline-offset-4 decoration-rule decoration-2 hover:decoration-accent";
const loudLink =
  "underline underline-offset-4 decoration-accent decoration-2 hover:text-accent";

export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-ink font-sans selection:bg-accent selection:text-paper">
      <section className="max-w-6xl mx-auto px-5 md:px-10 pt-32 md:pt-44 pb-20 md:pb-28">
        <p className="text-sm text-ink-soft mb-8">
          {SITE.location} · Full-Stack Engineer
        </p>
        <h1 className="font-serif text-[2.75rem] leading-[1.02] sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight max-w-4xl">
          I build the software small businesses and busy platforms{" "}
          <em className="italic text-accent">actually run on.</em>
        </h1>
        <div className="mt-12 grid md:grid-cols-[1fr_auto] gap-8 items-end max-w-4xl">
          <p className="text-lg text-ink-soft leading-relaxed max-w-xl">
            I&apos;m {SITE.name}. I work at {SITE.employer.shortName} and take on freelance projects,
            mostly Next.js web apps and React Native mobile apps.{" "}
            {SITE.metrics.productionApps} shipped so far, from a ₹5,000 shop website to a video
            platform with 500+ people online at once.
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <a href="#work" className={loudLink}>
              Selected work ↓
            </a>
            <Link href="/hire" className={quietLink}>
              Need a website? See prices →
            </Link>
            <a href={SITE.resumeUrl} target="_blank" rel="noopener noreferrer" className={quietLink}>
              Resume ↗
            </a>
          </div>
        </div>
      </section>

      <section id="work" className="border-t border-rule">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-20 md:py-28">
          <h2 className="text-sm text-ink-soft mb-16">Selected work</h2>
          <div className="space-y-24 md:space-y-32">
            {featured.map((f, i) => {
              const project = allProjects.find((p) => p.slug === f.slug)!;
              return (
                <article key={f.slug} className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
                  <Link
                    href={`/projects/${project.slug}`}
                    className={`md:col-span-7 block border border-rule bg-[#e9e3d5] overflow-hidden ${
                      i % 2 ? "md:order-2" : ""
                    }`}
                  >
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, 58vw"
                        className="object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                      />
                    </div>
                  </Link>
                  <div className="md:col-span-5 md:pt-2">
                    <p className="text-sm text-ink-soft mb-3">
                      0{i + 1} · {project.type}
                    </p>
                    <h3 className="font-serif text-4xl md:text-5xl tracking-tight mb-5">{project.title}</h3>
                    <p className="text-ink-soft leading-relaxed mb-6">{f.story}</p>
                    <p className="text-sm mb-6">{project.techStack.join(", ")}</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <Link href={`/projects/${project.slug}`} className={loudLink}>
                        Case study →
                      </Link>
                      <Link href={`/writing/${f.post}`} className={quietLink}>
                        How it works
                      </Link>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className={quietLink}>
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

      <section className="border-t border-rule">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-20 md:py-28">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="text-sm text-ink-soft">Everything else ({archive.length})</h2>
            <Link href="/portfolio" className={`text-sm ${quietLink}`}>
              Full archive →
            </Link>
          </div>
          <ul>
            {archive.map((p) => (
              <li key={p.slug} className="border-t border-rule last:border-b">
                <Link
                  href={`/projects/${p.slug}`}
                  className="group grid grid-cols-[1fr_auto] md:grid-cols-[14rem_9rem_1fr_auto] gap-x-6 gap-y-1 py-5 items-baseline hover:bg-[#ebe5d8] -mx-3 px-3 transition-colors"
                >
                  <span className="font-serif text-xl md:text-2xl tracking-tight group-hover:text-accent transition-colors">
                    {p.title}
                  </span>
                  <span className="text-sm text-ink-soft order-3 col-span-2 md:order-none md:col-span-1">
                    {p.type}
                  </span>
                  <span className="text-sm text-ink-soft hidden md:block truncate">
                    {p.techStack.slice(0, 4).join(", ")}
                  </span>
                  <span aria-hidden="true" className="text-ink-soft group-hover:text-accent">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-4">
            <div className="relative aspect-[4/5] max-w-xs border border-rule overflow-hidden">
              <Image src="/Haridwar.jpg" alt={`${SITE.name}, Haridwar`} fill sizes="320px" className="object-cover" />
            </div>
          </div>
          <div className="md:col-span-8 max-w-2xl">
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-6">About</h2>
            <div className="space-y-5 text-lg text-ink-soft leading-relaxed">
              <p>
                I live in Amritsar and have worked as a full-stack engineer at {SITE.employer.name} since 2024. I
                finished my MCA at {SITE.education.school} in 2026 with an {SITE.education.cgpa} CGPA, building real
                products alongside the coursework.
              </p>
              <p>
                A lot of my clients are local: a sweet shop that wanted online ordering, a food wholesaler that
                needed order tracking, a salon that needed bookings. I also teach a 110-session Next.js course, which
                is where I learned that explaining a thing is the fastest way to find out whether you understand it.
              </p>
              <p>
                When something breaks in production I like to write down what happened.{" "}
                <Link href="/writing" className={`text-ink ${loudLink}`}>
                  Those notes are on the writing page.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-rule bg-ink text-paper">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-20 md:py-24 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight mb-4">Need a website for your business?</h2>
            <p className="text-lg opacity-70 max-w-xl">
              A five-page site with WhatsApp leads and a contact form, fixed at ₹5,000 and delivered in five days.
              Apps and dashboards are priced after a short chat.
            </p>
          </div>
          <Link
            href="/hire"
            className="inline-block bg-paper text-ink px-7 py-4 text-sm font-medium hover:bg-accent hover:text-paper transition-colors"
          >
            See services and prices →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
