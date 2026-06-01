"use client";
import { FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import MagneticIcon from "./MagneticIcon";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#050505] py-32 border-t border-white/5 flex flex-col items-center justify-center">
      
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-[800px] h-[400px] bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 blur-[150px] opacity-20 mix-blend-screen rounded-full"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 w-full relative z-10 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center w-full"
        >
          <p className="text-blue-400 font-mono tracking-[0.2em] text-sm uppercase mb-6">Have an idea?</p>
          <h2 className="text-[12vw] leading-none font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-12 hover:scale-105 transition-transform duration-500 cursor-default">
            LET&apos;S TALK
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl border-t border-white/10 pt-12 mt-12 gap-8"
        >
          <div className="flex gap-6">
            <MagneticIcon href="mailto:softjitsingh@gmail.com">
              <FaEnvelope size={24} />
            </MagneticIcon>
            <MagneticIcon href="https://linkedin.com/in/softjit-singh">
              <FaLinkedin size={24} />
            </MagneticIcon>
            <MagneticIcon href="https://github.com/SOFTJIT-SINGH">
              <FaGithub size={24} />
            </MagneticIcon>
          </div>
          
          <p className="text-gray-500 text-sm font-mono tracking-widest uppercase">
            © {new Date().getFullYear()} Softjit Singh
          </p>
        </motion.div>
      </div>
    </footer>
  );
}