"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import MagneticIcon from "./MagneticIcon";
import Background3D from "./Background3D";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center px-4 md:px-8 bg-[#030303] overflow-hidden">
      
      {/* 3D Particle Background */}
      <Background3D />
      
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen"
        ></motion.div>
      </div>

      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-5xl mx-auto z-10 w-full mt-12 flex flex-col items-center text-center">
        
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="inline-flex items-center gap-2 mb-10 px-5 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:border-white/20 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_12px_rgba(59,130,246,0.8)]"></span>
          <span className="text-sm font-medium text-gray-300 tracking-wide">SOFTWARE ENGINEER @ Pseudotek Solutions</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, type: "spring", bounce: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8 text-white leading-[1.1] pb-2"
        >
          Softjit Singh
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.3 }}
          className="text-lg md:text-2xl font-light text-gray-400 mb-14 max-w-2xl leading-relaxed h-16 sm:h-auto flex justify-center text-center"
        >
          <TypeAnimation
            sequence={[
              'Building high-performance web platforms with Next.js',
              2000,
              'Building cutting-edge mobile apps with React Native',
              2000,
              'Integrating advanced AI capabilities into products',
              2000,
              'Architecting scalable full-stack applications',
              2000
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="inline-block"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.3 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#projects" className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-black bg-white rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] active:scale-95">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-100 via-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative flex items-center gap-2">Explore Work <span className="group-hover:translate-x-1 transition-transform">→</span></span>
            </a>
            <a href="https://docs.google.com/document/d/e/2PACX-1vTvZEgr02yfoKIHADvMFrqMSNhiBVLBjWPBzeKhMs8RdqmAbX7Cq47SUjlvQZ525fNBEL2s4BXThuTC/pub" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white bg-zinc-900 border border-white/10 rounded-full hover:bg-zinc-800 hover:border-white/30 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.03)] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              Resume <span className="text-gray-400 ml-1">↗</span>
            </a>
            <a href="mailto:softjitsingh@gmail.com" className="group inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white bg-zinc-900 border border-white/10 rounded-full hover:bg-zinc-800 hover:border-white/30 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.03)] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              Contact Me
            </a>
          </div>

          {/* Magnetic Social Links */}
          <div className="flex items-center gap-4 mt-2">
            <MagneticIcon href="https://github.com/SOFTJIT-SINGH">
              <FaGithub size={20} />
            </MagneticIcon>
            <MagneticIcon href="https://linkedin.com/in/softjit-singh">
              <FaLinkedin size={20} />
            </MagneticIcon>
            <MagneticIcon href="https://x.com/softjit_singh">
              <FaTwitter size={20} />
            </MagneticIcon>
            <MagneticIcon href="mailto:softjitsingh@gmail.com">
              <FaEnvelope size={20} />
            </MagneticIcon>
          </div>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Scroll</span>
        <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}