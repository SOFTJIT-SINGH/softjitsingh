"use client";

import { motion } from "framer-motion";
import { FaLock, FaServer, FaDatabase, FaShieldAlt, FaBolt, FaTerminal } from "react-icons/fa";
import { SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiPostgresql, SiMongodb, SiSupabase, SiRedis } from "react-icons/si";

interface ProjectVisualFallbackProps {
  title: string;
  type: string;
  techStack: string[];
  slug: string;
  isMobile?: boolean;
}

export default function ProjectVisualFallback({
  title,
  type,
  techStack,
  slug,
  isMobile = false,
}: ProjectVisualFallbackProps) {
  return (
    <div className="w-full h-full bg-[#070709] relative overflow-hidden flex flex-col justify-between p-6 select-none border border-white/5">
      {/* Background Grid & Ambient Halo */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]"
        aria-hidden="true"
      />
      <div
        className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/10 blur-[90px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-600/10 blur-[90px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
            PRODUCTION SYSTEM
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-xs font-mono">
          <FaLock size={10} className="text-gray-400" />
          <span>{slug}.production</span>
        </div>
      </div>

      {/* Center UI Showcase */}
      <div className="relative z-10 my-auto py-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-3"
        >
          <FaBolt className="text-blue-400" size={12} />
          <span className="text-[11px] font-mono text-gray-300 uppercase tracking-wider">{type}</span>
        </motion.div>

        <h4 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
          {title}
        </h4>

        <div className="flex items-center gap-2 text-xs text-gray-400 font-mono mb-6">
          <FaTerminal size={11} className="text-blue-400" />
          <span>Active Deployment · Multi-Tenant Isolated</span>
        </div>

        {/* Mock Metrics / Code Signals */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-md">
          <div className="bg-zinc-900/60 border border-white/5 rounded-xl p-3 text-center">
            <div className="text-xs font-mono text-gray-500 uppercase">Security</div>
            <div className="text-sm font-bold text-white mt-0.5 flex items-center justify-center gap-1">
              <FaShieldAlt className="text-blue-400" size={10} /> Zod + RBAC
            </div>
          </div>
          <div className="bg-zinc-900/60 border border-white/5 rounded-xl p-3 text-center">
            <div className="text-xs font-mono text-gray-500 uppercase">Latency</div>
            <div className="text-sm font-bold text-emerald-400 mt-0.5">&lt;150ms</div>
          </div>
          <div className="bg-zinc-900/60 border border-white/5 rounded-xl p-3 text-center">
            <div className="text-xs font-mono text-gray-500 uppercase">Uptime</div>
            <div className="text-sm font-bold text-white mt-0.5">99.9% SLA</div>
          </div>
        </div>
      </div>

      {/* Bottom Tech Bar */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4">
        <div className="flex items-center gap-1.5 flex-wrap">
          {techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono text-gray-400 bg-black/60 border border-white/10 px-2 py-0.5 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest hidden sm:inline">
          Softjit Singh Architecture
        </span>
      </div>
    </div>
  );
}
