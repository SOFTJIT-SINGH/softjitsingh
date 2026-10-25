"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/** Drifts its child vertically against the scroll, by up to `range` pixels each way. */
export default function Parallax({
  children,
  range = 60,
  className = "",
  style,
}: {
  children: React.ReactNode;
  range?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  return (
    <motion.div ref={ref} style={reduce ? style : { ...style, y }} className={className}>
      {children}
    </motion.div>
  );
}
