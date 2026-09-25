import "./HeroVisual.css";

/**
 * Original illustrated abstract portrait for the hero — line-art hair,
 * asymmetric colourful eyes, an abstract nose/mouth, built as inline SVG
 * with light CSS animation (blink + slow float). Inspired by the bold
 * illustrated-agency mood of the brief's reference, executed in this site's
 * own black/lime/off-white palette rather than reproducing it.
 */
export default function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <svg
        className="hero-visual__svg"
        viewBox="0 0 520 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Line-art hair / contour strands */}
        <g className="hero-visual__hair" stroke="rgba(246,244,238,0.16)" strokeWidth="1.4" fill="none" strokeLinecap="round">
          <path d="M70 210C40 130 90 40 190 22" />
          <path d="M96 244C64 156 108 58 214 40" />
          <path d="M124 280C96 186 132 78 240 60" />
          <path d="M450 220C478 140 432 46 330 26" />
          <path d="M424 256C456 164 414 62 306 44" />
          <path d="M396 292C432 196 392 82 282 64" />
          <path d="M60 320C24 300 10 250 26 200" />
          <path d="M462 330C500 308 512 256 494 204" />
          <path d="M84 420C48 440 20 420 12 372" />
          <path d="M438 428C476 448 502 426 508 378" />
        </g>

        {/* Faint face contour */}
        <path
          d="M170 130C130 180 118 300 150 400C178 484 238 540 260 540C282 540 342 484 370 400C402 300 390 180 350 130C320 92 280 74 260 74C240 74 200 92 170 130Z"
          stroke="rgba(246,244,238,0.14)"
          strokeWidth="1.2"
          fill="none"
        />

        {/* Left eye (lime) */}
        <g className="hero-visual__eye hero-visual__eye--left">
          <path d="M160 258C178 236 214 234 236 254C214 276 176 276 160 258Z" fill="#131311" stroke="#c8ff4d" strokeWidth="2" />
          <circle cx="200" cy="256" r="15" fill="#c8ff4d" />
          <circle cx="200" cy="256" r="5.5" fill="#0a0a0a" />
          <rect className="hero-visual__eyelid" x="156" y="230" width="86" height="30" fill="#0a0a0a" />
        </g>

        {/* Right eye (warm accent) */}
        <g className="hero-visual__eye hero-visual__eye--right">
          <path d="M290 250C312 230 352 232 372 252C352 276 310 278 290 250Z" fill="#131311" stroke="#f2c98a" strokeWidth="2" />
          <circle cx="332" cy="254" r="14" fill="#f2c98a" />
          <circle cx="332" cy="254" r="5" fill="#0a0a0a" />
          <rect className="hero-visual__eyelid" x="286" y="226" width="90" height="30" fill="#0a0a0a" />
        </g>

        {/* Abstract nose */}
        <path d="M258 268L238 372C250 386 274 386 286 372L258 268Z" fill="#c8ff4d" fillOpacity="0.9" />

        {/* Abstract mouth */}
        <path
          d="M206 432C232 452 288 452 316 432C296 466 226 466 206 432Z"
          fill="none"
          stroke="#f2c98a"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        <text x="26" y="574" className="hero-visual__label">
          {"SYSTEM.STATUS"}
        </text>
        <text x="26" y="592" className="hero-visual__label hero-visual__label--lime">
          {"BUILDING →"}
        </text>
      </svg>
    </div>
  );
}
