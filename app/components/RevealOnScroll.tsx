"use client";

import { useEffect } from "react";

/**
 * Fades `[data-reveal]` elements in as they scroll into view. Content stays visible if this never runs.
 * Uses a `data-in` attribute rather than a class, because React rewrites className on re-render.
 */
export default function RevealOnScroll() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );

    const track = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])").forEach((el) => {
        // Anything already on screen shows at once, so nothing above the fold flickers.
        if (el.getBoundingClientRect().top < window.innerHeight) el.setAttribute("data-in", "");
        else io.observe(el);
      });
    };

    track(document);
    document.documentElement.classList.add("reveal-ready");

    // Client navigation and re-renders add fresh nodes; pick them up too.
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) m.addedNodes.forEach((n) => n instanceof Element && track(n.parentNode ?? n));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
