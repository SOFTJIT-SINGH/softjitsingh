"use client";
import { FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MagneticIcon from "./MagneticIcon";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export default function Footer() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mql.matches);
  }, []);

  return (
    <footer className="relative w-full overflow-hidden bg-[#050505] py-24 border-t border-white/5 flex flex-col items-center justify-center">
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center" aria-hidden="true">
        <motion.div
          animate={reduceMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-[800px] h-[400px] bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 blur-[150px] opacity-20 mix-blend-screen rounded-full"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 w-full relative z-10 flex flex-col items-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center w-full"
        >
          <p className="text-blue-400 font-mono tracking-[0.2em] text-sm uppercase mb-6">Have a project?</p>
          <Link
            href="/contact"
            className="block text-5xl md:text-6xl lg:text-7xl leading-none font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-12 hover:scale-105 transition-transform duration-500"
          >
            LET&apos;S TALK
          </Link>
          <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto mb-12">
            Reply within {SITE.metrics.responseTime}. Currently accepting 2 freelance projects for Q3 2026.
          </p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl border-t border-white/10 pt-10 gap-6"
        >
          <div className="flex gap-4">
            <MagneticIcon href={`mailto:${SITE.email}`} label="Email">
              <FaEnvelope size={20} />
            </MagneticIcon>
            <MagneticIcon href={SITE.social.linkedin} label="LinkedIn">
              <FaLinkedin size={20} />
            </MagneticIcon>
            <MagneticIcon href={SITE.social.github} label="GitHub">
              <FaGithub size={20} />
            </MagneticIcon>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-500 text-xs font-mono tracking-widest uppercase">
              © {new Date().getFullYear()} {SITE.name} · {SITE.location}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
