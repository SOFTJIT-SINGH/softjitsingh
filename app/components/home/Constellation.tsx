"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export type Star = {
  slug: string;
  title: string;
  type: string;
  tech: string[];
  featured: boolean;
};

type Node = Star & { bx: number; by: number; phase: number; mobile: boolean };
type Packet = { edge: number; t: number; speed: number };

const MINT = "124, 242, 201";
const AMBER = "244, 184, 96";
const GOLD = "216, 180, 106";

function mulberry(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// "Next.js 16" and "Next.js" are the same technology for linking purposes.
const normTech = (t: string) => t.toLowerCase().replace(/\s*v?\d+(\.\d+)*$/, "").trim();

type Box = { x0: number; y0: number; x1: number; y1: number };

function layout(stars: Star[], narrow: boolean, keepClear: Box | null): Node[] {
  const rand = mulberry(narrow ? 11 : 7);
  const area = narrow
    ? { x0: 0.08, x1: 0.92, y0: 0.07, y1: 0.3 }
    : { x0: 0.05, x1: 0.95, y0: 0.1, y1: 0.88 };
  // Keep the bottom-left block clear for the headline.
  const inTextBlock = (x: number, y: number) =>
    !!keepClear && x > keepClear.x0 && x < keepClear.x1 && y > keepClear.y0 && y < keepClear.y1;
  const minDist = narrow ? 0.13 : 0.085;
  const placed: Node[] = [];
  for (const s of stars) {
    let x = 0;
    let y = 0;
    for (let tries = 0; tries < 80; tries++) {
      x = area.x0 + rand() * (area.x1 - area.x0);
      y = area.y0 + rand() * (area.y1 - area.y0);
      if (inTextBlock(x, y)) continue;
      if (placed.every((p) => Math.hypot(p.bx - x, (p.by - y) * 0.7) > minDist)) break;
    }
    placed.push({ ...s, bx: x, by: y, phase: rand() * Math.PI * 2, mobile: s.type.includes("Mobile") });
  }
  return placed;
}

function linkEdges(nodes: Node[]): [number, number][] {
  const sets = nodes.map((n) => new Set(n.tech.map(normTech)));
  const counts = new Map<string, number>();
  sets.forEach((s) => s.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
  const keys = new Set<string>();
  const edges: [number, number][] = [];
  nodes.forEach((_, i) => {
    const scored = nodes
      .map((__, j) => {
        if (i === j) return { j, score: 0 };
        let score = 0;
        sets[i].forEach((t) => {
          // Very common tech (Next.js, Supabase) would link everything to everything.
          const c = counts.get(t) ?? 0;
          if (sets[j].has(t) && c <= 7) score += 1 / c;
        });
        return { j, score };
      })
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 2);
    for (const { j } of scored) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!keys.has(key)) {
        keys.add(key);
        edges.push([i, j]);
      }
    }
  });
  return edges;
}

export default function Constellation({ stars }: { stars: Star[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bodyStyle = getComputedStyle(document.body);
    const mono = bodyStyle.getPropertyValue("--font-geist-mono") || "monospace";

    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let edges: [number, number][] = [];
    let narrow = false;
    let layoutKey = "";
    const dust = Array.from({ length: 170 }, (_, i) => {
      const r = mulberry(i + 101);
      return { x: r(), y: r(), r: r() * 1.3 + 0.3, a: r() * 0.5 + 0.15, s: r() * 1.5 + 0.4, p: r() * 6.28 };
    });
    const packets: Packet[] = [];
    let hovered = -1;
    let pointer = { x: -999, y: -999 };
    let touch = false;
    let running = true;
    let raf = 0;
    let lastSpawn = 0;
    let lastTime = 0;
    let hoverSince = 0;
    let meteor: { x: number; y: number; vx: number; vy: number; born: number } | null = null;
    let nextMeteor = 3000 + Math.random() * 4000;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      narrow = w < 768;
      // Keep stars out from behind the hero text, measured from the real layout at this width.
      let keepClear: Box | null = null;
      const text = canvas.parentElement?.querySelector<HTMLElement>("[data-hero-text]");
      if (text && !narrow) {
        const boxes = [...text.children].map((c) => c.getBoundingClientRect());
        const pad = 24;
        keepClear = {
          x0: (Math.min(...boxes.map((b) => b.left)) - rect.left - pad) / w,
          x1: (Math.max(...boxes.map((b) => b.right)) - rect.left + pad) / w,
          y0: (Math.min(...boxes.map((b) => b.top)) - rect.top - pad) / h,
          y1: (Math.max(...boxes.map((b) => b.bottom)) - rect.top + pad) / h,
        };
      }
      const signature = `${Math.round(w / 40)}:${narrow}`;
      if (signature !== layoutKey) {
        layoutKey = signature;
        nodes = layout(stars, narrow, keepClear);
        edges = linkEdges(nodes);
        packets.length = 0;
      }
      if (reduceMotion) draw(0);
    };

    const pos = (n: Node, time: number) => {
      const drift = reduceMotion ? 0 : 5;
      return {
        x: n.bx * w + Math.sin(time * 0.00025 + n.phase) * drift,
        y: n.by * h + Math.cos(time * 0.0002 + n.phase) * drift,
      };
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);

      for (const d of dust) {
        const tw = reduceMotion ? 1 : 0.55 + 0.45 * Math.sin(time * 0.001 * d.s + d.p);
        ctx.fillStyle = `rgba(242, 237, 228, ${d.a * tw})`;
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      const pts = nodes.map((n) => pos(n, time));

      // Nearest star to the pointer wins the hover.
      let best = -1;
      let bestD = narrow ? 34 : 44;
      pts.forEach((p, i) => {
        const d = Math.hypot(p.x - pointer.x, p.y - pointer.y);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      if (best !== hovered) hoverSince = time;
      hovered = best;
      canvas.style.cursor = hovered >= 0 ? "pointer" : "default";

      edges.forEach(([a, b]) => {
        ctx.strokeStyle = "rgba(149, 161, 184, 0.13)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pts[a].x, pts[a].y);
        ctx.lineTo(pts[b].x, pts[b].y);
        ctx.stroke();
      });

      // A hovered star's constellation is traced outwards in gold, like a line inked onto a chart.
      if (hovered >= 0) {
        const t = reduceMotion ? 1 : Math.min((time - hoverSince) / 520, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        ctx.save();
        ctx.strokeStyle = `rgba(${GOLD}, 0.9)`;
        ctx.lineWidth = 1.4;
        ctx.shadowColor = `rgba(${GOLD}, 0.8)`;
        ctx.shadowBlur = 8;
        edges.forEach(([a, b]) => {
          if (a !== hovered && b !== hovered) return;
          const from = pts[hovered];
          const to = pts[a === hovered ? b : a];
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(from.x + (to.x - from.x) * ease, from.y + (to.y - from.y) * ease);
          ctx.stroke();
        });
        ctx.restore();
      }

      // Now and then a shooting star crosses the chart.
      if (!reduceMotion) {
        if (!meteor && time > nextMeteor) {
          meteor = { x: w * (0.3 + Math.random() * 0.7), y: h * Math.random() * 0.35, vx: -0.55, vy: 0.32, born: time };
          nextMeteor = time + 7000 + Math.random() * 7000;
        }
        if (meteor) {
          const age = time - meteor.born;
          const life = 1100;
          if (age > life) meteor = null;
          else {
            const hx = meteor.x + meteor.vx * age;
            const hy = meteor.y + meteor.vy * age;
            const tail = 140;
            const g = ctx.createLinearGradient(hx, hy, hx - meteor.vx * tail, hy - meteor.vy * tail);
            const alpha = Math.sin((age / life) * Math.PI);
            g.addColorStop(0, `rgba(255, 246, 220, ${alpha})`);
            g.addColorStop(1, "rgba(255, 246, 220, 0)");
            ctx.strokeStyle = g;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(hx, hy);
            ctx.lineTo(hx - meteor.vx * tail, hy - meteor.vy * tail);
            ctx.stroke();
          }
        }
      }

      if (!reduceMotion) {
        const dt = lastTime ? Math.min(time - lastTime, 50) : 16;
        lastTime = time;
        if (time - lastSpawn > 700 && packets.length < 9 && edges.length) {
          lastSpawn = time;
          packets.push({ edge: Math.floor(Math.random() * edges.length), t: 0, speed: 0.00018 + Math.random() * 0.00018 });
        }
        for (let i = packets.length - 1; i >= 0; i--) {
          const pk = packets[i];
          pk.t += pk.speed * dt;
          if (pk.t >= 1) {
            packets.splice(i, 1);
            continue;
          }
          const [a, b] = edges[pk.edge];
          const x = pts[a].x + (pts[b].x - pts[a].x) * pk.t;
          const y = pts[a].y + (pts[b].y - pts[a].y) * pk.t;
          const fade = Math.sin(pk.t * Math.PI);
          ctx.fillStyle = `rgba(${MINT}, ${0.85 * fade})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      nodes.forEach((n, i) => {
        const p = pts[i];
        const rgb = n.mobile ? AMBER : MINT;
        const isHot = i === hovered;
        const pulse = reduceMotion ? 1 : 0.85 + 0.15 * Math.sin(time * 0.0015 + n.phase);
        const core = (n.featured ? 3.6 : 2.4) * (isHot ? 1.5 : 1);
        const halo = core * (isHot ? 9 : n.featured ? 7 : 5) * pulse;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, halo);
        g.addColorStop(0, `rgba(${rgb}, ${isHot ? 0.55 : n.featured ? 0.35 : 0.22})`);
        g.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, halo, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = isHot ? "#fff" : `rgba(${rgb}, 1)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, core, 0, Math.PI * 2);
        ctx.fill();

        if (n.featured && !isHot && !narrow) {
          ctx.font = `12px ${mono}`;
          ctx.fillStyle = "rgba(149, 161, 184, 0.75)";
          ctx.fillText(n.title, p.x + 12, p.y + 4);
        }
      });

      const tip = tipRef.current;
      if (tip) {
        if (hovered >= 0) {
          const n = nodes[hovered];
          const p = pts[hovered];
          const key = `${n.slug}:${touch}`;
          if (tip.dataset.slug !== key) {
            tip.dataset.slug = key;
            tip.querySelector("[data-title]")!.textContent = n.title;
            tip.querySelector("[data-sub]")!.textContent = `${n.type.toLowerCase()} · ${touch ? "tap again" : "click"} to open`;
            tip.style.borderColor = `rgba(${GOLD}, 0.55)`;
          }
          const flip = p.x + 16 + tip.offsetWidth > w - 8;
          const x = flip ? p.x - 16 - tip.offsetWidth : p.x + 16;
          const y = Math.min(Math.max(p.y - tip.offsetHeight / 2, 8), h - tip.offsetHeight - 8);
          tip.style.transform = `translate(${x}px, ${y}px)`;
          tip.style.opacity = "1";
        } else if (tip.style.opacity !== "0") {
          tip.style.opacity = "0";
          tip.dataset.slug = "";
        }
      }
    };

    const loop = (time: number) => {
      if (running) draw(time);
      raf = requestAnimationFrame(loop);
    };

    const toLocal = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      touch = false;
      pointer = toLocal(e);
      if (reduceMotion) draw(0);
    };
    const onLeave = () => {
      pointer = { x: -999, y: -999 };
      if (reduceMotion) draw(0);
    };
    const onDown = (e: PointerEvent) => {
      const prev = hovered;
      touch = e.pointerType === "touch";
      pointer = toLocal(e);
      draw(reduceMotion ? 0 : performance.now());
      // Touch: first tap shows the label, a second tap on the same star opens it.
      if (hovered >= 0 && (e.pointerType !== "touch" || prev === hovered)) {
        router.push(`/projects/${nodes[hovered].slug}`);
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting && !document.hidden;
    });
    io.observe(canvas);
    const onVis = () => {
      running = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);

    resize();
    if (!reduceMotion) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
    };
  }, [stars, router]);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full touch-manipulation" />
      <div
        ref={tipRef}
        aria-hidden="true"
        style={{ opacity: 0 }}
        className="pointer-events-none absolute left-0 top-0 z-20 rounded-md border bg-night/90 px-3 py-2 backdrop-blur-sm transition-opacity duration-150"
      >
        <p data-title className="font-serif text-[17px] leading-tight text-cream whitespace-nowrap" />
        <p data-sub className="mt-1 font-mono text-[11px] text-mist whitespace-nowrap" />
      </div>
    </>
  );
}
