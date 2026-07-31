"use client";

import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export default function FeaturedEngagement() {
  return (
    <section className="w-full bg-[#050505] border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3 flex-wrap text-sm">
            <span className="text-[10px] font-mono text-blue-300 uppercase tracking-widest border border-blue-500/20 bg-blue-500/5 px-2 py-0.5 rounded-full">
              Recent Shipment
            </span>
            <span className="text-white font-semibold">HealChakra</span>
            <span className="text-gray-600" aria-hidden="true">·</span>
            <span className="text-gray-300">90-day build</span>
            <span className="text-gray-600" aria-hidden="true">·</span>
            <span className="text-gray-300">{SITE.metrics.concurrentUsers} concurrent users</span>
            <span className="text-gray-600" aria-hidden="true">·</span>
            <span className="text-gray-300">{SITE.metrics.mediaLatency} p75 media latency</span>
          </div>
          <Link
            href="/projects/healchakra"
            className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition-colors group whitespace-nowrap font-medium"
          >
            See the case study
            <FaArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
