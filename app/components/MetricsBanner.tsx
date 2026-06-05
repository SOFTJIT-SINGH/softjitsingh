"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const metrics = [
  { value: "10+", label: "Production Applications" },
  { value: "500+", label: "Concurrent Users" },
  { value: "<150ms", label: "Media Latency p75" },
  { value: "38%", label: "p95 Query Reduction" },
];

function AnimatedMetric({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;

    if (value === "<150ms") {
      setDisplay(value);
      return;
    }

    let target = 0;
    let suffix = "";
    if (value.endsWith("+")) {
      target = parseInt(value);
      suffix = "+";
    } else if (value.endsWith("%")) {
      target = parseInt(value);
      suffix = "%";
    }

    const duration = 1500;
    const start = performance.now();
    let frame: number;

    const delay = setTimeout(() => {
      function tick(now: number) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(`${Math.floor(eased * target)}${suffix}`);
        if (progress < 1) frame = requestAnimationFrame(tick);
      }
      frame = requestAnimationFrame(tick);
    }, index * 100);

    return () => {
      clearTimeout(delay);
      cancelAnimationFrame(frame);
    };
  }, [inView, value, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-1 font-mono tabular-nums">
        {display}
      </div>
      <div className="text-xs text-gray-500 font-mono tracking-wider uppercase">
        {label}
      </div>
    </motion.div>
  );
}

export default function MetricsBanner() {
  return (
    <section className="w-full bg-[#050505] py-20 border-y border-white/5">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, idx) => (
            <AnimatedMetric key={metric.label} value={metric.value} label={metric.label} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
