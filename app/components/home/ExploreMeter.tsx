"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/** Counts how many project cards a visitor has actually seen, and nudges them to finish the set. */
export default function ExploreMeter() {
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const [total, setTotal] = useState(0);
  const [inZone, setInZone] = useState(false);

  useEffect(() => {
    const cards = [...document.querySelectorAll<HTMLElement>("[data-explore]")];
    setTotal(new Set(cards.map((c) => c.dataset.explore)).size);

    const cardObserver = new IntersectionObserver(
      (entries) => {
        const fresh = entries.filter((e) => e.isIntersecting).map((e) => (e.target as HTMLElement).dataset.explore!);
        if (fresh.length) setSeen((prev) => new Set([...prev, ...fresh]));
      },
      { threshold: 0.6 }
    );
    cards.forEach((c) => cardObserver.observe(c));

    const zones = document.querySelectorAll("[data-explore-zone]");
    const visible = new Set<Element>();
    const zoneObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setInZone(visible.size > 0);
    });
    zones.forEach((z) => zoneObserver.observe(z));

    return () => {
      cardObserver.disconnect();
      zoneObserver.disconnect();
    };
  }, []);

  const count = seen.size;
  const done = total > 0 && count >= total;
  const show = (inZone && count > 0) || done;

  return (
    <div
      aria-live="polite"
      className={`fixed bottom-5 left-1/2 z-40 -translate-x-1/2 transition-all duration-500 ${
        show ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4"
      }`}
    >
      <div className="flex items-center gap-3 rounded-full border border-line bg-night/85 px-4 py-2 font-mono text-[11px] text-mist shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-md">
        {done ? (
          <Link href="/contact" className="text-mint hover:text-cream">
            ✓ all {total} explored · say hi →
          </Link>
        ) : (
          <>
            <span className="relative h-1 w-20 overflow-hidden rounded-full bg-line" aria-hidden="true">
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-mint transition-[width] duration-500"
                style={{ width: `${total ? (count / total) * 100 : 0}%` }}
              />
            </span>
            <span>
              explored <span className="text-cream tabular-nums">{count}</span>/{total}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
