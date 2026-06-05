"use client";

import { motion } from "framer-motion";

const metrics = [
  { value: "10+", label: "Production Applications" },
  { value: "500+", label: "Concurrent Users" },
  { value: "<150ms", label: "Media Latency p75" },
  { value: "38%", label: "p95 Query Reduction" },
];

export default function MetricsBanner() {
  return (
    <section className="w-full bg-[#050505] py-20 border-y border-white/5">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-1">
                {metric.value}
              </div>
              <div className="text-xs text-gray-500 font-mono tracking-wider uppercase">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
