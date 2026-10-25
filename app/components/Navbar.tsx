"use client";

import Link from "next/link";
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
              className={`transition-colors ${isActive(link.href) ? "text-cream" : "text-mist hover:text-cream"}`}
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
          className="md:hidden font-mono text-xs text-mist min-h-11 px-1"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? "[ close ]" : "[ menu ]"}
        </button>
      </div>

      {open && (
        <nav className="md:hidden mx-5 mb-3 rounded-lg border border-line bg-night-2/95 backdrop-blur px-5 py-3 flex flex-col">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-serif text-2xl py-2.5 border-b border-line last:border-0"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={SITE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-mint pt-3 pb-1"
          >
            resume ↗
          </a>
        </nav>
      )}
    </header>
  );
}
