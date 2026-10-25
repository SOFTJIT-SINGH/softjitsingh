"use client";

import { useEffect } from "react";
import Link from "next/link";

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
    <main className="min-h-[80vh] bg-night text-cream flex items-center">
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-24 w-full">
        <p className="font-mono text-xs text-red-300 mb-6">500 · something broke</p>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight leading-[1.02] max-w-3xl mb-6">
          Well, that wasn&apos;t supposed to happen.
        </h1>
        <p className="text-lg text-mist max-w-xl leading-relaxed mb-6">
          Something went wrong loading this page. Try again, or head back home.
        </p>
        {error.digest && <p className="font-mono text-[11px] text-mist/70 mb-10">digest: {error.digest}</p>}
        <div className="flex flex-wrap gap-3 text-sm">
          <button onClick={reset} className="rounded-md bg-mint px-5 py-3 font-medium text-night hover:bg-cream transition-colors">
            Try again
          </button>
          <Link href="/" className="rounded-md border border-line px-5 py-3 hover:border-mist/50 transition-colors">
            ← Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
