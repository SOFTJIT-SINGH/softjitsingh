"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** A thin mint line across the top of the page that fills as you read. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-mint via-mint to-amber"
    />
  );
}
