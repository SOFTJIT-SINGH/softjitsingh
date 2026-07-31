"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin, FaEnvelope, FaCalendarAlt, FaDownload } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import MagneticIcon from "./MagneticIcon";
import Background3D from "./Background3D";
import { SITE } from "@/lib/constants";

const ROTATING_LINES = [
  "Shipped HealChakra to 500+ concurrent users in 90 days",
  2500,
  "Fixed a payment double-charge race condition in 2 weeks of launch",
  2500,
  "Cut BhojPOS API response time 44% via Redis caching",
  2500,
  "CityGuard SOS broadcasts live GPS in under 1 second",
  2500,
];

export default function Hero() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mql.matches);
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center px-4 md:px-8 bg-[#030303] overflow-hidden pt-16">
      {!isMobile && !reduceMotion && <Background3D />}

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 90, 0] }
          }
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen"
        ></motion.div>
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : { scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2], rotate: [0, -90, 0] }
          }
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen"
        ></motion.div>
      </div>

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />

      <div className="max-w-5xl mx-auto z-10 w-full mt-12 flex flex-col items-center text-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 mb-10 px-5 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-white/20 transition-colors"
        >
          <span className="relative flex w-2 h-2" aria-hidden="true">
            <span className="absolute inline-flex w-full h-full rounded-full bg-blue-500 opacity-75 animate-ping"></span>
            <span className="relative inline-flex w-2 h-2 rounded-full bg-blue-500"></span>
          </span>
          <span className="text-sm font-medium text-gray-300 tracking-wide">
            SOFTWARE ENGINEER @ {SITE.employer.shortName}
          </span>
        </motion.div>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6 text-white leading-[1.05]"
        >
          {SITE.name}
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="text-lg md:text-xl text-gray-400 font-light mb-3 max-w-2xl leading-relaxed"
        >
          Full-Stack Engineer · Next.js, React Native, Real-Time Systems
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="text-base md:text-lg font-light text-gray-500 mb-10 max-w-2xl leading-relaxed flex justify-center text-center min-h-[2.5rem]"
        >
          {reduceMotion ? (
            <span>Production real-time platforms · 500+ concurrent users · &lt;150ms media latency</span>
          ) : (
            <TypeAnimation
              sequence={ROTATING_LINES}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="inline-block"
            />
          )}
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-black bg-white rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              <span className="flex items-center gap-2">
                See What I Ship <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </a>
            <a
              href={SITE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white bg-zinc-900 border border-white/10 rounded-full hover:bg-zinc-800 hover:border-white/30 transition-all hover:scale-105 active:scale-95"
            >
              View 1-Page Resume <span className="text-gray-400 ml-1">↗</span>
            </a>
            <a
              href={SITE.resumePdfUrl}
              download={SITE.resumeFilename}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white bg-zinc-900 border border-white/10 rounded-full hover:bg-zinc-800 hover:border-white/30 transition-all hover:scale-105 active:scale-95"
              title="Download as PDF"
            >
              <FaDownload size={12} /> Download PDF
            </a>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white bg-zinc-900 border border-white/10 rounded-full hover:bg-zinc-800 hover:border-white/30 transition-all hover:scale-105 active:scale-95"
            >
              <FaCalendarAlt size={12} /> Book a 15-min Call
            </Link>
          </div>

          <div className="flex items-center gap-3 mt-2 mb-8">
            <MagneticIcon href={SITE.social.github} label="GitHub">
              <FaGithub size={18} />
            </MagneticIcon>
            <MagneticIcon href={SITE.social.linkedin} label="LinkedIn">
              <FaLinkedin size={18} />
            </MagneticIcon>
            <MagneticIcon href={`mailto:${SITE.email}`} label="Email">
              <FaEnvelope size={18} />
            </MagneticIcon>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Scroll</span>
        <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center p-1">
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
