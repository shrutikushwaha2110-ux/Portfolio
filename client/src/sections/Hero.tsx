import { useEffect, useRef, useState } from "react";
import { ArrowDown, MapPin } from "lucide-react";
import HeroAvatar from "../components/HeroAvatar";
import { profile, marqueeItems } from "../data/profile";
import "./Hero.css";

// How long the splash (her portrait + name, nothing else) holds before the
// page opens up. Set to 5s by default — change this one constant if you want
// it longer (e.g. 50000 for a full 50s cinematic hold).
const INTRO_HOLD_MS = 5000;

const SPLASH_FADE_MS = 700;

export default function Hero() {
  const [introDone, setIntroDone] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);
  const [splashMounted, setSplashMounted] = useState(true);
  const heroRef = useRef<HTMLElement>(null);

  // Fully unmount the splash once it's faded out — not just hidden — so its
  // avatar instance (and its own mousemove listener) can never linger behind
  // the main content.
  useEffect(() => {
    if (!introDone) return;
    const t = setTimeout(() => setSplashMounted(false), SPLASH_FADE_MS);
    return () => clearTimeout(t);
  }, [introDone]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame: number | null = null;
    const onMove = (e: MouseEvent) => {
      if (frame != null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty("--spot-x", `${x.toFixed(1)}%`);
        el.style.setProperty("--spot-y", `${y.toFixed(1)}%`);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame != null) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSkipIntro(true);
      setIntroDone(true);
      return;
    }
    const t = setTimeout(() => setIntroDone(true), INTRO_HOLD_MS);
    const onKey = () => setIntroDone(true);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className={`hero ${introDone ? "hero--revealed" : "hero--intro"}`}
    >
      <div className="hero__bg-grid" aria-hidden="true" />
      <div className="hero__spotlight" aria-hidden="true" />

      {/* Intro splash: her portrait, then her name, before the page opens up. */}
      {!skipIntro && splashMounted && (
        <button
          type="button"
          className="hero__splash"
          onClick={() => setIntroDone(true)}
          aria-label="Skip intro"
        >
          <div className="hero__splash-avatar">
            <HeroAvatar size="md" />
          </div>
          <span className="hero__splash-name">Shruti Kushwaha</span>
          <span className="hero__splash-tagline">AI/ML Engineer &amp; Full-Stack Developer</span>
          <span className="hero__splash-progress" style={{ animationDuration: `${INTRO_HOLD_MS}ms` }} />
          <span className="hero__splash-skip">Skip {"→"}</span>
        </button>
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
