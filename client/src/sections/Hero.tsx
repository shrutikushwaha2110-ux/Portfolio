import { useEffect, useState } from "react";
import { ArrowDown, MapPin } from "lucide-react";
import HeroAvatar from "../components/HeroAvatar";
import { profile, marqueeItems } from "../data/profile";
import "./Hero.css";

const INTRO_HOLD_MS = 1900;

export default function Hero() {
  const [introDone, setIntroDone] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSkipIntro(true);
      setIntroDone(true);
      return;
    }
    const t = setTimeout(() => setIntroDone(true), INTRO_HOLD_MS);
    return () => clearTimeout(t);
  }, []);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className={`hero ${introDone ? "hero--revealed" : "hero--intro"}`}>
      <div className="hero__bg-grid" aria-hidden="true" />

      {/* Intro splash: her portrait, then her name, before the page opens up. */}
      {!skipIntro && (
        <div className="hero__splash" aria-hidden="true">
          <div className="hero__splash-avatar">
            <HeroAvatar size="md" />
          </div>
          <span className="hero__splash-name">Shruti Kushwaha</span>
        </div>
      )}

      <div className="container hero__inner">
        <span className="eyebrow hero__eyebrow hero__reveal">
          <span className="hero__dot" />
          Open to Internship Opportunities
        </span>

        <h1 className="hero__headline hero__reveal">
          BUILDING
          <br />
          <span className="hero__headline-serif">INTELLIGENT</span>
          <br />
          EXPERIENCES.
        </h1>

        <div className="hero__character hero__reveal">
          <HeroAvatar size="lg" />
        </div>

        <p className="hero__subtitle hero__reveal">
          I'm Shruti {"—"} an AI/ML enthusiast and developer building thoughtful digital
          products, intelligent systems, and experiences that solve real problems.
        </p>

        <div className="hero__actions hero__reveal">
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

        <div className="hero__location hero__reveal">
          <MapPin size={15} />
          <span>{profile.location}</span>
        </div>
      </div>

      <button
        className="hero__scroll-indicator hero__reveal"
        onClick={scrollToProjects}
        aria-label="Scroll to projects"
      >
        <span>Scroll</span>
        <ArrowDown size={16} className="hero__scroll-arrow" />
      </button>

      <div className="hero__marquee hero__reveal" aria-hidden="true">
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
