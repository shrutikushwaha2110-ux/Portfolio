import { useEffect, useRef } from "react";
import "./HeroAvatar.css";

interface Props {
  size?: "lg" | "md";
}

// Eye centers in the SVG's own user-space coordinates (viewBox below) —
// known exactly since this is hand-authored artwork, not a measured photo.
const LEFT_EYE = { x: 148, y: 198 };
const RIGHT_EYE = { x: 212, y: 198 };
const MAX_PUPIL_OFFSET = 7;
const MAX_TILT_DEG = 5;

/**
 * Illustrated portrait avatar with genuinely moving eyeballs: two real SVG
 * pupil circles are translated toward the cursor every frame (not an overlay
 * approximating a photo's fixed pupils), plus a slow idle blink and a
 * subtle whole-head 3D tilt. Pure mousemove + rAF throttle, no dependencies.
 */
export default function HeroAvatar({ size = "lg" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const apply = (clientX: number, clientY: number) => {
      frameRef.current = null;
      const wrap = wrapRef.current;
      const svg = svgRef.current;
      const tilt = tiltRef.current;
      if (!wrap || !svg || !tilt) return;

      const wrapRect = wrap.getBoundingClientRect();
      const cx = wrapRect.left + wrapRect.width / 2;
      const cy = wrapRect.top + wrapRect.height / 2;
      const dxNorm = Math.max(-1, Math.min(1, (clientX - cx) / (wrapRect.width * 1.4)));
      const dyNorm = Math.max(-1, Math.min(1, (clientY - cy) / (wrapRect.height * 1.4)));
      tilt.style.transform = `rotateX(${(-dyNorm * MAX_TILT_DEG).toFixed(2)}deg) rotateY(${(dxNorm * MAX_TILT_DEG).toFixed(2)}deg)`;

      // Map the pointer into the SVG's own coordinate space so the eyeballs
      // aim at the actual cursor position, not just a flattened direction.
      const svgRect = svg.getBoundingClientRect();
      const vb = svg.viewBox.baseVal;
      const localX = ((clientX - svgRect.left) / svgRect.width) * vb.width + vb.x;
      const localY = ((clientY - svgRect.top) / svgRect.height) * vb.height + vb.y;

      for (const [ref, center] of [
        [leftPupilRef, LEFT_EYE],
        [rightPupilRef, RIGHT_EYE],
      ] as const) {
        const el = ref.current;
        if (!el) continue;
        let dx = localX - center.x;
        let dy = localY - center.y;
        const dist = Math.hypot(dx, dy);
        if (dist > MAX_PUPIL_OFFSET) {
          const scale = MAX_PUPIL_OFFSET / dist;
          dx *= scale;
          dy *= scale;
        }
        el.setAttribute("transform", `translate(${dx.toFixed(2)} ${dy.toFixed(2)})`);
      }
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
        <svg
          ref={svgRef}
          className="hero-avatar__svg"
          viewBox="0 0 360 420"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Soft halo */}
          <circle cx="180" cy="196" r="168" fill="rgba(200,255,77,0.06)" />
          <circle
            cx="180"
            cy="196"
            r="130"
            fill="none"
            stroke="rgba(246,244,238,0.08)"
            strokeWidth="1"
            strokeDasharray="2 7"
          />

          {/* Shoulders / top */}
          <path d="M56 420C56 338 108 292 180 292C252 292 304 338 304 420Z" fill="#181812" />
          <path d="M146 296C157 313 203 313 214 296L205 328C190 337 170 337 155 328Z" fill="#c8ff4d" />

          {/* Hair back — one smooth silhouette flowing past the shoulders */}
          <path
            d="M64 248C46 168 92 76 180 72C268 76 314 168 296 248C300 310 292 372 274 410C270 360 272 300 266 236C268 300 262 360 246 398C244 350 248 296 244 230C222 250 138 250 116 230C112 296 116 350 114 398C98 360 92 300 94 236C88 300 90 360 86 410C68 372 60 310 64 248Z"
            fill="#211722"
          />

          {/* Neck + head */}
          <rect x="159" y="246" width="42" height="58" rx="15" fill="#f0c8a0" />
          <ellipse cx="180" cy="188" rx="84" ry="92" fill="#ffd7ae" />
          <ellipse cx="96" cy="194" rx="10" ry="14" fill="#ffd7ae" />
          <ellipse cx="264" cy="194" rx="10" ry="14" fill="#ffd7ae" />

          {/* Hair front */}
          <path
            d="M94 154C102 100 140 70 180 70C220 70 258 100 266 154C240 124 204 136 180 136C156 136 120 124 94 154Z"
            fill="#211722"
          />
          <path d="M92 156C90 186 94 216 103 235C88 210 84 178 92 156Z" fill="#211722" />
          <path d="M268 156C270 186 266 216 257 235C272 210 276 178 268 156Z" fill="#211722" />

          {/* Eyebrows */}
          <path d="M116 166C127 157 147 157 158 164" stroke="#211722" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M202 164C213 157 233 157 244 166" stroke="#211722" strokeWidth="4.5" strokeLinecap="round" fill="none" />

          {/* Eyes: white sclera, moving pupil, soft lash line */}
          <g>
            <ellipse cx={LEFT_EYE.x} cy={LEFT_EYE.y} rx="21" ry="15.5" fill="#fffaf3" />
            <circle ref={leftPupilRef} cx={LEFT_EYE.x} cy={LEFT_EYE.y} r="8.5" fill="#2b1c14" />
            <circle cx={LEFT_EYE.x - 2.5} cy={LEFT_EYE.y - 2.5} r="2.2" fill="#fff" opacity="0.85" />
            <path
              d={`M${LEFT_EYE.x - 23} ${LEFT_EYE.y - 4}C${LEFT_EYE.x - 12} ${LEFT_EYE.y - 17},${LEFT_EYE.x + 12} ${LEFT_EYE.y - 17},${LEFT_EYE.x + 23} ${LEFT_EYE.y - 4}`}
              stroke="#211722"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <rect className="hero-avatar__eyelid" x={LEFT_EYE.x - 24} y={LEFT_EYE.y - 20} width="48" height="20" fill="#ffd7ae" />
          </g>
          <g>
            <ellipse cx={RIGHT_EYE.x} cy={RIGHT_EYE.y} rx="21" ry="15.5" fill="#fffaf3" />
            <circle ref={rightPupilRef} cx={RIGHT_EYE.x} cy={RIGHT_EYE.y} r="8.5" fill="#2b1c14" />
            <circle cx={RIGHT_EYE.x - 2.5} cy={RIGHT_EYE.y - 2.5} r="2.2" fill="#fff" opacity="0.85" />
            <path
              d={`M${RIGHT_EYE.x - 23} ${RIGHT_EYE.y - 4}C${RIGHT_EYE.x - 12} ${RIGHT_EYE.y - 17},${RIGHT_EYE.x + 12} ${RIGHT_EYE.y - 17},${RIGHT_EYE.x + 23} ${RIGHT_EYE.y - 4}`}
              stroke="#211722"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <rect className="hero-avatar__eyelid" x={RIGHT_EYE.x - 24} y={RIGHT_EYE.y - 20} width="48" height="20" fill="#ffd7ae" />
          </g>

          {/* Blush */}
          <ellipse cx="122" cy="222" rx="13" ry="7.5" fill="#ff8a65" opacity="0.22" />
          <ellipse cx="238" cy="222" rx="13" ry="7.5" fill="#ff8a65" opacity="0.22" />

          {/* Nose + smile */}
          <path d="M180 202L175 226C177 230 183 230 185 226Z" fill="#f0c8a0" />
          <path d="M152 240C165 254 195 254 208 240" stroke="#7a4a30" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M160 244C170 250 190 250 200 244" fill="#c9614f" opacity="0.75" />

          {/* Earrings */}
          <circle cx="98" cy="222" r="3.5" fill="#f6f4ee" stroke="#c8ff4d" strokeWidth="1.2" />
          <circle cx="262" cy="222" r="3.5" fill="#f6f4ee" stroke="#c8ff4d" strokeWidth="1.2" />
        </svg>
      </div>
    </div>
  );
}
