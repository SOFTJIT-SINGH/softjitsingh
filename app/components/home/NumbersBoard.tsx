"use client";

import { useEffect, useRef, useState } from "react";
import SpotlightGrid from "./SpotlightGrid";

/** Counts from `from` to `to` once `run` turns true, easing out. */
function useCount(from: number, to: number, run: boolean, ms = 1400) {
  const [v, setV] = useState(from);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setV(to);
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / ms, 1);
      setV(Math.round(from + (to - from) * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [from, to, run, ms]);
  return v;
}

function Card({ children, label, receipt }: { children: React.ReactNode; label: string; receipt: string }) {
  return (
    <li className="spot flex min-w-0 flex-col rounded-lg border border-line bg-night-2/60 p-6 transition-colors hover:border-mint/40">
      {children}
      <p className="mt-auto pt-5 text-sm text-cream/90">{label}</p>
      <p className="mt-1 font-mono text-[11px] text-mist">{receipt}</p>
    </li>
  );
}

const Value = ({ children }: { children: React.ReactNode }) => (
  <p className="font-serif text-5xl tracking-tight tabular-nums whitespace-nowrap">{children}</p>
);
const Unit = ({ children }: { children: React.ReactNode }) => <span className="ml-0.5 text-2xl text-mist">{children}</span>;

export default function NumbersBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setRun(true), { threshold: 0.35 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const users = useCount(0, 500, run);
  const latency = useCount(0, 150, run);
  const response = useCount(320, 180, run, 1800);
  const coverage = useCount(0, 90, run);
  const litDots = Math.round(users / 10);

  return (
    <div ref={ref}>
      <SpotlightGrid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card label="concurrent users" receipt="HealChakra, in production">
          <Value>
            {users}
            <Unit>+</Unit>
          </Value>
          {/* One dot per ten people online. */}
          <div className="mt-5 grid max-w-[13rem] grid-cols-10 gap-1" aria-hidden="true">
            {Array.from({ length: 50 }, (_, i) => (
              <span
                key={i}
                className={`aspect-square rounded-full transition-colors duration-300 ${i < litDots ? "bg-mint shadow-[0_0_6px_rgba(124,242,201,0.7)]" : "bg-line"}`}
              />
            ))}
          </div>
        </Card>

        <Card label="p75 media latency" receipt="LiveKit WebRTC sessions">
          <Value>
            <Unit>&lt;</Unit>
            {latency}
            <Unit>ms</Unit>
          </Value>
          <div className="mt-5 flex h-[46px] items-end gap-1.5" aria-hidden="true">
            {[0.5, 0.9, 0.65, 1, 0.75, 0.45, 0.85, 0.6, 0.95, 0.55].map((h, i) => (
              <span
                key={i}
                className="w-full origin-bottom rounded-sm bg-mint/80 motion-safe:animate-[eq_1.1s_ease-in-out_infinite]"
                style={{ height: `${h * 100}%`, animationDelay: `${i * -0.13}s` }}
              />
            ))}
          </div>
        </Card>

        <Card label="avg API response" receipt="BhojPOS, before and after Redis">
          <Value>
            {response}
            <Unit>ms</Unit>
          </Value>
          <div className="mt-5 space-y-2 font-mono text-[10px] text-mist" aria-hidden="true">
            <div className="flex items-center gap-2">
              <span className="w-10">before</span>
              <span className="h-2 flex-1 rounded-full bg-mist/40" />
              <span className="w-10 text-right">320</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-10">after</span>
              <span className="h-2 flex-1 rounded-full bg-line">
                <span
                  className="block h-full rounded-full bg-mint transition-[width] duration-[1800ms] ease-out"
                  style={{ width: run ? "56%" : "100%" }}
                />
              </span>
              <span className="w-10 text-right text-mint">180</span>
            </div>
            <p className="pt-1 text-mint">−44% with a Redis cache</p>
          </div>
        </Card>

        <Card label="unit test coverage" receipt="BhojPOS backend, Vitest">
          <div className="flex items-center justify-between gap-4">
            <Value>
              {coverage}
              <Unit>%+</Unit>
            </Value>
            <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90" aria-hidden="true">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1f2a44" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="15.9"
                fill="none"
                stroke="#7cf2c9"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="100"
                strokeDashoffset={100 - coverage}
                pathLength={100}
              />
            </svg>
          </div>
          <p className="mt-5 font-mono text-[10px] text-mist leading-relaxed" aria-hidden="true">
            30+ API routes secured with JWT and role-based access.
          </p>
        </Card>
      </SpotlightGrid>
    </div>
  );
}
