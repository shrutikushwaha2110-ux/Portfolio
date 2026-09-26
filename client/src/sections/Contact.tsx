import { useState } from "react";
import { Mail, Phone, ArrowUpRight, Copy, Check } from "lucide-react";
import GithubMark from "../components/icons/GithubMark";
import { profile } from "../data/profile";
import { useReveal } from "../hooks/useReveal";
import "./Contact.css";

// mailto:/tel: links only do anything if the visitor's OS has a mail or
// phone app configured as default — not a given on every machine. This
// copy button is the fallback that always works.
function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard API unavailable (very old browser, insecure context) —
      // fail silently, the mailto/tel link is still there as a fallback.
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      className="contact__method-copy"
      onClick={handleCopy}
      aria-label={`Copy ${label}`}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      <span className="contact__method-copy-label">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

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
              <CopyButton value={profile.email} label="email address" />
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
              <CopyButton value={profile.phone} label="phone number" />
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

          <p className="contact__hint">
            The buttons above open your email/phone app if you have one set as default —
            otherwise use the copy icon to grab the details directly.
          </p>

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
