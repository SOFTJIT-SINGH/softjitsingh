"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft, FaRedo } from "react-icons/fa";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[portfolio] Unhandled error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#050505] text-gray-200 flex items-center justify-center px-4">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-red-400 font-mono tracking-[0.2em] text-xs uppercase mb-6">Error 500</p>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6">
          Something broke
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-md mx-auto">
          An unexpected error occurred. The team has been notified. Try again, or head back home.
        </p>
        {error.digest && (
          <p className="text-xs text-gray-600 font-mono mb-8">digest: {error.digest}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all hover:scale-105 active:scale-95"
          >
            <FaRedo size={12} /> Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-900 text-white text-sm font-bold rounded-full border border-white/10 hover:bg-zinc-800 hover:border-white/30 transition-all hover:scale-105 active:scale-95"
          >
            <FaArrowLeft size={12} /> Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
