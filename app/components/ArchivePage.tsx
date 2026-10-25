import ProjectArchive, { type ArchiveFilter } from "./ProjectArchive";

export default function ArchivePage({ initial, title, intro }: { initial: ArchiveFilter; title: string; intro: string }) {
  return (
    <main className="min-h-screen bg-night text-cream">
      <div className="max-w-6xl mx-auto px-5 md:px-10 pt-16 md:pt-24 pb-24">
        <p className="font-mono text-xs text-mint mb-6">projects · the full archive</p>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight leading-[1.02] mb-6 max-w-4xl">{title}</h1>
        <p className="text-lg text-mist max-w-2xl leading-relaxed mb-14">{intro}</p>
        <ProjectArchive initial={initial} />
      </div>
    </main>
  );
}
