"use client";

import { useEffect, useState } from "react";

/** Types each line, holds it, deletes it, and moves on. Shows the first line, still, for reduced motion. */
export default function Typewriter({
  lines,
  typeMs = 45,
  deleteMs = 22,
  holdMs = 2200,
  className = "",
}: {
  lines: string[];
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (still) return;
    const full = lines[index];
    let delay = deleting ? deleteMs : typeMs;
    if (!deleting && text === full) delay = holdMs;
    if (deleting && text === "") delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === full) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % lines.length);
      } else setText(full.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, lines, typeMs, deleteMs, holdMs, still]);

  return (
    <span className={className}>
      {/* Screen readers get every line once, not a stream of partial words. */}
      <span className="sr-only">{lines.join(". ")}</span>
      <span aria-hidden="true">
        {still ? lines[0] : text}
        <span className="ml-0.5 inline-block w-[0.55em] animate-[caret_1s_steps(1)_infinite] border-b-2 border-mint align-baseline">
          &nbsp;
        </span>
      </span>
    </span>
  );
}
