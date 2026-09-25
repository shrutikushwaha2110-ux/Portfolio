import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { projects, type Project } from "../data/projects";
import { useReveal } from "../hooks/useReveal";
import "./Projects.css";

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const headerRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();

  const featured = projects.find((p) => p.size === "featured");
  const rest = projects.filter((p) => p.size !== "featured");

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div ref={headerRef} className="projects__header reveal">
          <span className="eyebrow projects__eyebrow">Selected Work</span>
          <h2 className="projects__heading">Things I've built.</h2>
          <p className="projects__subtitle">
            A collection of experiments, systems, and products I've worked on.
          </p>
        </div>

        <div ref={gridRef} className="projects__grid reveal-stagger">
          {featured && (
            <div className="projects__featured">
              <ProjectCard project={featured} onOpen={setActive} />
            </div>
          )}
          {rest.map((project) => (
            <div key={project.id} className={`projects__item projects__item--${project.size}`}>
              <ProjectCard project={project} onOpen={setActive} />
            </div>
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
