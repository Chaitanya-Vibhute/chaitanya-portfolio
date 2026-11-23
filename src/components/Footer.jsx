import { Link } from "react-router-dom";
import { navLinks, profile } from "../data/profile";
import Icon from "./Icon";

function scrollTop() {
  if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.2 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

function Social({ href, icon, label }) {
  const live = Boolean(href);
  return (
    <a
      href={live ? href : undefined}
      target={live ? "_blank" : undefined}
      rel={live ? "noopener noreferrer" : undefined}
      aria-label={live ? label : `${label} (link coming soon)`}
      aria-disabled={!live}
      onClick={(e) => !live && e.preventDefault()}
      data-cursor="link"
      className="flex h-10 w-10 items-center justify-center rounded-full glass text-muted transition hover:text-cyan"
    >
      <Icon name={icon} size={18} />
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative mt-24">
      <div className="section-sep" />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <p className="font-display text-2xl font-bold">
            <span className="gradient-text">Chaitanya</span> Vibhute
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Frontend Developer building responsive, scalable, and performance-oriented web applications with React.js
            and Angular.
          </p>
          <div className="mt-6 flex gap-3">
            <Social href={profile.linkedin} icon="linkedin" label="LinkedIn" />
            <Social href={profile.github} icon="github" label="GitHub" />
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-cyan">Navigate</p>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted transition hover:text-soft" data-cursor="link">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-cyan">Contact</p>
          <ul className="space-y-2.5 text-sm text-muted">
            <li>
              <a className="transition hover:text-soft" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </li>
            <li>
              <a className="transition hover:text-soft" href={`tel:${profile.phoneHref}`}>
                {profile.phone}
              </a>
            </li>
            <li>{profile.location}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between border-t border-white/5 px-6 py-6 text-xs text-muted">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <button
          type="button"
          onClick={scrollTop}
          data-cursor="button"
          data-cursor-label="Top"
          className="group flex items-center gap-2 rounded-full glass px-4 py-2 transition hover:text-soft"
        >
          Back to top
          <Icon name="up" size={14} className="transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
}
