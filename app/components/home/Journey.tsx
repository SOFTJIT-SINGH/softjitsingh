"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";
import { useRef } from "react";
import { SITE } from "@/lib/constants";

const milestones = [
  {
    when: "Jun 2024",
    title: "Full-Stack Developer Intern @ Pseudotek Solutions",
    body: "Part-time and remote, while starting my MCA. Thrown straight into client work.",
  },
  {
    when: "2024",
    title: "First production ship",
    body: "BhojPOS went live for real restaurants. Learned multi-tenant isolation, Redis caching, and 3–5 day delivery cycles the hard way.",
  },
  {
    when: "2025",
    title: "Started freelancing",
    body: "OmSweets (sweet shop e-commerce), Mehar Foods (wholesale supply), SalonFlow (salon management), KSARTS AI (textile ML).",
  },
  {
    when: "Early 2026",
    title: "Software Engineer (SDE-1) & Teacher @ Pseudotek",
    body: "Promoted to SDE-1, building production platforms end to end, while teaching a 110-session live course on Next.js 16, React 19, Supabase Auth, Drizzle ORM and Zod 4.",
  },
  {
    when: "2026",
    title: "MCA @ Guru Nanak Dev University",
    body: "Finished with an 8.56 CGPA, after two years of shipping production software alongside the coursework.",
  },
  {
    when: "2026",
    title: `${SITE.employer.title} @ ${SITE.employer.name}`,
    body: "Software developer at an immigration consultancy in Amritsar, Punjab.",
  },
  ...(SITE.openToWork
    ? [
        {
          when: "Now",
          title: "Open to new roles",
          body: "Looking for a full-stack or mobile engineering role, and taking on freelance projects.",
        },
      ]
    : []),
];

/** Alternating left/right timeline on md+, with a centre line that draws itself as you scroll. */
export default function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden="true" className="absolute left-[5px] top-0 bottom-0 w-px bg-line md:left-1/2" />
      <motion.span
        aria-hidden="true"
        style={reduce ? undefined : { scaleY: scrollYProgress }}
        className="absolute left-[5px] top-0 bottom-0 w-px origin-top bg-gradient-to-b from-mint via-mint to-amber md:left-1/2"
      />
      {milestones.map((m, i) => {
        const latest = i === milestones.length - 1;
        const left = i % 2 === 0;
        return (
          <li key={m.title} className="relative pb-12 last:pb-0 md:grid md:grid-cols-2 md:gap-16">
            <span
              aria-hidden="true"
              className={`absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 md:left-1/2 md:-translate-x-[5px] ${
                latest
                  ? "border-amber bg-amber shadow-[0_0_14px_rgba(244,184,96,0.8)]"
                  : "border-mint bg-night shadow-[0_0_10px_rgba(124,242,201,0.5)]"
              }`}
            />
            <div
              data-reveal={left ? "left" : "right"}
              className={`pl-8 md:pl-0 ${left ? "md:col-start-1 md:text-right md:pr-4" : "md:col-start-2 md:pl-4"}`}
            >
              <p className={`font-mono text-[11px] mb-1.5 ${latest ? "text-amber" : "text-mint"}`}>{m.when}</p>
              <h3 className="font-serif text-2xl tracking-tight mb-2">{m.title}</h3>
              <p className={`text-sm text-mist leading-relaxed max-w-md ${left ? "md:ml-auto" : ""}`}>{m.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
