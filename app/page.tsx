"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaEnvelope, FaLinkedin, FaArrowRight } from "react-icons/fa";
import { projects } from "@/lib/data";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-blue-500 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm text-sm text-gray-300"
          >
            Available for Software Engineering Roles
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-6"
          >
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500">Softjit Singh</span>
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-3xl font-light text-gray-400 mb-8"
          >
            AI-Powered Full-Stack & Mobile Engineer
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <a href="#featured-apps" className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform shadow-lg shadow-white/10">
              Explore Mobile Apps
            </a>
            <a href="https://github.com/SOFTJIT-SINGH" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full bg-gray-900 border border-gray-800 font-semibold flex items-center gap-2 hover:bg-gray-800 transition-colors">
              <FaGithub /> GitHub
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. MOBILE APPS SHOWCASE */}
      <section id="featured-apps" className="py-24 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-24 text-center tracking-tight">Mobile Application Portfolio</h2>
        
        {/* Adjusted spacing from space-y-32 to space-y-24 for better fit */}
        <div className="space-y-24">
          {projects.map((app, idx) => (
            <motion.div 
              key={app.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-16 lg:gap-24`}
            >
              {/* IMAGE SIDE: The CSS Mobile Device Frame */}
              <div className="w-full md:w-1/2 flex justify-center">
                {/* 9:16 Aspect Ratio Container simulating a phone */}
                <div className="relative w-[260px] sm:w-[300px] aspect-[9/16] rounded-[2.5rem] border-[12px] border-gray-800 bg-gray-900 shadow-2xl shadow-blue-900/20 overflow-hidden flex items-center justify-center group">
                  
                  {/* CSS Notch / Dynamic Island */}
                  <div className="absolute top-0 inset-x-0 h-6 bg-gray-800 rounded-b-3xl w-[40%] mx-auto z-20"></div>
                  
                  {/* Your Image will go here. For now, it's a placeholder. */}
                  {/* Uncomment the Image tag when you add your actual vertical screenshots */}
                  <span className="text-gray-500 text-sm z-10 px-4 text-center">Mobile Screenshot<br/>(9:16 Ratio)</span>
                  {/* <img src={app.image} alt={app.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /> */}
                  
                </div>
              </div>

              {/* INFO SIDE */}
              <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
                <div className="text-blue-500 font-semibold tracking-wider text-sm uppercase">{app.type}</div>
                <h3 className="text-4xl md:text-5xl font-bold">{app.title}</h3>
                <p className="text-lg text-gray-400 leading-relaxed">
                  {app.shortDescription}
                </p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-4">
                  {app.tech.map((t, i) => (
                    <span key={i} className="px-4 py-2 rounded-full bg-gray-900 border border-gray-800 text-sm font-medium text-gray-300">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-8">
                  <Link 
                    href={`/projects/${app.slug}`}
                    className="group inline-flex items-center gap-3 px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-full font-semibold transition-all"
                  >
                    View Project Details
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. CONTACT FOOTER */}
      <footer className="py-16 px-4 border-t border-gray-800 mt-20 text-center">
        <h2 className="text-2xl font-bold mb-6">Let&apos;s Build Something Great</h2>
        <div className="flex justify-center gap-6 mb-8">
          <a href="mailto:soft@gmail.com" className="text-gray-400 hover:text-white transition-colors"><FaEnvelope size={24} /></a>
          <a href="https://linkedin.com/in/softjit-singh" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><FaLinkedin size={24} /></a>
          <a href="https://github.com/SOFTJIT-SINGH" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><FaGithub size={24} /></a>
        </div>
        <p className="text-gray-600 text-sm">© 2026 Softjit Singh. All rights reserved.</p>
      </footer>
    </div>
  );
}