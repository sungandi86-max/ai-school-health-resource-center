import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpenText,
  CheckCircle2,
  ClipboardList,
  FileText,
  GitBranch,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import type { Project, ProjectFeatureIcon } from "@/types/project";
import type { Resource } from "@/types/resource";
import type { WorkflowModel } from "@/types/workflow";
import { RESOURCE_TYPES } from "@/types/resource";
import { WORKFLOW_DIFFICULTIES } from "@/types/workflow";
import { projectStatusLabel, projectTypeLabel } from "@/lib/projectLabels";

type ProjectDetailListProps = {
  readonly title: string;
  readonly items: readonly string[];
  readonly tone?: "default" | "privacy";
};

type ProjectLinkSectionsProps = {
  readonly workflows: readonly WorkflowModel[];
  readonly resources: readonly Resource[];
  readonly relatedProjects: readonly Project[];
};

const outcomeLabels = {
  observed: "확인된 변화",
  expected: "기대 효과",
  next: "다음 검증 과제",
} as const;

const featureIconMap: Record<ProjectFeatureIcon, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  "clipboard-list": ClipboardList,
  "file-text": FileText,
  chart: BarChart3,
  book: BookOpenText,
  workflow: GitBranch,
  shield: ShieldCheck,
  sparkles: Sparkles,
};

export function ProjectDetailList({ title, items, tone = "default" }: ProjectDetailListProps) {
  const Icon = tone === "privacy" ? ShieldCheck : CheckCircle2;

  return (
    <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
      <h2 className="text-xl font-semibold">{title}</h2>
      <ul className="mt-4 grid gap-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--color-text-secondary)]">
            <Icon
              aria-hidden="true"
              size={17}
              className={
                tone === "privacy"
                  ? "mt-1 shrink-0 text-[var(--color-status-success)]"
                  : "mt-1 shrink-0 text-[var(--color-action-primary)]"
              }
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProjectComparison({
  beforeItems,
  afterItems,
}: {
  readonly beforeItems: readonly string[];
  readonly afterItems: readonly string[];
}) {
  return (
    <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
      <h2 className="text-xl font-semibold">기존 방식과 개선 방식 비교</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)] p-4">
          <h3 className="text-base font-semibold">기존 방식</h3>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--color-text-secondary)]">
            {beforeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-action-muted)] p-4">
          <h3 className="text-base font-semibold">개선된 방식</h3>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--color-text-secondary)]">
            {afterItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ProjectFeatureGrid({ project }: { readonly project: Project }) {
  return (
    <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
      <h2 className="text-xl font-semibold">주요 기능</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {project.features.map((feature) => {
          const Icon = featureIconMap[feature.icon];

          return (
            <div
              key={feature.title}
              className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)] p-4"
            >
              <div className="flex items-start gap-3">
                <span className="flex min-h-10 min-w-10 items-center justify-center rounded-md bg-[var(--color-action-muted)] text-[var(--color-action-primary)]">
                  <Icon aria-hidden="true" size={18} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function ProjectArchitectureFlow({ project }: { readonly project: Project }) {
  return (
    <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
      <h2 className="text-xl font-semibold">시스템 구조</h2>
      <ol className="mt-4 grid gap-3 lg:grid-cols-4">
        {project.architectureSteps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)] p-4"
          >
            <span className="text-xs font-semibold text-[var(--color-action-primary)]">
              {index + 1}단계
            </span>
            <h3 className="mt-2 text-sm font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ProjectToolList({ project }: { readonly project: Project }) {
  return (
    <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
      <h2 className="text-xl font-semibold">사용 도구와 역할</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {project.tools.map((tool) => (
          <div key={tool.name} className="rounded-lg border border-[var(--color-border-subtle)] p-4">
            <h3 className="text-sm font-semibold">{tool.name}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{tool.purpose}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProjectOutcomeList({ project }: { readonly project: Project }) {
  return (
    <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
      <h2 className="text-xl font-semibold">적용 결과</h2>
      <div className="mt-4 grid gap-3">
        {project.outcomes.map((outcome) => (
          <article key={`${outcome.type}-${outcome.title}`} className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)] p-4">
            <p className="text-xs font-semibold text-[var(--color-action-primary)]">
              {outcomeLabels[outcome.type]}
            </p>
            <h3 className="mt-2 text-sm font-semibold">{outcome.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              {outcome.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProjectLinkSections({ workflows, resources, relatedProjects }: ProjectLinkSectionsProps) {
  return (
    <>
      {workflows.length > 0 ? (
        <section id="project-workflows" className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
          <h2 className="text-xl font-semibold">핵심 Workflow</h2>
          <div className="mt-4 grid gap-3">
            {workflows.map((workflow) => (
              <Link key={workflow.id} href={`/workflows/${workflow.slug}`} className="grid gap-2 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)] p-4 hover:border-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]">
                <h3 className="text-base font-semibold">{workflow.title}</h3>
                <p className="text-sm leading-6 text-[var(--color-text-secondary)]">{workflow.summary}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {workflow.steps.length}단계 · {workflow.estimatedMinutes}분 · {WORKFLOW_DIFFICULTIES[workflow.difficulty]} · {workflow.tools.join(" · ")}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {resources.length > 0 ? (
        <section id="project-resources" className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
          <h2 className="text-xl font-semibold">시작하기 자료</h2>
          <div className="mt-4 grid gap-3">
            {resources.map((resource) => (
              <Link key={resource.id} href={`/resources/${resource.slug}`} className="grid gap-2 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)] p-4 hover:border-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]">
                <span className="w-fit rounded-md bg-[var(--color-action-muted)] px-2 py-1 text-xs font-semibold text-[var(--color-action-primary)]">
                  {RESOURCE_TYPES[resource.resourceType]}
                </span>
                <h3 className="text-base font-semibold">{resource.title}</h3>
                <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
                  {resource.tools.join(" · ")}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {relatedProjects.length > 0 ? (
        <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
          <h2 className="text-xl font-semibold">관련 프로젝트</h2>
          <div className="mt-4 grid gap-3">
            {relatedProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`} className="grid gap-2 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)] p-4 hover:border-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]">
                <p className="text-xs font-semibold text-[var(--color-action-primary)]">
                  {projectTypeLabel(project.projectType)} · {projectStatusLabel(project.status)}
                </p>
                <h3 className="text-base font-semibold">{project.title}</h3>
                <p className="text-sm leading-6 text-[var(--color-text-secondary)]">{project.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
