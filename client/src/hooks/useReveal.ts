import { useEffect, useRef } from "react";

/**
 * Adds an `is-visible` class once the element enters the viewport,
 * using IntersectionObserver. Pairs with the `.reveal` / `.reveal-stagger`
 * CSS classes. Reduced-motion users still get instant visibility since the
 * CSS transition durations collapse to ~0 under prefers-reduced-motion.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
