"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    year: "2024 — Present",
    title: "Software Engineer @ Pseudotek Solutions",
    description:
      "Solo-architect production SaaS platforms for multiple clients. Real-time video consultation, multi-tenant POS, AI-integrated systems.",
  },
  {
    year: "2024 — 2026",
    title: "MCA @ Guru Nanak Dev University",
    description:
      "8.56 CGPA. Building production applications alongside coursework. Moved from intern-level to shipping production software.",
  },
  {
    year: "2024",
    title: "First Production Ship",
    description:
      "BhojPOS — multi-tenant restaurant POS deployed to real clients. Learned multi-tenant isolation, Redis caching, 3-5 day delivery cycles.",
  },
  {
    year: "2025",
    title: "Started Freelance Practice",
    description:
      "Independent client projects: OmSweets BYOB (sweet shop e-commerce), Mehar Foods (wholesale supply platform), SalonFlow (salon management), KSARTS AI (textile ML system).",
  },
  {
    year: "2025 — Present",
    title: "Full-Stack Web Development Teacher",
    description:
      "110-session live course. Next.js 16, React 19, Supabase Auth, Drizzle ORM, Zod 4, Tailwind v4. Built project-based curriculum with real-world build-alongs.",
  },
  {
    year: "2025 — Present",
    title: "18 Production Applications",
    description:
      "Web apps, mobile apps, real-time systems, AI integrations. From HealChakra (500+ concurrent users) to SecretSoulmate (AI compatibility engine) to Mehar Foods (real-time order tracking).",
  },
];

export default function JourneyTimeline() {
  return (
    <section className="w-full bg-[#050505] py-32 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="mb-20">
          <h2 className="text-sm font-mono text-gray-500 tracking-widest uppercase mb-4">Engineering Journey</h2>
          <p className="text-xl md:text-2xl font-light text-gray-400 max-w-2xl">
            From intern to production SaaS architect in under two years.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/5 md:-translate-x-px" aria-hidden="true" />

          <div className="space-y-16">
            {milestones.map((milestone, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="relative flex flex-col md:flex-row items-start gap-6 md:gap-12"
                >
                  <div
                    className={`hidden md:block md:w-1/2 ${isLeft ? "" : "md:order-2"}`}
                  />

                  <div
                    className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-[#050505] -translate-x-1.5 md:translate-x-0 mt-1.5 z-10"
                    aria-hidden="true"
                  />

                  <div className={`md:w-1/2 pl-12 md:pl-0 ${isLeft ? "" : "md:order-1"}`}>
                    <div className={isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}>
                      <p className="text-xs text-blue-400 font-mono tracking-wider mb-2">
                        {milestone.year}
                      </p>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
