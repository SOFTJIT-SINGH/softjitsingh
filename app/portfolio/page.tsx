"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { mobileProjects, webProjects } from "@/lib/data";

export default function PortfolioPage() {
  const allProjects = [...mobileProjects, ...webProjects];

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-12 group text-sm font-medium">
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-3 group-hover:bg-white/10 transition-colors">
              <FaArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" /> 
            </div>
            Back to Home
          </Link>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-4">All Projects</h1>
          <p className="text-xl text-gray-400">A complete archive of my web and mobile applications.</p>
        </div>

        {/* Clean, Sleek Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map((project, idx) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link href={`/projects/${project.slug}`} className="block h-full group">
                <div className="h-full flex flex-col bg-zinc-900/50 border border-white/10 rounded-3xl overflow-hidden hover:bg-zinc-800/50 transition-colors duration-300">
                  
                  {/* Thumbnail */}
                  <div className="relative w-full h-56 bg-black overflow-hidden border-b border-white/5">
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill 
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="text-cyan-400 font-bold tracking-widest text-[10px] uppercase mb-2">{project.type}</div>
                    <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                    <p className="text-sm text-gray-400 mb-6 flex-grow line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center text-white font-semibold text-sm">
                      View Case Study <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={12} />
                    </div>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}