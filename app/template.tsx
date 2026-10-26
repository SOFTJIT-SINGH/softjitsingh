"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Each page arrives out of a soft blur, like a chart coming into focus. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, filter: "blur(8px)", y: 8 }}
      // Clear filter and transform afterwards: either would trap position:fixed children (the explore meter).
      animate={{ opacity: 1, filter: "blur(0px)", y: 0, transitionEnd: { filter: "none", transform: "none" } }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
