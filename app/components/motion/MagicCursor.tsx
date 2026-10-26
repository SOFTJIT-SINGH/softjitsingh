"use client";

import { useEffect, useRef } from "react";

type Spark = { x: number; y: number; vx: number; vy: number; born: number; life: number; size: number; gold: boolean };
type Ring = { x: number; y: number; born: number };

const GOLD = "216, 180, 106";
const MINT = "124, 242, 201";

/**
 * A soft glow that follows the mouse and sheds stardust, and a burst of sparks on every tap.
 * Drawn on one fixed canvas that ignores the pointer; the loop sleeps whenever nothing is moving.
 */
export default function MagicCursor() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const target = { x: -500, y: -500 };
    const glow = { x: -500, y: -500, size: 1, alpha: 0 };
    let targetSize = 1;
    let targetAlpha = 0;
    const sparks: Spark[] = [];
    const rings: Ring[] = [];
    let raf = 0;
    let lastMove = 0;

    const spawn = (x: number, y: number, n: number, speed: number, now: number) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const v = speed * (0.4 + Math.random() * 0.6);
        sparks.push({
          x,
          y,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v - 0.02,
          born: now,
          life: 600 + Math.random() * 600,
          size: 0.8 + Math.random() * 1.6,
          gold: Math.random() < 0.65,
        });
      }
    };

    const frame = (now: number) => {
      ctx.clearRect(0, 0, w, h);

      const k = reduce ? 1 : 0.16;
      glow.x += (target.x - glow.x) * k;
      glow.y += (target.y - glow.y) * k;
      glow.size += (targetSize - glow.size) * 0.12;
      glow.alpha += (targetAlpha - glow.alpha) * 0.1;

      if (glow.alpha > 0.005) {
        const r = 170 * glow.size;
        const g = ctx.createRadialGradient(glow.x, glow.y, 0, glow.x, glow.y, r);
        g.addColorStop(0, `rgba(${GOLD}, ${0.22 * glow.alpha})`);
        g.addColorStop(0.45, `rgba(${MINT}, ${0.07 * glow.alpha})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(glow.x - r, glow.y - r, r * 2, r * 2);
      }

      for (let i = rings.length - 1; i >= 0; i--) {
        const t = (now - rings[i].born) / 700;
        if (t >= 1) {
          rings.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(${GOLD}, ${0.7 * (1 - t)})`;
        ctx.lineWidth = 1.5 * (1 - t) + 0.3;
        ctx.beginPath();
        ctx.arc(rings[i].x, rings[i].y, 8 + t * 46, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        const age = now - s.born;
        if (age > s.life) {
          sparks.splice(i, 1);
          continue;
        }
        s.x += s.vx * 16;
        s.y += s.vy * 16;
        s.vy += 0.0012;
        const fade = 1 - age / s.life;
        ctx.fillStyle = `rgba(${s.gold ? GOLD : MINT}, ${fade})`;
        ctx.shadowColor = `rgba(${s.gold ? GOLD : MINT}, ${fade})`;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * fade + 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      const settling =
        Math.abs(target.x - glow.x) > 0.5 ||
        Math.abs(targetAlpha - glow.alpha) > 0.01 ||
        Math.abs(targetSize - glow.size) > 0.01;
      if (sparks.length || rings.length || settling || now - lastMove < 120) raf = requestAnimationFrame(frame);
      else raf = 0;
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const now = performance.now();
      const dist = Math.hypot(e.clientX - target.x, e.clientY - target.y);
      target.x = e.clientX;
      target.y = e.clientY;
      targetAlpha = 1;
      const el = e.target instanceof Element ? e.target.closest("a, button, [role=tab], input, textarea, select") : null;
      targetSize = el ? 1.45 : 1;
      if (!reduce && dist > 6 && dist < 400 && Math.random() < Math.min(dist / 40, 0.9)) spawn(e.clientX, e.clientY, 1, 0.02, now);
      lastMove = now;
      wake();
    };

    const onDown = (e: PointerEvent) => {
      const now = performance.now();
      if (e.pointerType === "mouse") {
        targetSize = 0.8;
        setTimeout(() => {
          targetSize = 1.2;
          wake();
        }, 120);
      } else {
        // Taps get their own glow at the finger, then let it fade.
        target.x = glow.x = e.clientX;
        target.y = glow.y = e.clientY;
        glow.alpha = 1;
        targetAlpha = 0;
      }
      if (!reduce) {
        rings.push({ x: e.clientX, y: e.clientY, born: now });
        spawn(e.clientX, e.clientY, e.pointerType === "mouse" ? 8 : 16, 0.09, now);
      }
      lastMove = now;
      wake();
    };

    const onLeave = () => {
      targetAlpha = 0;
      wake();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[55] h-full w-full mix-blend-screen"
    />
  );
}
