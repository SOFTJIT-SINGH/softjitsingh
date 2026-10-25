import type { Project } from "@/types";

export type Metric = { value: string; label: string };

const PATTERNS: { regex: RegExp; make: (m: RegExpMatchArray) => Metric }[] = [
  { regex: /(\d+)\+?\s*concurrent users/i, make: (m) => ({ value: `${m[1]}+`, label: "concurrent users" }) },
  { regex: /<(\d+)ms\s*(p\d+)?\s*media latency/i, make: (m) => ({ value: `<${m[1]}ms`, label: `${m[2] ?? ""} media latency`.trim() }) },
  { regex: /p95.*?by (\d+)%/i, make: (m) => ({ value: `−${m[1]}%`, label: "p95 query time" }) },
  { regex: /by (\d+)% \((\d+)ms to (\d+)ms\)/i, make: (m) => ({ value: `${m[2]}→${m[3]}ms`, label: "avg response time" }) },
  { regex: /(\d+)\+?\s*API\s*domains/i, make: (m) => ({ value: `${m[1]}+`, label: "API domains" }) },
  { regex: /(\d+)\+?\s*API\s*routes/i, make: (m) => ({ value: `${m[1]}+`, label: "secured API routes" }) },
  { regex: /(\d+)%\+?\s*unit test coverage/i, make: (m) => ({ value: `${m[1]}%+`, label: "unit test coverage" }) },
  { regex: /sub-?100ms/i, make: () => ({ value: "<100ms", label: "state sync" }) },
  { regex: /under (\d+) second/i, make: (m) => ({ value: `<${m[1]}s`, label: "SOS broadcast" }) },
  { regex: /(\d+) ML modules/i, make: (m) => ({ value: `${m[1]}`, label: "ML models in production" }) },
  { regex: /(\d+)-session teaching/i, make: (m) => ({ value: `${m[1]}`, label: "teaching sessions" }) },
  { regex: /(\d+)-course catalog/i, make: (m) => ({ value: `${m[1]}`, label: "courses listed" }) },
];

export function extractMetric(text: string): Metric | null {
  for (const p of PATTERNS) {
    const m = text.match(p.regex);
    if (m) return p.make(m);
  }
  return null;
}

/** Distinct metrics found in a project's description and bullet points, most important first. */
export function projectMetrics(project: Project, limit = 4): Metric[] {
  const seen = new Set<string>();
  const out: Metric[] = [];
  for (const text of [...project.bulletPoints, project.description]) {
    const m = extractMetric(text);
    if (m && !seen.has(m.label)) {
      seen.add(m.label);
      out.push(m);
    }
  }
  return out.slice(0, limit);
}
