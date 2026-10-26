"use client";

import { useEffect } from "react";

/**
 * Magical scroll reveals. Marks elements with `data-in` as they enter the viewport; globals.css does the rest.
 *  - `[data-reveal]`            materialises out of a blur (variants: "title", "ink", "left", "right")
 *  - `[data-stagger] > *`       children reveal one after another
 *  - `section.chart-rule`       the gold divider star spins in and its rule draws outwards
 * Section headings and chart labels inside <main> are tagged automatically. Uses an attribute rather than
 * a class because React rewrites className on re-render; content stays visible if this never runs.
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

    const tag = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>("main h2").forEach((el) => {
        if (!el.hasAttribute("data-reveal") && !el.parentElement?.closest("[data-reveal]")) el.setAttribute("data-reveal", "title");
      });
      root.querySelectorAll<HTMLElement>("main p.font-mono").forEach((el) => {
        if (!el.hasAttribute("data-reveal") && /^chart [ivx]+ ·/.test(el.textContent ?? "")) el.setAttribute("data-reveal", "ink");
      });
      root.querySelectorAll<HTMLElement>("main section.chart-rule:not([data-watch])").forEach((el) => el.setAttribute("data-watch", ""));
      root.querySelectorAll<HTMLElement>("[data-stagger]").forEach((list) => {
        [...list.children].forEach((child, i) => {
          if (child.hasAttribute("data-reveal")) return;
          child.setAttribute("data-reveal", "");
          (child as HTMLElement).style.setProperty("--d", `${Math.min(i, 10) * 70}ms`);
        });
      });
    };

    const track = (root: ParentNode) => {
      tag(root);
      root.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in]), [data-watch]:not([data-in])").forEach((el) => {
        // Anything already on screen shows at once, so nothing above the fold flickers.
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.setAttribute("data-in", "");
        else io.observe(el);
      });
    };

    track(document);
    document.documentElement.classList.add("reveal-ready");

    // Client navigation, filters and re-renders add fresh nodes; pick them up too.
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (n instanceof Element) track(n.parentElement ?? document);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
