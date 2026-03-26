'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa'
import { Project } from '@/types'
import Link from 'next/link'

export default function WebAppCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
      className='flex flex-col items-center'
    >
      <div className='text-center max-w-3xl mb-12'>
        <div className='text-cyan-400 font-bold tracking-widest text-sm uppercase mb-4'>
          {project.type}
        </div>
        <h3 className='text-4xl md:text-5xl font-bold mb-6 text-white'>
          {project.title}
        </h3>
        <p className='text-lg text-gray-400 leading-relaxed mb-8'>
          {project.description}
        </p>
        <div className='flex flex-wrap justify-center gap-3 mb-8'>
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className='px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-medium text-gray-300'
            >
              {tech}
            </span>
          ))}
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className='inline-flex items-center gap-3 px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-full font-bold transition-colors'
        >
          View Details <FaArrowRight size={16} />
        </Link>
      </div>

      <div className='w-full max-w-5xl aspect-[16/10] md:aspect-[16/9] rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden relative group'>
        <div className='w-full h-10 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-2 z-20 relative'>
          <div className='w-3 h-3 rounded-full bg-red-500/80'></div>
          <div className='w-3 h-3 rounded-full bg-yellow-500/80'></div>
          <div className='w-3 h-3 rounded-full bg-green-500/80'></div>
        </div>

        <div className='relative w-full h-[calc(100%-2.5rem)]'>
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes='(max-width: 1024px) 100vw, 1024px'
            className='object-cover object-top group-hover:object-bottom transition-all duration-[5s] ease-in-out'
          />
        </div>
      </div>
    </motion.div>
  )
}
