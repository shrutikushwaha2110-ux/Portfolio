import { ArrowUp, Mail } from "lucide-react";
import GithubMark from "./icons/GithubMark";
import { profile } from "../data/profile";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <div>
            <div className="footer__logo">SHRUTI KUSHWAHA</div>
            <div className="footer__tagline">AI/ML &bull; FULL-STACK &bull; CREATIVE TECHNOLOGY</div>
          </div>

          <div className="footer__links">
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <Mail size={18} />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubMark size={18} />
            </a>
            <button onClick={scrollTop} aria-label="Back to top" className="footer__totop">
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        <div className="footer__bottom">
          <span>&copy; {year} Shruti Kushwaha. All rights reserved.</span>
          <span className="footer__closing">Designed with curiosity. Built with code.</span>
        </div>
      </div>
    </footer>
  );
}
