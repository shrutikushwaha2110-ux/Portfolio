import { useEffect, useRef } from "react";
import "./CartoonGirl.css";

// Fixed eye centers in the SVG's own user-space coordinates (viewBox below).
// Known at design time, so cursor-tracking only needs to map the pointer
// into this same coordinate space — no per-frame layout reads.
const LEFT_EYE = { x: 150, y: 196 };
const RIGHT_EYE = { x: 210, y: 196 };
const MAX_PUPIL_OFFSET = 5.5;

/**
 * A friendly flat-illustration avatar standing in for Shruti — her eyes
 * track the visitor's cursor (clamped to a small radius so it reads as
 * "aware", not unsettling), with a slow idle blink and float. Pure inline
 * SVG + a single throttled mousemove listener, no dependencies.
 */
export default function CartoonGirl() {
  const svgRef = useRef<SVGSVGElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: LEFT_EYE.x, y: LEFT_EYE.y - 40 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const applyLook = () => {
      frameRef.current = null;
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const vb = svg.viewBox.baseVal;
      if (!rect.width || !rect.height) return;

      const localX = (pointerRef.current.x - rect.left) * (vb.width / rect.width) + vb.x;
      const localY = (pointerRef.current.y - rect.top) * (vb.height / rect.height) + vb.y;

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
      pointerRef.current = { x: e.clientX, y: e.clientY };
      if (frameRef.current == null) {
        frameRef.current = requestAnimationFrame(applyLook);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="cartoon-girl" aria-hidden="true">
      <svg
        ref={svgRef}
        className="cartoon-girl__svg"
        viewBox="0 0 360 420"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft halo behind her */}
        <circle cx="180" cy="196" r="168" fill="rgba(200,255,77,0.055)" />
        <circle cx="180" cy="196" r="130" fill="none" stroke="rgba(246,244,238,0.08)" strokeWidth="1" strokeDasharray="2 7" />

        {/* Shoulders / hoodie */}
        <path
          d="M60 420C60 340 110 296 180 296C250 296 300 340 300 420Z"
          fill="#181812"
        />
        <path d="M148 300C158 316 202 316 212 300L204 330C190 338 170 338 156 330Z" fill="#c8ff4d" />

        {/* Hair — back layer */}
        <path
          d="M74 250C58 176 96 84 180 80C264 84 302 176 286 250C286 210 268 232 262 190C244 214 96 214 78 190C72 232 74 210 74 250Z"
          fill="#241a14"
        />

        {/* Neck */}
        <rect x="160" y="248" width="40" height="56" rx="14" fill="#d9a06b" />

        {/* Head */}
        <ellipse cx="180" cy="190" rx="82" ry="90" fill="#e3ab76" />

        {/* Ears */}
        <ellipse cx="98" cy="196" rx="10" ry="14" fill="#e3ab76" />
        <ellipse cx="262" cy="196" rx="10" ry="14" fill="#e3ab76" />

        {/* Hair — front bangs */}
        <path
          d="M96 156C104 104 140 74 180 74C220 74 256 104 264 156C240 128 204 138 180 138C156 138 120 128 96 156Z"
          fill="#241a14"
        />
        <path d="M94 158C92 186 96 214 104 232C90 208 86 178 94 158Z" fill="#241a14" />
        <path d="M266 158C268 186 264 214 256 232C270 208 274 178 266 158Z" fill="#241a14" />

        {/* Eyebrows */}
        <path d="M120 168C130 160 148 160 158 166" stroke="#241a14" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M202 166C212 160 230 160 240 168" stroke="#241a14" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Glasses (thin, on-brand) */}
        <g stroke="#c8ff4d" strokeWidth="2" fill="none" opacity="0.9">
          <rect x="122" y="182" width="56" height="40" rx="18" />
          <rect x="182" y="182" width="56" height="40" rx="18" />
          <path d="M178 200H182" />
          <path d="M122 196H104" strokeLinecap="round" />
          <path d="M238 196H256" strokeLinecap="round" />
        </g>

        {/* Eyes */}
        <g>
          <ellipse cx={LEFT_EYE.x} cy={LEFT_EYE.y} rx="17" ry="13" fill="#fbfaf6" />
          <circle ref={leftPupilRef} cx={LEFT_EYE.x} cy={LEFT_EYE.y} r="6.5" fill="#181812" />
          <rect className="cartoon-girl__eyelid" x={LEFT_EYE.x - 19} y={LEFT_EYE.y - 15} width="38" height="16" fill="#e3ab76" />
        </g>
        <g>
          <ellipse cx={RIGHT_EYE.x} cy={RIGHT_EYE.y} rx="17" ry="13" fill="#fbfaf6" />
          <circle ref={rightPupilRef} cx={RIGHT_EYE.x} cy={RIGHT_EYE.y} r="6.5" fill="#181812" />
          <rect className="cartoon-girl__eyelid" x={RIGHT_EYE.x - 19} y={RIGHT_EYE.y - 15} width="38" height="16" fill="#e3ab76" />
        </g>

        {/* Blush */}
        <ellipse cx="126" cy="222" rx="12" ry="7" fill="#c8ff4d" opacity="0.18" />
        <ellipse cx="234" cy="222" rx="12" ry="7" fill="#c8ff4d" opacity="0.18" />

        {/* Nose + smile */}
        <path d="M180 200L176 222C178 226 182 226 184 222Z" fill="#d9a06b" />
        <path d="M154 236C166 250 194 250 206 236" stroke="#3a281c" strokeWidth="3.5" strokeLinecap="round" fill="none" />

        {/* Small floating tech accents */}
        <g className="cartoon-girl__accent cartoon-girl__accent--a">
          <circle cx="52" cy="120" r="5" fill="#c8ff4d" />
        </g>
        <g className="cartoon-girl__accent cartoon-girl__accent--b">
          <circle cx="312" cy="150" r="4" fill="#f6f4ee" opacity="0.7" />
        </g>
        <g className="cartoon-girl__accent cartoon-girl__accent--c">
          <path d="M300 260L312 266L300 272" stroke="#c8ff4d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      </svg>
    </div>
  );
}
