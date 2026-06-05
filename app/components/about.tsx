'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaCode, FaPalette, FaServer, FaMobile, FaVideo } from 'react-icons/fa'

export default function About() {
  const skills = [
    {
      icon: <FaCode className="text-2xl" />,
      title: "Full-Stack Web",
      description: "Production SaaS platforms with Next.js 16, TypeScript, PostgreSQL, and server-side validation via Zod."
    },
    {
      icon: <FaServer className="text-2xl" />,
      title: "Backend & Data",
      description: "Multi-tenant databases with row-level security, Redis caching, and race-condition-proof payment systems."
    },
    {
      icon: <FaMobile className="text-2xl" />,
      title: "Mobile Engineering",
      description: "Cross-platform React Native (Expo) apps with real-time sync, AI integration, and offline capability."
    },
    {
      icon: <FaVideo className="text-2xl" />,
      title: "Real-Time Systems",
      description: "WebRTC video/voice platforms via LiveKit, WebSocket state sync, and push notification infrastructure."
    }
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter mb-4">
            About <span className="text-blue-400">Me</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get to know more about my skills, experience, and what I can bring to your project
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="relative w-72 h-72 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
              <Image src="/Haridwar.jpg" alt="Profile" fill className="object-cover" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Software Engineer @ Pseudotek Solutions
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              I architect production-grade real-time platforms that handle 500+ concurrent users with sub-150ms media latency. 
              My work spans mental health consultation systems (HealChakra), multi-tenant restaurant POS (BhojPOS), 
              and AI-powered mobile safety applications (CityGuard) — all shipped in production.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              I work in 3-5 day delivery cycles, solo-architecting full-stack solutions with Next.js 16, React Native, 
              LiveKit WebRTC, PostgreSQL, and TypeScript. Every project ships with server-side validation (Zod), 
              role-based access control, and race-condition-proof data handling.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-zinc-900/40 backdrop-blur-md border border-white/10 p-5 rounded-2xl"
                >
                  <div className="text-blue-400 mb-3 text-2xl">{skill.icon}</div>
                  <h4 className="font-semibold text-white mb-2">{skill.title}</h4>
                  <p className="text-sm text-gray-400">{skill.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Engineering Timeline</h3>
          <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl max-w-4xl mx-auto shadow-2xl">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <div className="w-px flex-1 bg-white/10"></div>
                </div>
                <div className="pb-6">
                  <p className="text-sm text-blue-400 font-mono">2024 — Present</p>
                  <p className="text-white font-semibold mt-1">Software Engineer @ Pseudotek Solutions</p>
                  <p className="text-gray-400 text-sm mt-1">Architecting production SaaS platforms serving real businesses. Solo-delivery of client projects in 3-5 day cycles.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <div className="w-px flex-1 bg-white/10"></div>
                </div>
                <div className="pb-6">
                  <p className="text-sm text-blue-400 font-mono">2024 — 2026</p>
                  <p className="text-white font-semibold mt-1">MCA @ Guru Nanak Dev University</p>
                  <p className="text-gray-400 text-sm mt-1">8.11 CGPA. Building production applications alongside coursework.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                </div>
                <div>
                  <p className="text-sm text-blue-400 font-mono">2024 — Present</p>
                  <p className="text-white font-semibold mt-1">10+ Production Applications Shipped</p>
                  <p className="text-gray-400 text-sm mt-1">Web apps, mobile apps, real-time systems, and AI integrations — all in production serving real users.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}