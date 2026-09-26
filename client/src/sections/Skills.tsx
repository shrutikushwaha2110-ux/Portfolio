import { skillGroups, type SkillGroup } from "../data/skills";
import { useReveal } from "../hooks/useReveal";
import { useTilt } from "../hooks/useTilt";
import "./Skills.css";

function SkillGroupCard({ group }: { group: SkillGroup }) {
  const tiltRef = useTilt<HTMLDivElement>({ max: 5, scale: 1.02 });
  return (
    <div ref={tiltRef} className="skills__group">
      <h3 className="skills__group-label">{group.label}</h3>
      <div className="skills__badges">
        {group.items.map((item) => (
          <span key={item} className="skills__badge">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

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
            <SkillGroupCard key={group.label} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
