"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaBars, FaTimes, FaCalendarAlt, FaDownload } from "react-icons/fa";
import { SITE, NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mql.matches);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={reduceMotion ? false : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-bold tracking-tight text-white hover:text-gray-300 transition-colors flex-shrink-0"
          >
            {SITE.name.toUpperCase()}
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={SITE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white border border-white/20 hover:border-white/40 px-4 py-1.5 rounded-full transition-all hover:bg-white/5"
            >
              1-Page Resume ↗
            </a>
            <a
              href={SITE.resumePdfUrl}
              download={SITE.resumeFilename}
              aria-label="Download resume PDF"
              className="text-gray-400 hover:text-white transition-colors min-h-11 min-w-11 flex items-center justify-center"
              title="Download resume PDF"
            >
              <FaDownload size={15} />
            </a>
            <Link
              href="/contact"
              className="text-sm font-bold text-black bg-white hover:bg-gray-200 px-4 py-1.5 rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
            >
              <FaCalendarAlt size={11} /> Hire Me
            </Link>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <a
                href={SITE.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaGithub size={16} />
              </a>
              <a
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedin size={16} />
              </a>
            </div>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-400 hover:text-white transition-colors min-h-11 min-w-11 flex items-center justify-center"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 md:hidden max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <nav className="flex flex-col p-6 gap-5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg text-gray-300 hover:text-white transition-colors min-h-11 flex items-center"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={SITE.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="text-lg text-white font-medium transition-colors min-h-11 flex items-center"
              >
                View 1-Page Resume ↗
              </a>
              <a
                href={SITE.resumePdfUrl}
                download={SITE.resumeFilename}
                onClick={() => setMobileOpen(false)}
                className="text-base text-blue-400 hover:text-blue-300 transition-colors min-h-11 flex items-center gap-2"
              >
                <FaDownload size={12} /> Download Resume PDF
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black text-base font-bold rounded-full hover:bg-gray-200 transition-all"
              >
                <FaCalendarAlt size={12} /> Hire Me
              </Link>
              <div className="flex gap-4 pt-4 border-t border-white/10">
                <a
                  href={SITE.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-gray-400 hover:text-white transition-colors min-h-11 min-w-11 flex items-center justify-center"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href={SITE.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-gray-400 hover:text-white transition-colors min-h-11 min-w-11 flex items-center justify-center"
                >
                  <FaLinkedin size={20} />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
