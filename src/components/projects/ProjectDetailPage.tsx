import { ArrowLeft, ExternalLink, GitBranch, Library, ListChecks } from "lucide-react";
import Link from "next/link";
import {
  ProjectArchitectureFlow,
  ProjectComparison,
  ProjectDetailList,
  ProjectFeatureGrid,
  ProjectLinkSections,
  ProjectOutcomeList,
  ProjectToolList,
} from "@/components/projects/ProjectDetailBlocks";
import type { Project } from "@/types/project";
import type { Resource } from "@/types/resource";
import type { WorkflowModel } from "@/types/workflow";
import { projectStatusLabel, projectTypeLabel } from "@/lib/projectLabels";

type ProjectDetailPageProps = {
  readonly project: Project;
  readonly workflows: readonly WorkflowModel[];
  readonly resources: readonly Resource[];
  readonly relatedProjects: readonly Project[];
};

const formatDate = (date: string): string => date.replaceAll("-", ".");

const gettingStartedSteps = [
  "관련 Workflow를 확인합니다.",
  "필요한 Prompt와 Template을 준비합니다.",
  "샘플 데이터로 먼저 테스트합니다.",
  "학교 환경에 맞게 수정합니다.",
  "개인정보 처리 방식을 검토합니다.",
] as const;

export function ProjectDetailPage({
  project,
  workflows,
  resources,
  relatedProjects,
}: ProjectDetailPageProps) {
  return (
    <main className="min-h-dvh bg-[var(--color-surface-subtle)] px-5 py-8 text-[var(--color-text-primary)] sm:py-10">
      <div className="mx-auto grid w-full max-w-6xl gap-6">
        <nav aria-label="Breadcrumb" className="text-sm text-[var(--color-text-secondary)]">
          <Link href="/" className="font-medium hover:text-[var(--color-action-primary)]">
            홈
          </Link>
          <span aria-hidden="true" className="px-2">
            /
          </span>
          <Link href="/projects" className="font-medium hover:text-[var(--color-action-primary)]">
            프로젝트 사례
          </Link>
          <span aria-hidden="true" className="px-2">
            /
          </span>
          <span className="font-semibold text-[var(--color-text-primary)]">{project.title}</span>
        </nav>

        <section className="grid gap-5 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-5 shadow-[var(--shadow-subtle)] sm:p-6">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md bg-[var(--color-action-muted)] px-2 py-1 text-xs font-semibold text-[var(--color-action-primary)]">
              {projectTypeLabel(project.projectType)}
            </span>
            <span className="rounded-md bg-[var(--color-status-success-muted)] px-2 py-1 text-xs font-semibold text-[var(--color-status-success)]">
              {projectStatusLabel(project.status)}
            </span>
            <span className="rounded-md border border-[var(--color-border-subtle)] px-2 py-1 text-xs font-medium text-[var(--color-text-secondary)]">
              v{project.version}
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-semibold leading-tight">{project.title}</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--color-text-secondary)]">
              {project.summary}
            </p>
            <p className="mt-4 text-sm leading-6 text-[var(--color-text-secondary)]">
              대상 {project.targetUsers.join(" · ")} · 분야 {project.categories.join(" · ")}
            </p>
            <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
              공개 {project.publishedAt ? formatDate(project.publishedAt) : "준비 중"} · 업데이트{" "}
              {formatDate(project.updatedAt)} · 도구 {project.tools.map((tool) => tool.name).join(" · ")}
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-[auto_auto_1fr]">
            <Link
              href="#project-workflows"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[var(--color-action-primary)] px-4 text-sm font-semibold text-white hover:bg-[var(--color-action-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
            >
              <GitBranch aria-hidden="true" size={16} />
              관련 Workflow 보기
            </Link>
            <Link
              href="#project-resources"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[var(--color-border-default)] px-4 text-sm font-semibold text-[var(--color-text-primary)] hover:border-[var(--color-action-primary)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
            >
              <Library aria-hidden="true" size={16} />
              관련 자료 보기
            </Link>
            <Link
              href="/projects"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[var(--color-border-default)] px-4 text-sm font-semibold text-[var(--color-text-primary)] hover:border-[var(--color-action-primary)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
            >
              <ArrowLeft aria-hidden="true" size={16} />
              프로젝트 목록으로
            </Link>
          </div>
          {project.externalUrl ? (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-[var(--color-border-default)] px-4 text-sm font-semibold text-[var(--color-text-primary)] hover:border-[var(--color-action-primary)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)] sm:w-fit"
            >
              프로젝트 살펴보기
              <ExternalLink aria-hidden="true" size={15} />
              <span className="sr-only">새 창에서 열림</span>
            </a>
          ) : null}
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="grid gap-6">
            <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
              <h2 className="text-xl font-semibold">프로젝트 개요</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
                {project.overview}
              </p>
            </section>
            <ProjectDetailList title="이 프로젝트가 해결하려던 문제" items={project.problems} />
            <ProjectDetailList title="개선 목표" items={project.goals} />
            <ProjectComparison beforeItems={project.beforeItems} afterItems={project.afterItems} />
            <ProjectFeatureGrid project={project} />
            <ProjectArchitectureFlow project={project} />
            <ProjectToolList project={project} />
            <ProjectDetailList title="개인정보 보호 설계" items={project.privacyPrinciples} tone="privacy" />
            <ProjectOutcomeList project={project} />
            <ProjectDetailList title="적용 가능한 환경" items={project.recommendedFor} />
            <ProjectDetailList title="시작하기" items={gettingStartedSteps} />
            <ProjectLinkSections workflows={workflows} resources={resources} relatedProjects={relatedProjects} />
          </div>

          <aside className="grid gap-4">
            {project.example ? (
              <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
                <p className="w-fit rounded-md bg-[var(--color-action-muted)] px-2 py-1 text-xs font-semibold text-[var(--color-action-primary)]">
                  가상 적용 예시
                </p>
                <h2 className="mt-3 text-xl font-semibold">프로젝트 적용 사례</h2>
                <dl className="mt-4 grid gap-3 text-sm text-[var(--color-text-secondary)]">
                  <div>
                    <dt className="font-semibold text-[var(--color-text-primary)]">환경</dt>
                    <dd className="mt-1 leading-6">{project.example.environment.join(" · ")}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[var(--color-text-primary)]">상황</dt>
                    <dd className="mt-1 leading-6">{project.example.situation}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[var(--color-text-primary)]">적용</dt>
                    <dd className="mt-1 leading-6">{project.example.application}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[var(--color-text-primary)]">결과</dt>
                    <dd className="mt-1 leading-6">{project.example.result}</dd>
                  </div>
                </dl>
              </section>
            ) : null}

            <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
              <h2 className="text-xl font-semibold">변경 이력</h2>
              <div className="mt-4 grid gap-3">
                {(project.revisions ?? [
                  {
                    version: project.version,
                    date: project.updatedAt,
                    description: "현재 버전 정보입니다.",
                  },
                ]).map((revision) => (
                  <article key={`${revision.version}-${revision.date}`} className="grid gap-1">
                    <h3 className="text-sm font-semibold">
                      v{revision.version} · {formatDate(revision.date)}
                    </h3>
                    <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
                      {revision.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
              <h2 className="text-xl font-semibold">적용 전 확인</h2>
              <ul className="mt-4 grid gap-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                <li className="flex gap-2">
                  <ListChecks aria-hidden="true" size={16} className="mt-1 shrink-0 text-[var(--color-action-primary)]" />
                  실제 학생 및 교직원의 개인정보를 샘플 데이터에 넣지 마세요.
                </li>
                <li className="flex gap-2">
                  <ListChecks aria-hidden="true" size={16} className="mt-1 shrink-0 text-[var(--color-action-primary)]" />
                  학교 규정과 최신 공식 지침을 먼저 확인하세요.
                </li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
