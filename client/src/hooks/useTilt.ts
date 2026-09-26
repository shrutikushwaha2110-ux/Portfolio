import { useEffect, useRef } from "react";

interface TiltOptions {
  max?: number; // max tilt in degrees
  scale?: number; // scale applied while hovering
}

/**
 * Generic 3D card-tilt-on-hover: rotates the element toward the cursor
 * within its own bounds, lifting slightly, then eases back to flat on
 * mouse leave. Local listeners only (no global mousemove), rAF-throttled,
 * and a no-op under prefers-reduced-motion.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>(options: TiltOptions = {}) {
  const { max = 8, scale = 1.02 } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame: number | null = null;
    let pendingEvent: { x: number; y: number } | null = null;

    const apply = () => {
      frame = null;
      if (!pendingEvent) return;
      const rect = el.getBoundingClientRect();
      const px = (pendingEvent.x - rect.left) / rect.width - 0.5;
      const py = (pendingEvent.y - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) scale(${scale})`;
    };

    const onMove = (e: MouseEvent) => {
      pendingEvent = { x: e.clientX, y: e.clientY };
      if (frame == null) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      if (frame != null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (frame != null) cancelAnimationFrame(frame);
    };
  }, [max, scale]);

  return ref;
}
