import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] bg-night text-cream flex items-center">
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-24 w-full">
        <p className="font-mono text-xs text-mint mb-6">404 · not found</p>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight leading-[1.02] max-w-3xl mb-6">
          This star isn&apos;t on the map.
        </h1>
        <p className="text-lg text-mist max-w-xl leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist, or it shipped under a different name.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/" className="rounded-md bg-mint px-5 py-3 font-medium text-night hover:bg-cream transition-colors">
            ← Back home
          </Link>
          <Link href="/portfolio" className="rounded-md border border-line px-5 py-3 hover:border-mist/50 transition-colors">
            See all projects
          </Link>
        </div>
      </div>
    </main>
  );
}
