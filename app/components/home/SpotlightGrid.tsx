"use client";

import { useRef } from "react";

/** A list whose `.spot` cards each get a soft light that follows the pointer (see globals.css). */
export default function SpotlightGrid({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    ref.current?.querySelectorAll<HTMLElement>(".spot").forEach((card) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  };

  return (
    <ul ref={ref} onPointerMove={onMove} className={`spot-grid ${className ?? ""}`}>
      {children}
    </ul>
  );
}
