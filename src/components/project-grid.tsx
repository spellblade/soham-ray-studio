import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import type { Profile, Project } from "@/lib/profile";
import { cn } from "@/lib/utils";

export function ProjectGrid({ profile }: { profile: Profile }) {
  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(profile.projects.map((p) => p.category).filter(Boolean)),
    );
    return ["All", ...unique];
  }, [profile.projects]);

  const [active, setActive] = useState("All");

  const visible =
    active === "All"
      ? profile.projects
      : profile.projects.filter((p) => p.category === active);

  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <div className="mb-8 flex items-end justify-between border-b border-line pb-4">
        <h2 className="font-display text-section font-medium tracking-tight">
          Selected work
        </h2>
        <span className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">02</span>
      </div>

      <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={cn(
              "h-11 shrink-0 rounded-full border px-4 text-sm transition-colors duration-150",
              active === cat
                ? "border-ink bg-ink text-paper"
                : "border-line bg-transparent text-muted hover:border-ink/40 hover:text-ink",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-center text-muted">No projects in this category yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-5">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/work/${project.id}`}
      className="project-card group block overflow-hidden rounded-xl bg-paper-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30"
    >
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt=""
          className="aspect-photo w-full object-cover"
        />
        <div className="project-veil pointer-events-none absolute inset-0 hidden bg-ink sm:block" />
        <div className="pointer-events-none absolute inset-0 hidden flex-col justify-end p-6 text-paper sm:flex">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.16em] text-paper/70">
                {project.category} · {project.year}
              </p>
              <h3 className="mt-1 font-display text-2xl tracking-tight">{project.title}</h3>
            </div>
            <ArrowUpRight className="mt-1 size-4 shrink-0 opacity-80" />
          </div>
          <p className="project-copy mt-3 max-w-md text-sm leading-relaxed text-paper/90">
            {project.summary}
          </p>
        </div>
      </div>
      <div className="space-y-1 px-1 py-4 sm:hidden">
        <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted">
          {project.category} · {project.year}
        </p>
        <h3 className="font-display text-2xl tracking-tight">{project.title}</h3>
        <p className="text-sm leading-relaxed text-muted">{project.summary}</p>
      </div>
    </Link>
  );
}
