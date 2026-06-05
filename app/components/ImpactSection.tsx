"use client";

import { motion } from "framer-motion";
import { FaHospital, FaStore, FaShieldAlt, FaHeart, FaPlane, FaGavel } from "react-icons/fa";

const domains = [
  { icon: <FaHospital className="text-blue-400" />, title: "Healthcare", description: "Mental wellness consultation platform connecting patients with verified therapists via real-time video sessions." },
  { icon: <FaStore className="text-blue-400" />, title: "Restaurant Operations", description: "Multi-tenant B2B POS system managing orders, inventory, and digital menus across multiple locations." },
  { icon: <FaShieldAlt className="text-blue-400" />, title: "Public Safety", description: "AI-powered crime reporting with real-time heatmaps and emergency SOS broadcasting." },
  { icon: <FaGavel className="text-blue-400" />, title: "FinTech", description: "Per-minute wallet billing with race-condition-proof payment reconciliation at scale." },
  { icon: <FaPlane className="text-blue-400" />, title: "Travel Tech", description: "Real-time group itinerary coordination and location synchronization across mobile devices." },
  { icon: <FaHeart className="text-blue-400" />, title: "Social Platforms", description: "AI-driven compatibility engine and high-concurrency social matching infrastructure." },
];

export default function ImpactSection() {
  return (
    <section className="w-full bg-[#050505] py-24 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-16"
        >
          <h2 className="text-sm font-mono text-gray-500 tracking-widest uppercase mb-4">Real-World Impact</h2>
          <p className="text-xl md:text-2xl font-light text-gray-400 max-w-2xl">
            Production software serving real businesses across six industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {domains.map((domain, idx) => (
            <motion.div
              key={domain.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group bg-white/[0.02] border border-white/5 hover:border-blue-500/20 rounded-xl p-6 transition-all duration-300"
            >
              <div className="text-2xl mb-4">{domain.icon}</div>
              <h3 className="text-sm font-semibold text-white mb-2">{domain.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{domain.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-gray-600 font-mono tracking-wider">
            10+ production applications shipped across {domains.length} industries
          </p>
        </motion.div>
      </div>
    </section>
  );
}
