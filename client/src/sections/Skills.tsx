import { skillGroups } from "../data/skills";
import { useReveal } from "../hooks/useReveal";
import "./Skills.css";

export default function Skills() {
  const headerRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div ref={headerRef} className="skills__header reveal">
          <span className="eyebrow skills__eyebrow">Technical Skills</span>
          <h2 className="skills__heading">What I work with.</h2>
        </div>

        <div ref={gridRef} className="skills__grid reveal-stagger">
          {skillGroups.map((group) => (
            <div key={group.label} className="skills__group">
              <h3 className="skills__group-label">{group.label}</h3>
              <div className="skills__badges">
                {group.items.map((item) => (
                  <span key={item} className="skills__badge">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
