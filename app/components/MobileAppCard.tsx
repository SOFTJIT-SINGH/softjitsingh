'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'
import { Project } from '@/types'
import Link from 'next/link'

interface MobileAppCardProps {
  project: Project
  index: number
}

export default function MobileAppCard({ project, index }: MobileAppCardProps) {
  const isEven = index % 2 === 0

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-24 relative group`}
    >
      {/* Device Presentation */}
      <div className="w-full lg:w-1/2 flex justify-center relative perspective-[1000px]">
        {/* Animated hover glow behind phone */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-blue-500/0 group-hover:bg-blue-600/20 blur-[80px] rounded-full transition-all duration-1000 pointer-events-none group-hover:scale-110"></div>

        <motion.div 
          whileHover={{ rotateY: isEven ? -5 : 5, rotateX: 5, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative w-[280px] h-[600px] rounded-[3rem] border-[6px] border-[#111] bg-black overflow-hidden ring-1 ring-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group-hover:ring-white/30 transition-shadow duration-500 z-10 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]"
        >
          
          {/* Dynamic Island Mimic */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[80px] h-[24px] bg-black rounded-full z-30 flex items-center justify-end px-2 border border-white/5 shadow-inner">
             <div className="w-2 h-2 rounded-full bg-zinc-800 ring-1 ring-white/10 relative overflow-hidden">
               <div className="absolute inset-0 bg-blue-500/20 blur-[1px]"></div>
             </div>
          </div>

          {project.image ? (
            <motion.div 
              className="w-full h-full relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Image 
                src={project.image} 
                alt={`${project.title} interface`}
                fill
                sizes="(max-width: 768px) 100vw, 280px"
                className="object-cover"
              />
            </motion.div>
          ) : (
            <div className="w-full h-full bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-center border-t border-white/5 mt-[50px]">
               <div className="text-gray-400 font-semibold text-lg uppercase tracking-tight mb-2">{project.title}</div>
               <div className="text-gray-600 text-xs font-mono">Visuals Pending</div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2 text-left relative z-10">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center justify-center px-3 py-1.5 mb-6 rounded-md border border-blue-500/30 bg-blue-500/10 text-[10px] font-bold tracking-widest text-blue-400 uppercase shadow-[0_0_15px_rgba(59,130,246,0.1)]"
        >
          {project.type}
        </motion.div>
        
        <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">{project.title}</h3>
        
        <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
          {project.description}
        </p>
        
        <ul className="space-y-4 mb-10 max-w-lg">
          {project.bulletPoints?.map((point, i) => (
            <motion.li 
              key={i} 
              whileHover={{ x: 5 }}
              className="flex items-start gap-4 text-gray-300 transition-colors hover:text-white"
            >
              <span className="text-blue-500 mt-1.5 text-xs">◆</span>
              <span className="text-sm leading-relaxed">{point}</span>
            </motion.li>
          ))}
        </ul>
        
        <div className="flex flex-wrap gap-2 mb-12 max-w-lg">
          {project.techStack.map((tech, i) => (
            <span key={i} className="px-3 py-1.5 bg-zinc-900 border border-white/10 text-xs font-medium text-gray-400 rounded-lg hover:border-white/30 hover:text-gray-200 transition-colors">
              {tech}
            </span>
          ))}
        </div>

        <Link 
          href={`/projects/${project.slug}`} 
          className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-bold rounded-full hover:bg-blue-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95"
        >
          View Case Study <FaArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}