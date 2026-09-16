import { Link } from "react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Profile, Project } from "@/lib/profile";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function CaseStudyPage({
  profile,
  project,
}: {
  profile: Profile;
  project: Project;
}) {
  const frames = [
    { label: "Problem", body: project.problem },
    { label: "Constraint", body: project.constraint },
    { label: "Decision", body: project.decision },
    { label: "Result", body: project.result },
  ].filter((frame) => frame.body.trim());

  const stack = project.stack.filter(Boolean);
  const live = project.href && !project.href.startsWith("#") ? project.href : "";

  return (
    <div className="min-h-dvh">
      <SiteHeader profile={profile} />
      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
          <Link to="/#work" className="inline-flex items-center gap-2 hover:text-ink">
            <ArrowLeft className="size-3.5" />
            Selected work
          </Link>
        </p>

        <p className="mt-8 text-[0.7rem] uppercase tracking-[0.16em] text-muted">
          {project.category} · {project.year}
        </p>
        <h1 className="mt-3 font-display text-display font-medium tracking-tight text-ink">
          {project.title}
        </h1>
        <p className="mt-6 max-w-2xl font-display text-lede italic text-ink-soft">
          {project.summary}
        </p>

        {project.image ? (
          <figure className="mt-12 overflow-hidden rounded-xl bg-paper-2">
            <img
              src={project.image}
              alt=""
              className="aspect-photo w-full object-cover"
            />
          </figure>
        ) : null}

        {frames.length ? (
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {frames.map((frame) => (
              <article key={frame.label} className="border-t border-line pt-5">
                <h2 className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                  {frame.label}
                </h2>
                <p className="mt-3 text-[1.05rem] leading-relaxed text-ink-soft">
                  {frame.body}
                </p>
              </article>
            ))}
          </div>
        ) : null}

        {project.description ? (
          <div className="mt-14 max-w-3xl">
            <h2 className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              Notes
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">
              {project.description}
            </p>
          </div>
        ) : null}

        {stack.length ? (
          <div className="mt-14">
            <h2 className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              Stack
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {stack.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line px-4 py-2 text-sm text-ink-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {live ? (
          <p className="mt-12">
            <a
              href={live}
              className="inline-flex min-h-11 items-center gap-2 text-sm hover:underline"
              rel="noreferrer"
            >
              Live project
              <ArrowUpRight className="size-4" />
            </a>
          </p>
        ) : null}
      </main>
      <SiteFooter profile={profile} />
    </div>
  );
}

export function CaseStudyMissing({ profile }: { profile: Profile }) {
  return (
    <div className="min-h-dvh">
      <SiteHeader profile={profile} />
      <main className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <h1 className="font-display text-section tracking-tight">Case study not found</h1>
        <p className="mt-4 text-muted">That project is not on this CV.</p>
        <Link to="/#work" className="mt-8 inline-flex min-h-11 items-center hover:underline">
          Back to selected work
        </Link>
      </main>
      <SiteFooter profile={profile} />
    </div>
  );
}
