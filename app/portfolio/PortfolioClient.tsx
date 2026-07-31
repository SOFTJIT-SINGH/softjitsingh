"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaCode, FaServer, FaDatabase, FaPalette, FaTools, FaReact, FaNodeJs, FaMobile, FaVideo } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql, SiSupabase, SiRedis, SiDocker } from "react-icons/si";
import { mobileProjects, webProjects } from "@/lib/data";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

type Tab = "frontend" | "mobile" | "backend" | "realtime" | "tools";

const skills: Record<Tab, { name: string; icon: React.ReactNode }[]> = {
  frontend: [
    { name: "Next.js 16", icon: <SiNextdotjs /> },
    { name: "React 19", icon: <FaReact /> },
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "Tailwind CSS 4", icon: <SiTailwindcss /> },
    { name: "Framer Motion", icon: <FaCode /> },
  ],
  mobile: [
    { name: "React Native", icon: <FaMobile /> },
    { name: "Expo", icon: <FaMobile /> },
    { name: "NativeWind", icon: <FaPalette /> },
    { name: "Expo Router", icon: <FaMobile /> },
  ],
  backend: [
    { name: "Node.js", icon: <FaNodeJs /> },
    { name: "Express.js", icon: <FaServer /> },
    { name: "PostgreSQL", icon: <SiPostgresql /> },
    { name: "MongoDB", icon: <SiMongodb /> },
    { name: "Supabase", icon: <SiSupabase /> },
    { name: "Redis", icon: <SiRedis /> },
  ],
  realtime: [
    { name: "LiveKit WebRTC", icon: <FaVideo /> },
    { name: "Supabase Realtime", icon: <SiSupabase /> },
    { name: "WebSockets", icon: <FaServer /> },
    { name: "Web Push API", icon: <FaCode /> },
  ],
  tools: [
    { name: "Docker", icon: <SiDocker /> },
    { name: "Git/GitHub", icon: <FaTools /> },
    { name: "Drizzle ORM", icon: <FaDatabase /> },
    { name: "Zod 4", icon: <FaCode /> },
  ],
};

const tabLabels: Record<Tab, string> = {
  frontend: "Frontend",
  mobile: "Mobile",
  backend: "Backend",
  realtime: "Real-Time",
  tools: "Tools",
};

export default function PortfolioClient() {
  const [activeTab, setActiveTab] = useState<Tab>("frontend");
  const [typeFilter, setTypeFilter] = useState<"all" | "Mobile App" | "Web Application">("all");
  const projects = [...mobileProjects, ...webProjects].filter((p) =>
    typeFilter === "all" ? true : p.type === typeFilter
  );

  return (
    <div className="min-h-screen bg-[#030303] text-gray-200 font-sans py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
      <motion.div
        animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-500/10 blur-[120px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center flex flex-col items-center"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest">Project Archive · {projects.length}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 text-white">
            Engineered to Scale.
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-400 mb-2 max-w-2xl">
            18 production-grade platforms, mobile applications, and AI integrations.
          </p>
          <p className="text-sm text-gray-500 max-w-xl">
            Every project ships with Zod validation, RBAC, and race-condition-proof data handling.
          </p>
        </motion.header>

        <section className="mb-16">
          <h2 className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-4 text-center">Stack</h2>
          <div className="flex flex-wrap gap-2 mb-8 justify-center" role="tablist" aria-label="Skill categories">
            {(Object.keys(skills) as Tab[]).map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border min-h-11 ${
                  activeTab === tab
                    ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    : "bg-zinc-900/50 text-gray-400 border-white/5 hover:border-white/20 hover:text-white"
                }`}
              >
                {tabLabels[tab]}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
            role="tabpanel"
          >
            {skills[activeTab].map((skill) => (
              <div
                key={skill.name}
                className="group flex items-center gap-3 p-4 rounded-xl bg-zinc-900/30 border border-white/5 hover:border-blue-500/30 hover:bg-zinc-900/50 transition-all"
              >
                <span className="text-2xl text-gray-400 group-hover:text-blue-400 transition-colors">{skill.icon}</span>
                <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
              </div>
            ))}
          </motion.div>
        </section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" aria-hidden="true" />

        <section>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="text-xs font-mono text-gray-500 tracking-widest uppercase">
              All Projects · {projects.length}
            </h2>
            <div className="flex gap-2" role="tablist" aria-label="Project type">
              {(["all", "Mobile App", "Web Application"] as const).map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={typeFilter === f}
                  onClick={() => setTypeFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors border min-h-11 ${
                    typeFilter === f
                      ? "bg-blue-500/10 text-blue-300 border-blue-500/30"
                      : "bg-transparent text-gray-500 border-white/5 hover:border-white/20 hover:text-gray-300"
                  }`}
                >
                  {f === "all" ? "All" : f === "Mobile App" ? "Mobile" : "Web"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
                layout
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block relative p-6 md:p-8 rounded-2xl bg-zinc-900/20 border border-white/5 hover:border-white/20 transition-all overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="md:w-2/3">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                          {project.type}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-100 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <div className="md:w-1/3 flex flex-col items-start md:items-end gap-3">
                      <div className="flex flex-wrap md:justify-end gap-1.5">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-semibold text-gray-300 bg-black/50 border border-white/10 px-2 py-0.5 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="text-[10px] font-semibold text-gray-500 px-2 py-0.5">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                        Read article <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
