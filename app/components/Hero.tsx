"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center px-4 overflow-hidden bg-black">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/30 via-blue-900/5 to-transparent blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto z-10 text-center mt-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-gray-300 shadow-2xl"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
          SDE 1 @ Pseudotek Solutions
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-6 text-white"
        >
          Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500">Softjit Singh</span>
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-3xl font-light text-gray-400 mb-10 max-w-3xl mx-auto"
        >
          AI-Powered Full-Stack & Mobile Engineer
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-5"
        >
          <a href="#mobile-apps" className="px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform duration-300">
            View Mobile Apps
          </a>
          <a href="#web-apps" className="px-8 py-4 rounded-full bg-zinc-900 border border-zinc-700 font-bold text-white hover:bg-zinc-800 transition-colors duration-300">
            View Web Apps
          </a>
        </motion.div>
      </div>
    </section>
  );
}