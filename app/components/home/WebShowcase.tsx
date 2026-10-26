import Image from "next/image";
import Link from "next/link";
import SpotlightGrid from "./SpotlightGrid";
import CodeSketch from "./CodeSketch";
import Tilt from "../motion/Tilt";
import Parallax from "../motion/Parallax";
import { featured, hooks, projectFor } from "@/lib/featured";
import { hostOf, projectMetrics } from "@/lib/metrics";
import { IMAGE_SIZES } from "@/lib/imageSizes";

// Strongest work first: the first few entries are the ones a skimming visitor actually sees.
const ORDER = [
  "healchakra",
  "bhojpos",
  "meharfoods",
  "secretsoulmate",
  "omsweets",
  "shreejewellers",
  "ksarts",
  "fantasy",
  "salonflow",
  "cryptosher",
  "beheights",
  "dcdmarketing",
  "pseudotek",
  "dcdacademy",
];

export default function WebShowcase() {
  return (
    <SpotlightGrid className="space-y-28 md:space-y-40">
      {ORDER.map((slug, i) => {
        const p = projectFor(slug)!;
        const [w, h] = IMAGE_SIZES[p.image] ?? [1600, 900];
        const metrics = projectMetrics(p, 3);
        const code = featured.find((f) => f.slug === slug);
        const live = p.link && !p.link.includes("github.com") ? p.link : null;
        const github = p.link?.includes("github.com") ? p.link : null;

        return (
          <li key={slug} data-explore={slug} className="group/item list-none">
            <div data-reveal className="grid gap-8 lg:grid-cols-12 lg:gap-14 mb-12 md:mb-16">
              <div className="lg:col-span-5">
                <p className="mb-4 flex items-center gap-3 font-mono text-[11px] text-mint">
                  <span className="text-mist">{String(i + 1).padStart(2, "0")}</span>
                  web application
                  {live && <span className="rounded border border-mint/40 px-1.5 py-0.5 text-[10px]">● live</span>}
                </p>
                <h3 className="font-serif text-4xl md:text-5xl tracking-tight mb-3 group-hover/item:text-mint transition-colors">
                  <Link href={`/projects/${slug}`}>{p.title}</Link>
                </h3>
                <p className="text-lg text-cream/90 mb-5">{hooks[slug]}</p>
                {metrics.length > 0 && (
                  <dl className="mb-6 flex flex-wrap gap-x-6 gap-y-2">
                    {metrics.map((m) => (
                      <div key={m.label} className="font-mono text-[11px]">
                        <dd className="inline text-mint">{m.value}</dd> <dt className="inline text-mist">{m.label}</dt>
                      </div>
                    ))}
                  </dl>
                )}
                <ul className="mb-7 flex flex-wrap gap-2">
                  {p.techStack.map((t) => (
                    <li key={t} className="rounded border border-line px-2 py-1 font-mono text-[11px] text-mist">
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3 text-sm">
                  <Link
                    href={`/projects/${slug}`}
                    className="rounded-md bg-mint px-4 py-2.5 font-medium text-night hover:bg-cream transition-colors"
                  >
                    Case study →
                  </Link>
                  {live && (
                    <a href={live} target="_blank" rel="noopener noreferrer" className="rounded-md border border-line px-4 py-2.5 hover:border-mint/50 transition-colors">
                      Visit {hostOf(live)} ↗
                    </a>
                  )}
                  {github && (
                    <a href={github} target="_blank" rel="noopener noreferrer" className="rounded-md border border-line px-4 py-2.5 hover:border-mint/50 transition-colors">
                      Code ↗
                    </a>
                  )}
                </div>
              </div>

              <div className="lg:col-span-7 min-w-0">
                <p className="text-mist leading-relaxed mb-6">{p.description}</p>
                {code ? (
                  <CodeSketch file={code.file} code={code.code} />
                ) : (
                  <ul className="hidden md:block space-y-3">
                    {p.bulletPoints.map((b) => (
                      <li key={b} className="flex gap-3 text-sm text-cream/80 leading-relaxed transition-transform duration-300 hover:translate-x-1">
                        <span className="mt-1 text-[10px] text-mint" aria-hidden="true">◆</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Cap the frame at ~640px tall: wide shots span the column, square ones sit centred. */}
            <Parallax range={40} className="mx-auto" style={{ maxWidth: `min(100%, ${Math.round((640 * w) / h)}px)` }}>
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-[8%] rounded-full bg-mint/0 blur-[90px] transition-all duration-1000 group-hover/item:bg-mint/15 group-hover/item:scale-110"
                />
                <Tilt max={2.5}>
                  <Link
                    href={`/projects/${slug}`}
                    className="spot group relative block overflow-hidden rounded-xl border border-line bg-[#070b16] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] transition-[border-color,box-shadow] duration-500 hover:border-mint/40 hover:shadow-[0_0_60px_-10px_rgba(124,242,201,0.25)]"
                  >
                    <div className="flex items-center gap-2 border-b border-line bg-night-2/90 px-4 py-2.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-line transition-colors group-hover:bg-[#ff5f57]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-line transition-colors delay-75 group-hover:bg-[#febc2e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-line transition-colors delay-150 group-hover:bg-[#28c840]" />
                      <span className="ml-3 truncate rounded border border-line bg-night px-3 py-0.5 font-mono text-[10px] text-mist">
                        {live ? hostOf(live) : `${slug} · case study`}
                      </span>
                    </div>
                    {/* Natural size, so the whole screenshot shows instead of a cropped strip. */}
                    <Image
                      src={p.image}
                      alt={`${p.title} screenshot`}
                      width={w}
                      height={h}
                      sizes="(max-width: 1152px) 100vw, 1072px"
                      className="h-auto w-full transition-transform duration-1000 ease-out group-hover:scale-[1.015]"
                    />
                  </Link>
                </Tilt>
              </div>
            </Parallax>
          </li>
        );
      })}
    </SpotlightGrid>
  );
}
