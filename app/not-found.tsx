"use client";

import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050505] text-gray-200 flex items-center justify-center px-4">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-blue-400 font-mono tracking-[0.2em] text-xs uppercase mb-6">Error 404</p>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6">
          Lost in the void
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist — or it shipped under a different name. Either way, here are some places worth going.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all hover:scale-105 active:scale-95"
          >
            <FaArrowLeft size={12} /> Back to Home
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-900 text-white text-sm font-bold rounded-full border border-white/10 hover:bg-zinc-800 hover:border-white/30 transition-all hover:scale-105 active:scale-95"
          >
            See all 18 projects <FaArrowRight size={12} />
          </Link>
        </div>
      </div>
    </main>
  );
}
