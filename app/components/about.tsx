"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaCode, FaServer, FaMobile, FaVideo, FaDownload, FaFileAlt } from "react-icons/fa";
import Link from "next/link";
import MethodologySection from "./MethodologySection";
import { SITE } from "@/lib/constants";

const skills = [
  {
    icon: <FaCode className="text-2xl" />,
    title: "Full-Stack Web",
    description: `Production SaaS platforms with Next.js 16, TypeScript, PostgreSQL, and server-side validation via Zod. ${SITE.metrics.productionApps}+ shipped.`,
  },
  {
    icon: <FaServer className="text-2xl" />,
    title: "Backend & Data",
    description: "Multi-tenant databases with row-level security, Redis caching, and race-condition-proof payment systems.",
  },
  {
    icon: <FaMobile className="text-2xl" />,
    title: "Mobile Engineering",
    description: "Cross-platform React Native (Expo) apps with real-time sync, AI integration, and offline capability.",
  },
  {
    icon: <FaVideo className="text-2xl" />,
    title: "Real-Time Systems",
    description: "WebRTC video/voice platforms via LiveKit, WebSocket state sync, and push notification infrastructure.",
  },
];

const timeline = [
  {
    period: "2025 — Present",
    title: "Independent Architecture & Consulting",
    description: "Expanding into specialized freelance development and technical instruction. Architected complex multi-tenant systems (BhojPOS) and real-time platforms (HealChakra). Currently teaching a 110-session advanced Next.js engineering cohort.",
  },
  {
    period: "2024 — Present",
    title: `Software Engineer @ ${SITE.employer.name}`,
    description: "Progressed to architecting end-to-end production systems. Shipped 18+ web and mobile applications serving real businesses, focusing on PostgreSQL row-level locks, Redis caching, and real-time WebRTC.",
  },
  {
    period: "2024 — 2026",
    title: `Master of Computer Applications (MCA)`,
    description: `Pursuing advanced computer science fundamentals at ${SITE.education.school} (${SITE.education.cgpa} CGPA). Applying theoretical concepts directly to production system design and architecture.`,
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-4">
            About <span className="text-blue-400">me</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Full-Stack Engineer at {SITE.employer.name}. Architected production platforms end-to-end, contributing across the stack.
          </p>
        </motion.header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative flex justify-center"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" aria-hidden="true" />
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
              <Image src="/Haridwar.jpg" alt={`${SITE.name} — ${SITE.location}`} fill className="object-cover" sizes="(max-width: 1024px) 256px, 288px" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <a
                href={SITE.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-gray-200 transition-all"
              >
                <FaFileAlt size={11} /> View 1-Page Resume ↗
              </a>
              <a
                href={SITE.resumePdfUrl}
                download={SITE.resumeFilename}
                className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white text-xs font-bold rounded-full border border-white/10 hover:bg-zinc-800 hover:border-white/30 transition-all"
              >
                <FaDownload size={11} /> Download PDF
              </a>
            </div>
            <h2 className="text-2xl font-bold text-white mb-6">
              {SITE.role} @ {SITE.employer.name}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-5">
              I architect production-grade real-time platforms handling {SITE.metrics.concurrentUsers} concurrent users with {SITE.metrics.mediaLatency} media latency. HealChakra (mental health), BhojPOS (restaurant POS), CityGuard (public safety), Mehar Foods (wholesale supply), OmSweets BYOB (sweet shop e-commerce), SalonFlow (salon management) — all shipped in production.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              {SITE.metrics.deliveryCycle} delivery cycles. I architect full-stack solutions with Next.js 16, React Native, LiveKit WebRTC, PostgreSQL, and TypeScript — contributing across every layer. Every project ships with server-side validation (Zod), role-based access control, and race-condition-proof data handling.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-zinc-900/40 backdrop-blur-md border border-white/10 p-5 rounded-2xl"
                >
                  <div className="text-blue-400 mb-3">{skill.icon}</div>
                  <h4 className="font-semibold text-white mb-2">{skill.title}</h4>
                  <p className="text-sm text-gray-400">{skill.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Engineering Timeline</h2>
          <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl max-w-4xl mx-auto shadow-2xl">
            <ol className="space-y-6">
              {timeline.map((entry, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500" aria-hidden="true" />
                    {i < timeline.length - 1 && <div className="w-px flex-1 bg-white/10" aria-hidden="true" />}
                  </div>
                  <div className={i < timeline.length - 1 ? "pb-6" : ""}>
                    <p className="text-sm text-blue-400 font-mono">{entry.period}</p>
                    <p className="text-white font-semibold mt-1">{entry.title}</p>
                    <p className="text-gray-400 text-sm mt-1">{entry.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <MethodologySection />
      </div>
    </div>
  );
}
