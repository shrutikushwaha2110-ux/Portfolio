import { GraduationCap, MapPin, Sparkles } from "lucide-react";
import GithubMark from "../components/icons/GithubMark";
import { profile } from "../data/profile";
import { useReveal } from "../hooks/useReveal";
import "./About.css";

export default function About() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="about">
      <div className="container">
        <div ref={revealRef} className="about__grid reveal">
          <div className="about__text">
            <span className="eyebrow about__eyebrow">A Little About Me</span>
            <h2 className="about__heading">
              Curious by nature.
              <br />
              <span className="about__heading-serif">Engineer by practice.</span>
            </h2>

            <div className="about__paragraphs">
              {profile.bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="about__card">
            <div className="about__card-row">
              <MapPin size={18} />
              <span>{profile.location}</span>
            </div>
            <div className="about__card-row">
              <GraduationCap size={18} />
              <span>{profile.education.degree}</span>
            </div>
            <div className="about__card-row about__card-row--accent">
              <Sparkles size={18} />
              <span>{profile.availability}</span>
            </div>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark about__card-github"
            >
              <GithubMark size={17} />
              View GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
