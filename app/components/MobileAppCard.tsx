"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
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
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24 relative`}
    >
      {/* iPhone Frame with Ambient Glow */}
      <div className="w-full lg:w-1/2 flex justify-center relative">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative w-[280px] h-[600px] rounded-[3rem] border-[8px] border-zinc-900 bg-black shadow-2xl overflow-hidden ring-1 ring-white/10 group z-10 transition-transform duration-500 hover:scale-[1.02]">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[25px] bg-black rounded-full z-30 flex items-center justify-end px-2 shadow-[0_1px_2px_rgba(255,255,255,0.1)_inset]">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 ring-1 ring-white/20 relative overflow-hidden">
              <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-blue-400/50 rounded-full blur-[1px]"></div>
            </div>
          </div>

          <Image 
            src={project.image} 
            alt={`${project.title} interface`}
            fill
            sizes="(max-width: 768px) 100vw, 280px"
            className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          />
        </div>
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2 text-center lg:text-left z-10">
        <div className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-3 drop-shadow-md">{project.type}</div>
        <h3 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">{project.title}</h3>
        <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
          {project.description}
        </p>
        
        {/* Glassmorphism Tech Stack */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10">
          {project.tech.map((tech, i) => (
            <span key={i} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 backdrop-blur-md shadow-sm">
              {tech}
            </span>
          ))}
        </div>

        <Link 
          href={`/projects/${project.slug}`} 
          className="group inline-flex items-center gap-3 px-8 py-3.5 bg-white text-black hover:bg-gray-200 rounded-full font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          View Details <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}