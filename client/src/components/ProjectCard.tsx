import { ArrowUpRight } from "lucide-react";
import GithubMark from "./icons/GithubMark";
import type { Project } from "../data/projects";
import "./ProjectCard.css";

interface Props {
  project: Project;
  onOpen: (project: Project) => void;
}

export default function ProjectCard({ project, onOpen }: Props) {
  return (
    <article className={`project-card project-card--${project.size} project-card--${project.accent}`}>
      <div className="project-card__visual">
        <ProjectGlyph project={project} />
      </div>

      <div className="project-card__body">
        <span className="project-card__category">{project.category}</span>
        <h3 className="project-card__name">{project.name}</h3>
        <p className="project-card__oneliner">{project.oneLiner}</p>

        <div className="project-card__tech">
          {project.tech.slice(0, project.size === "featured" ? 6 : 4).map((t) => (
            <span key={t} className="project-card__tag">
              {t}
            </span>
          ))}
        </div>

        <div className="project-card__actions">
          <button className="btn btn-lime project-card__view" onClick={() => onOpen(project)}>
            View Project
            <ArrowUpRight size={16} />
          </button>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="project-card__github"
            aria-label={`${project.name} on GitHub`}
            onClick={(e) => e.stopPropagation()}
          >
            <GithubMark size={18} />
          </a>
        </div>
      </div>
    </article>
  );
}

// Original illustrative mockup graphic per project (not a fabricated screenshot),
// distinguished by category so each card reads as its own product.
function ProjectGlyph({ project }: { project: Project }) {
  switch (project.id) {
    case "battery-health":
      return (
        <svg viewBox="0 0 400 220" className="project-glyph" aria-hidden="true">
          <rect x="0" y="0" width="400" height="220" fill="#0e0e0c" />
          <polyline
            points="10,150 60,150 80,90 110,180 140,60 170,150 210,150 240,110 270,150 400,150"
            fill="none"
            stroke="#c8ff4d"
            strokeWidth="2.5"
          />
          <circle cx="140" cy="60" r="4" fill="#c8ff4d" />
          <rect x="20" y="24" width="88" height="26" rx="13" fill="rgba(200,255,77,0.12)" />
          <text x="34" y="41" fontSize="11" fill="#c8ff4d" fontFamily="var(--font-display)">
            3.7V LIVE
          </text>
        </svg>
      );
    case "campusconnect":
      return (
        <svg viewBox="0 0 400 220" className="project-glyph" aria-hidden="true">
          <rect x="0" y="0" width="400" height="220" fill="#131311" />
          {[0, 1, 2].map((col) =>
            [0, 1].map((row) => (
              <rect
                key={`${col}-${row}`}
                x={24 + col * 128}
                y={28 + row * 92}
                width="108"
                height="72"
                rx="12"
                fill={row === 0 && col === 0 ? "#c8ff4d" : "rgba(246,244,238,0.08)"}
              />
            ))
          )}
        </svg>
      );
    case "samagama-faq":
      return (
        <svg viewBox="0 0 400 220" className="project-glyph" aria-hidden="true">
          <rect x="0" y="0" width="400" height="220" fill="#fbfaf6" />
          <circle cx="200" cy="110" r="70" fill="none" stroke="#0e0e0c" strokeWidth="1.5" strokeDasharray="4 6" />
          <circle cx="200" cy="110" r="6" fill="#0e0e0c" />
          <circle cx="140" cy="70" r="4" fill="#c8ff4d" stroke="#0e0e0c" />
          <circle cx="260" cy="150" r="4" fill="#c8ff4d" stroke="#0e0e0c" />
          <circle cx="255" cy="65" r="4" fill="#0e0e0c" />
          <line x1="200" y1="110" x2="140" y2="70" stroke="#0e0e0c" strokeWidth="1" />
          <line x1="200" y1="110" x2="260" y2="150" stroke="#0e0e0c" strokeWidth="1" />
          <line x1="200" y1="110" x2="255" y2="65" stroke="#0e0e0c" strokeWidth="1" />
        </svg>
      );
    case "expenseflow":
      return (
        <svg viewBox="0 0 400 220" className="project-glyph" aria-hidden="true">
          <rect x="0" y="0" width="400" height="220" fill="#0e0e0c" />
          <rect x="24" y="30" width="150" height="40" rx="10" fill="rgba(200,255,77,0.16)" />
          <rect x="24" y="82" width="352" height="1" fill="rgba(246,244,238,0.12)" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x="24" y={100 + i * 26} width="352" height="16" rx="4" fill="rgba(246,244,238,0.08)" />
          ))}
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 400 220" className="project-glyph" aria-hidden="true">
          <rect x="0" y="0" width="400" height="220" fill="#c8ff4d" />
          <rect x="30" y="160" width="18" height="30" fill="#0e0e0c" />
          <rect x="70" y="130" width="18" height="60" fill="#0e0e0c" />
          <rect x="110" y="100" width="18" height="90" fill="#0e0e0c" />
          <circle cx="300" cy="90" r="26" fill="#0e0e0c" />
        </svg>
      );
  }
}
