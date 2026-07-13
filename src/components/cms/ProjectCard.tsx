import { ExternalLink } from "lucide-react";
import Link from "next/link";
import type { CmsProject } from "@/types/cms";
import { TagBadge } from "@/components/cms/TagBadge";

type ProjectCardProps = {
  readonly project: CmsProject;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-[20px] bg-white p-5 shadow-[var(--shadow-card)]">
      <div className="rounded-[18px] bg-[var(--color-surface-muted)] p-4">
        <TagBadge tone="blue">{project.status}</TagBadge>
        <h3 className="mt-4 text-lg font-semibold text-[var(--color-brand-primary)]">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--color-text-secondary)]">
          {project.description}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 3).map((technology) => (
          <TagBadge key={`${project.id}-${technology}`}>{technology}</TagBadge>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href={project.github}
          className="inline-flex min-h-10 items-center rounded-full bg-[var(--color-surface-muted)] px-3 text-xs font-semibold text-[var(--color-brand-primary)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
        >
          GitHub
        </Link>
        <Link
          href={project.demo}
          className="inline-flex min-h-10 items-center gap-1 rounded-full bg-[var(--color-brand-primary)] px-3 text-xs font-semibold text-white hover:bg-[var(--color-brand-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
        >
          Demo
          <ExternalLink aria-hidden="true" className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}
