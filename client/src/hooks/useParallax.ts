import { useEffect, useRef } from "react";

/**
 * Lightweight scroll parallax: as the element passes through the viewport,
 * it shifts vertically by (distance from viewport centre) * speed, giving
 * project cards a layered, depth-y feel while scrolling. A single shared
 * scroll listener per hook instance, rAF-throttled, and a no-op under
 * prefers-reduced-motion.
 */
// Clamp how far anything can drift, however far it scrolls, so neighbouring
// cards can never close the gap between them (let alone overlap) — depth
// without risking collision.
const MAX_DRIFT_PX = 26;

export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.08) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame: number | null = null;

    const update = () => {
      frame = null;
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elCenter = rect.top + rect.height / 2;
      const offset = Math.max(
        -MAX_DRIFT_PX,
        Math.min(MAX_DRIFT_PX, (viewportCenter - elCenter) * speed)
      );
      el.style.setProperty("--parallax-y", `${offset.toFixed(1)}px`);
    };

    const onScroll = () => {
      if (frame == null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame != null) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return ref;
}
