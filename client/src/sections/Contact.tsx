import { Mail, Phone, ArrowUpRight } from "lucide-react";
import GithubMark from "../components/icons/GithubMark";
import { profile } from "../data/profile";
import { useReveal } from "../hooks/useReveal";
import "./Contact.css";

export default function Contact() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div ref={revealRef} className="contact__inner reveal">
          <h2 className="contact__heading">
            HAVE A PROJECT IN MIND?
            <br />
            <span className="contact__heading-lime">LET'S BUILD SOMETHING.</span>
          </h2>
          <p className="contact__subtitle">
            I'm always interested in connecting with people working on interesting ideas, AI,
            and technology.
          </p>

          <div className="contact__methods">
            <a href={`mailto:${profile.email}`} className="contact__method">
              <div className="contact__method-icon">
                <Mail size={20} />
              </div>
              <div>
                <span className="contact__method-label">Email</span>
                <span className="contact__method-value">{profile.email}</span>
              </div>
              <ArrowUpRight size={18} className="contact__method-arrow" />
            </a>

            <a href={profile.phoneHref} className="contact__method">
              <div className="contact__method-icon">
                <Phone size={20} />
              </div>
              <div>
                <span className="contact__method-label">Phone</span>
                <span className="contact__method-value">{profile.phone}</span>
              </div>
              <ArrowUpRight size={18} className="contact__method-arrow" />
            </a>

            <a href={profile.github} target="_blank" rel="noreferrer" className="contact__method">
              <div className="contact__method-icon">
                <GithubMark size={20} />
              </div>
              <div>
                <span className="contact__method-label">GitHub</span>
                <span className="contact__method-value">shrutikushwaha2110-ux</span>
              </div>
              <ArrowUpRight size={18} className="contact__method-arrow" />
            </a>
          </div>

          <div className="contact__actions">
            <a href={`mailto:${profile.email}`} className="btn btn-lime">
              Send an Email
            </a>
            <a href={profile.phoneHref} className="btn btn-outline-dark">
              Call Me
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-outline-dark">
              <GithubMark size={16} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
