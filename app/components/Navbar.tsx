"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE, NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const home = pathname === "/";

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => {
    const path = href.split("#")[0];
    return path !== "/" && pathname.startsWith(path);
  };

  return (
    <header
      className={`${
        home ? "absolute" : "sticky top-0 bg-night/85 backdrop-blur-md border-b border-line"
      } inset-x-0 z-50 text-cream`}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-lg tracking-tight hover:text-mint transition-colors">
          {SITE.name}
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {NAV_LINKS.filter((l) => l.href !== "/contact").map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`nav-link transition-colors ${isActive(link.href) ? "text-cream is-active" : "text-mist hover:text-cream"}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-md bg-mint px-3.5 py-1.5 font-medium text-night hover:bg-cream transition-colors"
          >
            Contact
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden relative h-11 w-11 -mr-2 rounded-full transition-colors hover:bg-gold/10"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {/* Three lines that fold into a cross. */}
          <span
            className={`absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 bg-cream transition-transform duration-300 ${
              open ? "rotate-45" : "-translate-y-[6px]"
            }`}
          />
          <span
            className={`absolute left-1/2 top-1/2 h-px w-3.5 -translate-x-[3px] bg-gold transition-all duration-300 ${
              open ? "scale-x-0 opacity-0" : ""
            }`}
          />
          <span
            className={`absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 bg-cream transition-transform duration-300 ${
              open ? "-rotate-45" : "translate-y-[6px]"
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="md:hidden mx-5 mb-3 rounded-lg border border-gold/25 bg-night-2/95 backdrop-blur px-5 py-3 flex flex-col shadow-[0_20px_60px_-20px_rgba(216,180,106,0.35)]"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.045, duration: 0.25 }}
                className="border-b border-line last:border-0"
              >
                <Link href={link.href} className="flex items-center justify-between font-serif text-2xl py-2.5">
                  {link.label}
                  <span className="text-xs text-gold/70" aria-hidden="true">✦</span>
                </Link>
              </motion.div>
            ))}
            <a
              href={SITE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-mint pt-3 pb-1"
            >
              resume ↗
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
