"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/** Tilts its child in 3D towards the pointer, with a spring, like the original site's device cards. */
export default function Tilt({
  children,
  max = 8,
  className = "",
}: {
  children: React.ReactNode;
  max?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const scale = useSpring(1, { stiffness: 260, damping: 20 });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div className={`[perspective:1000px] ${className}`}>
      <motion.div
        style={{ rotateX: rx, rotateY: ry, scale, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          ry.set(px * max * 2);
          rx.set(-py * max * 2);
          scale.set(1.02);
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
          scale.set(1);
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
