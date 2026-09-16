import { Link } from "react-router";
import type { Profile } from "@/lib/profile";

export function SiteFooter({ profile }: { profile: Profile }) {
  const year = new Date().getFullYear();

  return (
    <footer className="no-print border-t border-line bg-paper-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-3xl tracking-tight text-ink">{profile.name}</p>
          <p className="mt-2 text-sm text-muted">
            {profile.role}
            {profile.location ? ` · ${profile.location}` : ""}
          </p>
          {profile.availability ? (
            <p className="mt-3 text-sm text-ink-soft">{profile.availability}</p>
          ) : null}
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
            {profile.tagline}
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted">
            Index
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="/#work" className="hover:underline">
                Selected work
              </a>
            </li>
            <li>
              <a href="/#about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/#cv" className="hover:underline">
                Curriculum vitae
              </a>
            </li>
            <li>
              <a href="/#contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted">
            Elsewhere
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {profile.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="hover:underline"
                  rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-line px-5 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {year} {profile.name}. All rights reserved.
        </p>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>Set in Fraunces & Instrument Sans.</span>
          <Link to="/studio" className="underline-offset-4 hover:underline">
            Studio
          </Link>
        </p>
      </div>
    </footer>
  );
}
