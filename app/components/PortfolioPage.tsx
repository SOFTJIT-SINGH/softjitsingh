'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FaCode, 
  FaServer, 
  FaDatabase, 
  FaPalette, 
  FaTools,
  FaPython,
  FaJava,
  FaJs,
  FaReact,
  FaNodeJs,
} from 'react-icons/fa'
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiTensorflow,
} from 'react-icons/si'
import { mobileProjects, webProjects } from '@/lib/data'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

const PortfolioPage = () => {
  const [activeTab, setActiveTab] = useState('languages')

  const skills = {
    languages: [
      { name: 'Python', icon: <FaPython className="text-gray-400" /> },
      { name: 'Java', icon: <FaJava className="text-gray-400" /> },
      { name: 'JavaScript', icon: <FaJs className="text-gray-400" /> },
      { name: 'TypeScript', icon: <SiTypescript className="text-gray-400" /> },
      { name: 'C++', icon: <FaCode className="text-gray-400" /> },
      { name: 'SQL', icon: <FaDatabase className="text-gray-400" /> },
      { name: 'PHP', icon: <FaServer className="text-gray-400" /> }
    ],
    frontend: [
      { name: 'Next.js', icon: <SiNextdotjs className="text-gray-400" /> },
      { name: 'React', icon: <FaReact className="text-gray-400" /> },
      { name: 'HTML/CSS', icon: <FaCode className="text-gray-400" /> },
      { name: 'Tailwind', icon: <SiTailwindcss className="text-gray-400" /> },
      { name: 'Shadcn UI', icon: <FaPalette className="text-gray-400" /> }
    ],
    backend: [
      { name: 'Node.js', icon: <FaNodeJs className="text-gray-400" /> },
      { name: 'Express', icon: <FaServer className="text-gray-400" /> },
      { name: 'Prisma', icon: <FaDatabase className="text-gray-400" /> }
    ],
    aiMl: [
      { name: 'TensorFlow', icon: <SiTensorflow className="text-gray-400" /> },
      { name: 'Scikit-learn', icon: <FaTools className="text-gray-400" /> },
      { name: 'Pandas', icon: <FaDatabase className="text-gray-400" /> }
    ],
    databases: [
      { name: 'Supabase', icon: <FaDatabase className="text-gray-400" /> },
      { name: 'MongoDB', icon: <SiMongodb className="text-gray-400" /> }
    ],
  }

  const projects = [...mobileProjects, ...webProjects]

  return (
    <div className="min-h-screen bg-[#030303] text-gray-200 font-sans py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Animated Subtle Background Accents */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <motion.div 
        animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }} 
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-500/10 blur-[120px] pointer-events-none rounded-full"
      ></motion.div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="mb-32 text-center flex flex-col items-center"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-md cursor-pointer hover:border-white/30 transition-colors"
          >
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest">Portfolio Archive</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500 pb-2">
            Engineered to Scale.
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-400 mb-8 max-w-2xl">
            A complete collection of production-grade platforms, mobile applications, and AI integrations.
          </p>
        </motion.div>

        {/* Skills Section - Interactive Bento Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          className="mb-32"
        >
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            {Object.keys(skills).map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 capitalize border ${
                  activeTab === tab 
                  ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                  : 'bg-zinc-900/50 text-gray-400 border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                {tab.replace(/([A-Z])/g, ' $1').trim()}
              </motion.button>
            ))}
          </div>

          <motion.div 
            key={activeTab} // Force re-render animation when tab changes
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {skills[activeTab as keyof typeof skills].map((skill, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group flex flex-col items-center justify-center gap-4 p-8 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-blue-500/30 hover:bg-zinc-900/50 transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)]"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="text-4xl text-gray-400 group-hover:text-blue-400 transition-colors duration-300 relative z-10">{skill.icon}</div>
                <span className="text-sm font-bold text-gray-300 group-hover:text-white relative z-10 transition-colors">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-32"></div>

        {/* Projects List - Interactive Rows */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          className="mb-32"
        >
          <div className="space-y-6">
            {projects.map((project, index) => (
              <motion.div 
                key={index} 
                whileHover={{ scale: 1.01, x: 5 }}
                className="group relative flex flex-col md:flex-row md:items-center justify-between p-8 md:p-10 rounded-3xl bg-zinc-900/20 border border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl"
              >
                
                {/* Dynamic Gradient Hover Background */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="md:w-1/2 relative z-10 mb-6 md:mb-0">
                   <div className="flex items-center gap-3 mb-4">
                     <span className="text-[11px] font-bold tracking-widest text-blue-400 uppercase px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">{project.type}</span>
                   </div>
                   <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight group-hover:text-blue-100 transition-colors">{project.title}</h3>
                   <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md">{project.description}</p>
                </div>
                
                <div className="md:w-1/2 flex flex-col items-start md:items-end relative z-10">
                   <div className="flex flex-wrap md:justify-end gap-2 mb-8">
                     {project.techStack.slice(0, 4).map((tech, i) => (
                       <span key={i} className="text-[11px] font-semibold text-gray-300 bg-black/50 border border-white/10 px-3 py-1.5 rounded-full shadow-inner">
                         {tech}
                       </span>
                     ))}
                   </div>
                   
                   {project.link && (
                     <Link
                       href={`/projects/${project.slug}`}
                       className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black text-sm font-bold rounded-full hover:bg-blue-50 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                     >
                       Explore Platform <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                     </Link>
                   )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default PortfolioPage