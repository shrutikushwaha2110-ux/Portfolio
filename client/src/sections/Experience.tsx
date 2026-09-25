import { timeline } from "../data/skills";
import { useReveal } from "../hooks/useReveal";
import "./Experience.css";

export default function Experience() {
  const headerRef = useReveal<HTMLDivElement>();
  const listRef = useReveal<HTMLDivElement>();

  return (
    <section id="experience" className="experience">
      <div className="container">
        <div ref={headerRef} className="experience__header reveal">
          <span className="eyebrow experience__eyebrow">Experience &amp; Achievements</span>
          <h2 className="experience__heading">Where I've put it into practice.</h2>
        </div>

        <div ref={listRef} className="experience__list reveal-stagger">
          {timeline.map((item) => (
            <div key={item.title} className="experience__item">
              <div className="experience__period">{item.period}</div>
              <div className="experience__content">
                <h3>{item.title}</h3>
                <span className="experience__place">{item.place}</span>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
