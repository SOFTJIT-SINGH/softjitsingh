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
      transition={{ duration: 0.7 }}
      className='flex flex-col items-center relative'
    >
      <div className='text-center max-w-3xl mb-12 z-10'>
        <div className='text-cyan-400 font-bold tracking-widest text-xs uppercase mb-3 drop-shadow-md'>
          {project.type}
        </div>
        <h3 className='text-4xl md:text-6xl font-extrabold mb-6 text-white tracking-tight'>
          {project.title}
        </h3>
        <p className='text-lg text-gray-400 leading-relaxed mb-8'>
          {project.description}
        </p>
        
        <div className='flex flex-wrap justify-center gap-2 mb-10'>
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className='px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 backdrop-blur-md shadow-sm'
            >
              {tech}
            </span>
          ))}
        </div>
        
        <Link
          href={`/projects/${project.slug}`}
          className='group inline-flex items-center gap-3 px-8 py-3.5 bg-white text-black hover:bg-gray-200 rounded-full font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]'
        >
          View Details <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Browser Window with Ambient Glow */}
      <div className="relative w-full max-w-5xl flex justify-center">
        {/* Massive Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className='w-full aspect-[16/10] md:aspect-[16/9] rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl overflow-hidden relative group z-10 transition-transform duration-500 hover:scale-[1.01]'>
          
          {/* macOS Browser Top Bar */}
          <div className='w-full h-10 bg-zinc-900 border-b border-white/5 flex items-center px-4 gap-2 z-20 relative'>
            <div className='w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]'></div>
            <div className='w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]'></div>
            <div className='w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]'></div>
            {/* Minimalist URL Bar */}
            <div className="absolute left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black/50 rounded-md border border-white/5 flex items-center justify-center text-[10px] text-gray-500 font-mono">
              {project.link.replace("https://", "").replace(".git", "")}
            </div>
          </div>

          <div className='relative w-full h-[calc(100%-2.5rem)]'>
            <Image
              src={project.image}
              alt={`${project.title} interface`}
              fill
              sizes='(max-width: 1024px) 100vw, 1024px'
              className='object-cover object-top group-hover:object-bottom transition-all duration-[8s] ease-in-out'
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}