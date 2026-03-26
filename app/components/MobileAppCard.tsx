"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowRight, FaGithub } from "react-icons/fa";
import { Project } from "@/types";
import Link from "next/link";

interface MobileAppCardProps {
  project: Project;
  index: number;
}

export default function MobileAppCard({ project, index }: MobileAppCardProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}
    >
      {/* iPhone Frame */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="relative w-[280px] h-[600px] rounded-[3rem] border-[8px] border-zinc-900 bg-black shadow-2xl overflow-hidden ring-1 ring-zinc-800 group">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[25px] bg-black rounded-full z-30 flex items-center justify-end px-2">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 ring-1 ring-white/10 relative overflow-hidden">
              <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-blue-400/40 rounded-full blur-[1px]"></div>
            </div>
          </div>

          <Image 
            src={project.image} 
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 280px"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
          />
        </div>
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <div className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-4">{project.type}</div>
        <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">{project.title}</h3>
        <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
          {project.description}
        </p>
        
        <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
          {project.tech.map((tech, i) => (
            <span key={i} className="px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-medium text-gray-300">
              {tech}
            </span>
          ))}
        </div>

       <Link 
  href={`/projects/${project.slug}`} 
  className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-full font-bold transition-colors"
>
  View Details <FaArrowRight size={16} />
</Link>
      </div>
    </motion.div>
  );
}