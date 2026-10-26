import Image from "next/image";
import Astrolabe from "./home/Astrolabe";

// Where the twinkling stars sit around the arch, as % of the frame, with staggered timings.
const SPARKLES = [
  { top: "6%", left: "-6%", size: 14, delay: "0s" },
  { top: "30%", left: "100%", size: 10, delay: "1.1s" },
  { top: "72%", left: "-8%", size: 9, delay: "2.3s" },
  { top: "-4%", left: "78%", size: 11, delay: "0.6s" },
  { top: "92%", left: "96%", size: 12, delay: "1.7s" },
];

/** The portrait as an arched observatory window: turning astrolabe behind, gold arch, orbiting star, twinkles. */
export default function MagicPortrait({ alt, priority }: { alt: string; priority?: boolean }) {
  return (
    <div className="group relative mx-auto w-60 sm:w-64 lg:mx-0 lg:w-full lg:max-w-xs">
      {/* Turning astrolabe and breathing glow behind the window. */}
      <Astrolabe className="absolute left-1/2 top-[38%] w-[170%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-35" />
      <span
        aria-hidden="true"
        className="absolute inset-[-12%] rounded-full bg-[radial-gradient(circle,rgba(216,180,106,0.22)_0%,rgba(124,242,201,0.06)_45%,transparent_70%)] motion-safe:animate-[breathe_6s_ease-in-out_infinite]"
      />

      <div className="relative aspect-[4/5]">
        {/* Outer gold arch, drawn just outside the photo. */}
        <span
          aria-hidden="true"
          className="absolute -inset-2.5 rounded-t-full rounded-b-xl border border-gold/50 shadow-[0_0_30px_-6px_rgba(216,180,106,0.5)] transition-shadow duration-700 group-hover:shadow-[0_0_50px_-4px_rgba(216,180,106,0.7)]"
        />
        <span aria-hidden="true" className="absolute -inset-5 rounded-t-full rounded-b-2xl border border-dashed border-gold/20" />

        <div className="relative h-full w-full overflow-hidden rounded-t-full rounded-b-lg bg-night-2">
          <Image
            src="/Haridwar.jpg"
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 256px, 320px"
            className="object-cover object-[50%_18%] transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,15,30,0.55),transparent_45%)]"
          />
        </div>

        {/* A small star in orbit around the window. */}
        <span aria-hidden="true" className="absolute inset-[-14%] motion-safe:animate-[spin_18s_linear_infinite]">
          <span className="absolute left-1/2 top-0 -translate-x-1/2 text-gold drop-shadow-[0_0_6px_rgba(216,180,106,0.9)]">✦</span>
        </span>

        {SPARKLES.map((s) => (
          <span
            key={s.top + s.left}
            aria-hidden="true"
            className="absolute text-gold motion-safe:animate-[twinkle_3.2s_ease-in-out_infinite]"
            style={{ top: s.top, left: s.left, fontSize: s.size, animationDelay: s.delay }}
          >
            ✦
          </span>
        ))}
      </div>
    </div>
  );
}
