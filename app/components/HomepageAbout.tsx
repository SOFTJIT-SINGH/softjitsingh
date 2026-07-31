"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { SITE } from "@/lib/constants";

export default function HomepageAbout() {
  return (
    <section className="w-full bg-[#050505] py-24">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative flex-shrink-0"
          >
            <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full" aria-hidden="true" />
            <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden ring-1 ring-white/10">
              <Image src="/Haridwar.jpg" alt={`${SITE.name} — ${SITE.location}`} fill className="object-cover" sizes="(max-width: 768px) 224px, 256px" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1"
          >
            <h2 className="text-sm font-mono text-gray-500 tracking-widest uppercase mb-4">About</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-5">
              I&apos;m a Full-Stack Engineer at <span className="text-white font-medium">{SITE.employer.name}</span> in {SITE.location.split(",")[0]}. I architect production SaaS platforms — real-time video consultation, multi-tenant POS, and AI-integrated mobile apps — serving real businesses at scale.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              {SITE.metrics.productionApps}+ deployed applications, {SITE.metrics.concurrentUsers} concurrent users, {SITE.metrics.mediaLatency} media latency. Every project ships with server-side validation (Zod), RBAC, and race-condition-proof data handling. {SITE.metrics.deliveryCycle} delivery cycles, no shortcuts.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-gray-300 transition-colors group"
              >
                More about my work <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group"
              >
                Get in touch →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
