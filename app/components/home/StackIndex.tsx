import type { Project } from "@/types";

// Fold versions and near-duplicates so "Next.js 16" and "Next.js" count as one.
const ALIASES: Record<string, string> = {
  "google gemini ai": "Gemini",
  "google generative ai": "Gemini",
  "mongodb atlas": "MongoDB",
  "tailwind css v4": "Tailwind CSS",
  "livekit webrtc": "LiveKit",
};

function canonical(tech: string) {
  const alias = ALIASES[tech.toLowerCase()];
  if (alias) return alias;
  return tech.replace(/\s+v?\d+(\.\d+)*$/, "").trim();
}

export default function StackIndex({ projects, limit = 14 }: { projects: Project[]; limit?: number }) {
  const uses = new Map<string, string[]>();
  for (const p of projects) {
    for (const t of new Set(p.techStack.map(canonical))) {
      uses.set(t, [...(uses.get(t) ?? []), p.title]);
    }
  }
  const rows = [...uses.entries()].sort((a, b) => b[1].length - a[1].length).slice(0, limit);
  const max = rows[0]?.[1].length ?? 1;

  return (
    <ul className="grid md:grid-cols-2 gap-x-12">
      {rows.map(([tech, titles]) => (
        <li key={tech} className="border-t border-line py-3.5 grid grid-cols-[8.5rem_1fr_auto] items-center gap-4">
          <span className="font-mono text-[13px] text-cream">{tech}</span>
          <span className="h-1 rounded-full bg-line overflow-hidden" title={titles.join(", ")}>
            <span className="block h-full rounded-full bg-mint/70" style={{ width: `${(titles.length / max) * 100}%` }} />
          </span>
          <span className="font-mono text-[11px] text-mist tabular-nums w-14 text-right">
            {titles.length} {titles.length === 1 ? "app" : "apps"}
          </span>
        </li>
      ))}
    </ul>
  );
}
