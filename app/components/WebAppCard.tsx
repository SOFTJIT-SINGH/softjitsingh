'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'
import { Project } from '@/types'
import Link from 'next/link'

export default function WebAppCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
      className='flex flex-col relative group'
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16 relative z-10">
        <div className='lg:w-1/3'>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center justify-center px-3 py-1.5 mb-6 rounded-md border border-cyan-500/30 bg-cyan-500/10 text-[10px] font-bold tracking-widest text-cyan-400 uppercase shadow-[0_0_15px_rgba(6,182,212,0.1)]"
          >
            {project.type}
          </motion.div>
          <h3 className='text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight'>
            {project.title}
          </h3>
          <div className='flex flex-wrap gap-2 mb-10'>
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-zinc-900 border border-white/10 text-xs font-medium text-gray-400 rounded-lg hover:border-white/30 hover:text-gray-200 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-bold rounded-full hover:bg-cyan-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95"
          >
            Explore Platform <FaArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="lg:w-2/3">
          <p className='text-gray-400 text-lg leading-relaxed mb-8'>
            {project.description}
          </p>
          <ul className="space-y-4">
            {project.bulletPoints?.map((point, i) => (
              <motion.li 
                key={i} 
                whileHover={{ x: 5 }}
                className="flex items-start gap-4 text-gray-300 transition-colors hover:text-white"
              >
                <span className="text-cyan-500 mt-1.5 text-xs">◆</span>
                <span className="text-sm leading-relaxed">{point}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto relative perspective-[1200px]">
        
        {/* Animated browser glow on hover */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-cyan-500/0 group-hover:bg-cyan-500/20 blur-[100px] transition-all duration-1000 pointer-events-none rounded-full group-hover:scale-110"></div>

        <motion.div 
          whileHover={{ rotateX: 2, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className='w-full aspect-[16/10] bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group-hover:border-white/30 transition-colors duration-500 group-hover:shadow-[0_0_50px_rgba(6,182,212,0.2)]'
        >
          
          {/* SaaS UI Top Bar */}
          <div className='w-full h-10 bg-zinc-900/80 border-b border-white/10 flex items-center px-4 gap-2 backdrop-blur-md'>
            <div className='w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-red-400 transition-colors'></div>
            <div className='w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-yellow-400 transition-colors'></div>
            <div className='w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-green-400 transition-colors'></div>
            <div className="ml-4 w-1/3 h-6 bg-black/50 rounded-md border border-white/10 flex items-center px-3 text-[10px] text-gray-400 font-mono shadow-inner">
              {project.link.replace("https://", "").replace(".git", "")}
            </div>
          </div>

          <div className="relative w-full h-[calc(100%-2.5rem)]">
            {project.image ? (
              <motion.div 
                className="w-full h-full relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} interface`}
                  fill
                  sizes='(max-width: 1024px) 100vw, 1024px'
                  className='object-cover object-top'
                />
              </motion.div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center bg-[#050505]">
                 <div className="text-gray-400 font-semibold text-2xl uppercase mb-2 tracking-tight">{project.title}</div>
                 <div className="text-gray-600 text-sm font-mono">Assets Pending</div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}