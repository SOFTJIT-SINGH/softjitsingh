"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function HomepageAbout() {
  return (
    <section className="w-full bg-[#050505] py-32">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative flex-shrink-0"
          >
            <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full"></div>
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden ring-1 ring-white/10">
              <Image src="/Haridwar.jpg" alt="Softjit Singh" fill className="object-cover" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex-1"
          >
            <h2 className="text-sm font-mono text-gray-500 tracking-widest uppercase mb-4">About</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              I&apos;m a Software Engineer at Pseudotek Solutions, where I solo-architect production 
              SaaS platforms — real-time video consultation systems, multi-tenant POS platforms, 
              and AI-integrated mobile applications — all serving real businesses and real users.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              I work in 3-5 day delivery cycles. Every project ships with server-side validation (Zod), 
              role-based access control, and race-condition-proof data handling. TypeScript strict mode. 
              Vitest + Playwright. No shortcuts.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-gray-300 transition-colors group"
            >
              More about my work <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
