import { ArrowDown, MapPin } from "lucide-react";
import CartoonGirl from "../components/CartoonGirl";
import { profile, marqueeItems } from "../data/profile";
import "./Hero.css";

export default function Hero() {
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero">
      <div className="hero__bg-grid" aria-hidden="true" />

      <div className="container hero__inner">
        <span className="eyebrow hero__eyebrow">
          <span className="hero__dot" />
          Open to Internship Opportunities
        </span>

        <h1 className="hero__headline">
          BUILDING
          <br />
          <span className="hero__headline-serif">INTELLIGENT</span>
          <br />
          EXPERIENCES.
        </h1>

        <div className="hero__character">
          <CartoonGirl />
        </div>

        <p className="hero__subtitle">
          I'm Shruti {"—"} an AI/ML enthusiast and developer building thoughtful digital
          products, intelligent systems, and experiences that solve real problems.
        </p>

        <div className="hero__actions">
          <button className="btn btn-lime" onClick={scrollToProjects}>
            Explore My Work
          </button>
          <a
            href={`mailto:${profile.email}?subject=${encodeURIComponent("Let's connect")}`}
            className="btn btn-outline-dark"
          >
            Let's Connect
          </a>
        </div>

        <div className="hero__location">
          <MapPin size={15} />
          <span>{profile.location}</span>
        </div>
      </div>

      <button
        className="hero__scroll-indicator"
        onClick={scrollToProjects}
        aria-label="Scroll to projects"
      >
        <span>Scroll</span>
        <ArrowDown size={16} className="hero__scroll-arrow" />
      </button>

      <div className="hero__marquee" aria-hidden="true">
        <div className="hero__marquee-track">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map(
            (item, i) => (
              <span key={i} className="hero__marquee-item">
                {item}
                <span className="hero__marquee-sep">{"•"}</span>
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
