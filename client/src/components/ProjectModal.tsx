import { useEffect, useRef } from "react";
import { X, ArrowUpRight } from "lucide-react";
import GithubMark from "./icons/GithubMark";
import type { Project } from "../data/projects";
import "./ProjectModal.css";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="project-modal__backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="project-modal">
        <button ref={closeBtnRef} className="project-modal__close" onClick={onClose} aria-label="Close project details">
          <X size={20} />
        </button>

        <span className="eyebrow project-modal__category">{project.category}</span>
        <h2 id="project-modal-title" className="project-modal__title">
          {project.name}
        </h2>
        <p className="project-modal__oneliner">{project.oneLiner}</p>

        <div className="project-modal__tech">
          {project.tech.map((t) => (
            <span key={t} className="project-modal__tag">
              {t}
            </span>
          ))}
        </div>

        <div className="project-modal__section">
          <h3>Problem</h3>
          <p>{project.details.problem}</p>
        </div>
        <div className="project-modal__section">
          <h3>Solution</h3>
          <p>{project.details.solution}</p>
        </div>
        <div className="project-modal__section">
          <h3>My Contribution</h3>
          <p>{project.details.contribution}</p>
        </div>
        <div className="project-modal__section">
          <h3>Architecture</h3>
          <p>{project.details.architecture}</p>
        </div>
        <div className="project-modal__section">
          <h3>Challenges &amp; Learnings</h3>
          <p>{project.details.challenges}</p>
        </div>

        <div className="project-modal__actions">
          <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-dark">
            <GithubMark size={17} />
            View Repository
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-lime">
              Live Demo
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
