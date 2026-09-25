import "./HeroVisual.css";

/**
 * Abstract orbital / technical-grid graphic for the hero.
 * Pure inline SVG + CSS animation, no heavy canvas/3D library so it stays fast.
 */
export default function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <svg
        className="hero-visual__svg"
        viewBox="0 0 520 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="260" cy="260" r="199" stroke="rgba(246,244,238,0.12)" strokeWidth="1" />
        <circle cx="260" cy="260" r="150" stroke="rgba(246,244,238,0.16)" strokeWidth="1" />
        <circle cx="260" cy="260" r="98" stroke="rgba(200,255,77,0.35)" strokeWidth="1" />

        <g className="hero-visual__grid">
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1="12"
              y1={12 + i * 62}
              x2="508"
              y2={12 + i * 62}
              stroke="rgba(246,244,238,0.045)"
            />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={12 + i * 62}
              y1="12"
              x2={12 + i * 62}
              y2="508"
              stroke="rgba(246,244,238,0.045)"
            />
          ))}
        </g>

        <g className="hero-visual__orbit hero-visual__orbit--slow">
          <circle cx="260" cy="61" r="7" fill="#c8ff4d" />
        </g>
        <g className="hero-visual__orbit hero-visual__orbit--rev">
          <circle cx="459" cy="260" r="5.5" fill="#f6f4ee" />
        </g>
        <g className="hero-visual__orbit hero-visual__orbit--mid">
          <circle cx="110" cy="110" r="4.5" fill="#f6f4ee" fillOpacity="0.7" />
        </g>

        <circle cx="260" cy="260" r="46" fill="#0e0e0c" stroke="#c8ff4d" strokeWidth="1.5" />
        <path
          d="M244 260 L256 272 L278 248"
          stroke="#c8ff4d"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text x="272" y="466" className="hero-visual__label">
          SYSTEM.STATUS
        </text>
        <text x="272" y="484" className="hero-visual__label hero-visual__label--lime">
          {"BUILDING →"}
        </text>
      </svg>
    </div>
  );
}
