import { useEffect, useRef } from "react";
import "./HeroAvatar.css";

interface Props {
  size?: "lg" | "md";
}

/**
 * Circular portrait avatar that subtly tilts toward the cursor (a 3D
 * perspective rotate, clamped to a small angle) so it still reads as
 * "aware of you" the way the earlier illustrated eyes did, even though a
 * photo can't move its pupils. Pure mousemove + rAF throttle, no library.
 */
export default function HeroAvatar({ size = "lg" }: Props) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const applyTilt = (clientX: number, clientY: number) => {
      frameRef.current = null;
      const el = tiltRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.max(-1, Math.min(1, (clientX - cx) / (rect.width * 1.4)));
      const dy = Math.max(-1, Math.min(1, (clientY - cy) / (rect.height * 1.4)));
      el.style.transform = `rotateX(${(-dy * 9).toFixed(2)}deg) rotateY(${(dx * 11).toFixed(2)}deg)`;
    };

    const onMove = (e: MouseEvent) => {
      if (frameRef.current == null) {
        frameRef.current = requestAnimationFrame(() => applyTilt(e.clientX, e.clientY));
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className={`hero-avatar hero-avatar--${size}`}>
      <div ref={tiltRef} className="hero-avatar__tilt">
        <div className="hero-avatar__ring" />
        <img
          className="hero-avatar__img"
          src={`${import.meta.env.BASE_URL}images/shruti-avatar.webp`}
          alt="Portrait illustration of Shruti Kushwaha"
          width={800}
          height={1200}
        />
      </div>
    </div>
  );
}
