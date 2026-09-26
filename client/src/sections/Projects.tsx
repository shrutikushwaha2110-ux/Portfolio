import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { projects, type Project } from "../data/projects";
import { useReveal } from "../hooks/useReveal";
import { useParallax } from "../hooks/useParallax";
import "./Projects.css";

interface GridItemProps {
  project: Project;
  speed: number;
  tilt?: "l" | "r";
  onOpen: (project: Project) => void;
  outerClassName: string;
}

// The outer element stays a plain reveal-stagger target (entrance fade/slide);
// the inner ".projects__tilt" gets its own scroll-parallax drift and static
// tilt (straightening on hover) — the layered, slightly-off-axis collage
// feel from the Fractiona reference, built with plain scroll math and CSS,
// kept on a separate element so it never fights the entrance animation's
// own transform.
function GridItem({ project, speed, tilt, onOpen, outerClassName }: GridItemProps) {
  const parallaxRef = useParallax<HTMLDivElement>(speed);
  const tiltClass = tilt ? ` projects__tilt--${tilt}` : "";
  return (
    <div className={outerClassName}>
      <div ref={parallaxRef} className={`projects__tilt${tiltClass}`}>
        <ProjectCard project={project} onOpen={onOpen} />
      </div>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const headerRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();

  const featured = projects.find((p) => p.size === "featured");
  const rest = projects.filter((p) => p.size !== "featured");
  const speedBySize: Record<string, number> = { large: 0.05, medium: 0.09, small: 0.13 };

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
            <GridItem
              project={featured}
              speed={0.02}
              onOpen={setActive}
              outerClassName="projects__featured"
            />
          )}
          {rest.map((project, i) => (
            <GridItem
              key={project.id}
              project={project}
              speed={speedBySize[project.size] ?? 0.08}
              // Rotation is only safe on the narrower medium/small cards — a
              // full-row-width card visibly rotating swings its corners into
              // the row above/below it, however small the angle.
              tilt={project.size === "large" ? undefined : i % 2 === 0 ? "l" : "r"}
              onOpen={setActive}
              outerClassName={`projects__item projects__item--${project.size}`}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
