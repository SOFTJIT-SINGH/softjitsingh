import Link from "next/link";
import PhoneFrame from "../PhoneFrame";
import Tilt from "../motion/Tilt";
import { mobileProjects } from "@/lib/data";
import { hooks } from "@/lib/featured";
import { projectMetrics } from "@/lib/metrics";

export default function MobileShelf() {
  return (
    // Below lg the shelf is a swipeable row, like an app store; on desktop all six sit side by side.
    <ul className="group/shelf no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:-mx-10 md:px-10 lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-10">
      {mobileProjects.map((p, i) => {
        const metric = projectMetrics(p, 1)[0];
        return (
          <li
            key={p.slug}
            data-explore={p.slug}
            data-reveal
            style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
            className="w-[44%] shrink-0 snap-start sm:w-[30%] lg:w-auto lg:min-w-0"
          >
            {/* Alternate phones sit lower so the row reads as a shelf, not a table. */}
            <div
              className={`transition-opacity duration-300 lg:group-hover/shelf:opacity-40 lg:hover:!opacity-100 ${
                i % 2 ? "lg:translate-y-10" : ""
              }`}
            >
              <Link href={`/projects/${p.slug}`} className="group block">
                <div className="relative px-[4%]">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-[10%] -bottom-4 h-10 rounded-[50%] bg-amber/25 blur-2xl transition-opacity duration-500 opacity-60 group-hover:opacity-100"
                  />
                  <div className="animate-float" style={{ "--fd": `${i * -0.9}s` } as React.CSSProperties}>
                    <Tilt max={10}>
                      <PhoneFrame
                        src={p.image}
                        alt={`${p.title} screenshot`}
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 180px"
                        className="w-full"
                      />
                    </Tilt>
                  </div>
                </div>
                <h3 className="mt-7 font-serif text-xl tracking-tight group-hover:text-amber transition-colors">{p.title}</h3>
                <p className="mt-1.5 text-sm text-mist leading-snug">{hooks[p.slug]}</p>
                {metric && (
                  <p className="mt-2 font-mono text-[11px] text-amber">
                    {metric.value} <span className="text-mist">{metric.label}</span>
                  </p>
                )}
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
