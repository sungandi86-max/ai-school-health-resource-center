import { ArrowRight, Blocks, ClipboardList, FileText, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/types/project";
import { projectStatusLabel, projectTypeLabel } from "@/lib/projectLabels";

type ProjectCardProps = {
  readonly project: Project;
  readonly workflowCount: number;
  readonly resourceCount: number;
};

const formatDate = (date: string): string => date.replaceAll("-", ".");

export function ProjectCard({ project, workflowCount, resourceCount }: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)]">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-md bg-[var(--color-action-muted)] px-2 py-1 text-xs font-semibold text-[var(--color-action-primary)]">
          {projectTypeLabel(project.projectType)}
        </span>
        <span className="rounded-md bg-[var(--color-status-success-muted)] px-2 py-1 text-xs font-semibold text-[var(--color-status-success)]">
          {projectStatusLabel(project.status)}
        </span>
      </div>

      <div className="mt-4 grid gap-2">
        <div className="flex items-start gap-3">
          <span className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-[var(--color-surface-muted)] text-[var(--color-action-primary)]">
            <LayoutDashboard aria-hidden="true" size={21} />
          </span>
          <div>
            <h3 className="text-lg font-semibold leading-snug text-[var(--color-text-primary)]">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              {project.summary}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-[var(--color-surface-muted)] p-3">
        <p className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-primary)]">
          <FileText aria-hidden="true" size={14} />
          해결 문제
        </p>
        <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
          {project.problems.slice(0, 3).join(" · ")}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tools.slice(0, 4).map((tool) => (
          <span
            key={tool.name}
            className="rounded-md border border-[var(--color-border-subtle)] px-2 py-1 text-xs font-medium text-[var(--color-text-secondary)]"
          >
            {tool.name}
          </span>
        ))}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 rounded-md bg-[var(--color-surface-muted)] p-3 text-xs text-[var(--color-text-secondary)]">
        <div>
          <dt className="flex items-center gap-1 font-semibold text-[var(--color-text-primary)]">
            <Blocks aria-hidden="true" size={13} />
            Workflow
          </dt>
          <dd className="mt-1">{workflowCount}개</dd>
        </div>
        <div>
          <dt className="flex items-center gap-1 font-semibold text-[var(--color-text-primary)]">
            <ClipboardList aria-hidden="true" size={13} />
            관련 자료
          </dt>
          <dd className="mt-1">{resourceCount}개</dd>
        </div>
        <div className="col-span-2">
          <dt className="font-semibold text-[var(--color-text-primary)]">최근 업데이트</dt>
          <dd className="mt-1">{formatDate(project.updatedAt)}</dd>
        </div>
      </dl>

      <div className="mt-auto pt-5">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[var(--color-action-primary)] px-4 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-action-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
        >
          자세히 보기
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </article>
  );
}
