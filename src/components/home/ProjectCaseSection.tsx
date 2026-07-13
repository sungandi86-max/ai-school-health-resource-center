import { ArrowRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { featuredProjects, getProjectResources, getProjectWorkflows } from "@/lib/projects";
import { projectStatusLabel, projectTypeLabel } from "@/lib/projectLabels";

const formatDate = (date: string): string => date.replaceAll("-", ".");

export function ProjectCaseSection() {
  return (
    <section className="grid gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">실제 프로젝트 사례</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
            AI와 디지털 도구를 활용해 보건 업무를 개선한 프로젝트를 살펴보세요.
          </p>
        </div>
        <Link
          href="/projects"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[var(--color-border-default)] px-4 text-sm font-semibold text-[var(--color-text-primary)] hover:border-[var(--color-action-primary)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
        >
          전체 프로젝트 보기
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {featuredProjects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className="grid gap-3 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] hover:border-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex min-h-10 min-w-10 items-center justify-center rounded-md bg-[var(--color-action-muted)] text-[var(--color-action-primary)]">
                <LayoutDashboard aria-hidden="true" size={18} />
              </span>
              <span className="rounded-md bg-[var(--color-status-success-muted)] px-2 py-1 text-xs font-semibold text-[var(--color-status-success)]">
                {projectStatusLabel(project.status)}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md bg-[var(--color-action-muted)] px-2 py-1 text-xs font-semibold text-[var(--color-action-primary)]">
                {projectTypeLabel(project.projectType)}
              </span>
              <span className="rounded-md border border-[var(--color-border-subtle)] px-2 py-1 text-xs font-medium text-[var(--color-text-secondary)]">
                {formatDate(project.updatedAt)}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold leading-snug">{project.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                {project.summary}
              </p>
            </div>
            <p className="mt-auto text-xs font-medium text-[var(--color-text-secondary)]">
              Workflow {getProjectWorkflows(project).length}개 · 관련 자료 {getProjectResources(project).length}개
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
