import { useEffect, useRef } from "react";
import "./HeroAvatar.css";

interface Props {
  size?: "lg" | "md";
}

// Eye centers as fractions of the source image, measured directly against
// the actual artwork with a calibration grid overlay (not eyeballed) — see
// scratch calibration in project notes if this image is ever replaced.
const LEFT_EYE = { xPct: 42.3, yPct: 32.2 };
const RIGHT_EYE = { xPct: 57.6, yPct: 32.0 };
const MAX_PUPIL_PX = 5;
const MAX_TILT_DEG = 6;

/**
 * Illustrated portrait avatar whose eyes actually track the cursor: two
 * small catchlight/pupil overlays are pinned over her painted eyes and
 * nudged a few pixels toward the pointer, plus a subtle whole-head 3D tilt
 * for depth. Pure mousemove + rAF throttle, no dependencies.
 */
export default function HeroAvatar({ size = "lg" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const apply = (clientX: number, clientY: number) => {
      frameRef.current = null;
      const wrap = wrapRef.current;
      const tilt = tiltRef.current;
      if (!wrap || !tilt) return;
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dxNorm = Math.max(-1, Math.min(1, (clientX - cx) / (rect.width * 1.4)));
      const dyNorm = Math.max(-1, Math.min(1, (clientY - cy) / (rect.height * 1.4)));

      tilt.style.transform = `rotateX(${(-dyNorm * MAX_TILT_DEG).toFixed(2)}deg) rotateY(${(dxNorm * MAX_TILT_DEG).toFixed(2)}deg)`;

      const px = (dxNorm * MAX_PUPIL_PX).toFixed(2);
      const py = (dyNorm * MAX_PUPIL_PX).toFixed(2);
      if (leftPupilRef.current) leftPupilRef.current.style.transform = `translate(${px}px, ${py}px)`;
      if (rightPupilRef.current) rightPupilRef.current.style.transform = `translate(${px}px, ${py}px)`;
    };

    const onMove = (e: MouseEvent) => {
      if (frameRef.current == null) {
        frameRef.current = requestAnimationFrame(() => apply(e.clientX, e.clientY));
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`hero-avatar hero-avatar--${size}`}>
      <div className="hero-avatar__glow" aria-hidden="true" />
      <div ref={tiltRef} className="hero-avatar__tilt">
        <img
          className="hero-avatar__img"
          src={`${import.meta.env.BASE_URL}images/shruti-avatar.webp`}
          alt="Illustrated portrait of Shruti Kushwaha"
          width={700}
          height={663}
        />
        <div
          ref={leftPupilRef}
          className="hero-avatar__eye"
          style={{ left: `${LEFT_EYE.xPct}%`, top: `${LEFT_EYE.yPct}%` }}
        >
          <span className="hero-avatar__glint" />
        </div>
        <div
          ref={rightPupilRef}
          className="hero-avatar__eye"
          style={{ left: `${RIGHT_EYE.xPct}%`, top: `${RIGHT_EYE.yPct}%` }}
        >
          <span className="hero-avatar__glint" />
        </div>
      </div>
    </div>
  );
}
