"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import MoreWork from "./home/MoreWork";
import { canonical } from "./home/StackIndex";
import { allProjects } from "@/lib/featured";

export type ArchiveFilter = "all" | "web" | "mobile";

const FILTERS: { id: ArchiveFilter; label: string; href: string }[] = [
  { id: "all", label: "All", href: "/portfolio" },
  { id: "web", label: "Web", href: "/web-work" },
  { id: "mobile", label: "Mobile", href: "/mobile-work" },
];

export default function ProjectArchive({ initial = "all" }: { initial?: ArchiveFilter }) {
  const [kind, setKind] = useState<ArchiveFilter>(initial);
  const [tech, setTech] = useState<string | null>(null);

  const byKind = allProjects.filter((p) =>
    kind === "all" ? true : kind === "mobile" ? p.type.includes("Mobile") : !p.type.includes("Mobile")
  );

  // Offer only the tools that appear at least twice in the current view.
  const techs = useMemo(() => {
    const counts = new Map<string, number>();
    byKind.forEach((p) => new Set(p.techStack.map(canonical)).forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
    return [...counts.entries()].filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1]).map(([t]) => t);
  }, [byKind]);

  const shown = byKind
    .filter((p) => !tech || p.techStack.map(canonical).includes(tech))
    .map((p) => ({ ...p, line: p.description }));

  return (
    <div>
      <div className="flex flex-col gap-5 mb-12">
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Project type">
          {FILTERS.map((f) => (
            <Link
              key={f.id}
              href={f.href}
              scroll={false}
              role="tab"
              aria-selected={kind === f.id}
              onClick={(e) => {
                e.preventDefault();
                setKind(f.id);
                setTech(null);
                window.history.replaceState(null, "", f.href);
              }}
              className={`rounded-md px-4 py-2 text-sm transition-colors ${
                kind === f.id ? "bg-cream text-night" : "border border-line text-mist hover:text-cream"
              }`}
            >
              {f.label}
            </Link>
          ))}
          <span className="ml-2 font-mono text-[11px] text-mist">{shown.length} projects</span>
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Filter by technology">
          {techs.map((t) => (
            <button
              key={t}
              onClick={() => setTech(tech === t ? null : t)}
              aria-pressed={tech === t}
              className={`rounded border px-2 py-1 font-mono text-[11px] transition-colors ${
                tech === t ? "border-mint bg-mint/10 text-mint" : "border-line text-mist hover:text-cream"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <MoreWork projects={shown} />
    </div>
  );
}
