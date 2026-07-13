import { ArrowLeft, ArrowRight, CheckCircle2, LinkIcon, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { WorkflowTimeline } from "@/components/workflows/WorkflowTimeline";
import { RESOURCE_TYPES, type Resource } from "@/types/resource";
import { WORKFLOW_DIFFICULTIES, type WorkflowModel } from "@/types/workflow";

type WorkflowDetailPageProps = {
  readonly workflow: WorkflowModel;
  readonly resources: readonly Resource[];
  readonly relatedWorkflows: readonly WorkflowModel[];
};

const formatDate = (date: string): string => date.replaceAll("-", ".");

function SimpleList({
  title,
  items,
  tone = "default",
}: {
  readonly title: string;
  readonly items: readonly string[];
  readonly tone?: "default" | "caution";
}) {
  const Icon = tone === "caution" ? ShieldCheck : CheckCircle2;

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
                tone === "caution"
                  ? "mt-1 shrink-0 text-[var(--color-status-warning)]"
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

export function WorkflowDetailPage({
  workflow,
  resources,
  relatedWorkflows,
}: WorkflowDetailPageProps) {
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
          <Link
            href="/workflows"
            className="font-medium hover:text-[var(--color-action-primary)]"
          >
            AI Workflow
          </Link>
          <span aria-hidden="true" className="px-2">
            /
          </span>
          <span className="font-semibold text-[var(--color-text-primary)]">{workflow.title}</span>
        </nav>

        <section className="grid gap-5 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-5 shadow-[var(--shadow-subtle)] sm:p-6">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md bg-[var(--color-action-muted)] px-2 py-1 text-xs font-semibold text-[var(--color-action-primary)]">
              {workflow.category}
            </span>
            <span className="rounded-md border border-[var(--color-border-subtle)] px-2 py-1 text-xs font-medium text-[var(--color-text-secondary)]">
              {WORKFLOW_DIFFICULTIES[workflow.difficulty]}
            </span>
            <span className="rounded-md border border-[var(--color-border-subtle)] px-2 py-1 text-xs font-medium text-[var(--color-text-secondary)]">
              {workflow.estimatedMinutes}분
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-semibold leading-tight">{workflow.title}</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--color-text-secondary)]">
              {workflow.summary}
            </p>
            <p className="mt-4 text-sm leading-6 text-[var(--color-text-secondary)]">
              사용 AI {workflow.tools.join(" · ")} · 업데이트 {formatDate(workflow.updatedAt)}
            </p>
          </div>
          <Link
            href="/workflows"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-[var(--color-border-default)] px-4 text-sm font-semibold text-[var(--color-text-primary)] hover:border-[var(--color-action-primary)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)] sm:w-fit"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            목록으로 돌아가기
          </Link>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="grid gap-6">
            <SimpleList title="이 업무에서 해결하는 문제" items={workflow.problem} />
            <WorkflowTimeline steps={workflow.steps} resources={resources} />

            <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
              <h2 className="text-xl font-semibold">사용되는 AI</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {workflow.tools.map((tool) => (
                  <div
                    key={tool}
                    className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)] p-4"
                  >
                    <h3 className="text-sm font-semibold">{tool}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                      이 Workflow에서 {tool}는 자료 작성, 정리, 검토 중 필요한 단계에만 사용합니다.
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
              <h2 className="text-xl font-semibold">필요한 자료</h2>
              <div className="mt-4 grid gap-3">
                {resources.map((resource) => (
                  <Link
                    key={resource.id}
                    href={`/resources/${resource.slug}`}
                    className="grid gap-2 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)] p-4 transition-colors hover:border-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
                  >
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-md bg-[var(--color-action-muted)] px-2 py-1 text-xs font-semibold text-[var(--color-action-primary)]">
                        {RESOURCE_TYPES[resource.resourceType]}
                      </span>
                      {resource.tools.slice(0, 2).map((tool) => (
                        <span
                          key={tool}
                          className="rounded-md bg-[var(--color-surface-primary)] px-2 py-1 text-xs font-medium text-[var(--color-text-secondary)]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-base font-semibold">{resource.title}</h3>
                    <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
                      {resource.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            <SimpleList title="최종 결과" items={workflow.outputs} />
            <SimpleList title="주의사항" items={workflow.cautions} tone="caution" />
          </div>

          <aside className="grid gap-4">
            <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
              <h2 className="text-xl font-semibold">실제 적용 사례</h2>
              <dl className="mt-4 grid gap-3 text-sm text-[var(--color-text-secondary)]">
                <div>
                  <dt className="font-semibold text-[var(--color-text-primary)]">학교 유형</dt>
                  <dd className="mt-1">{workflow.example.schoolType}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[var(--color-text-primary)]">규모</dt>
                  <dd className="mt-1">{workflow.example.scale}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[var(--color-text-primary)]">상황</dt>
                  <dd className="mt-1 leading-6">{workflow.example.context}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[var(--color-text-primary)]">결과</dt>
                  <dd className="mt-1 leading-6">{workflow.example.result}</dd>
                </div>
              </dl>
            </section>

            {relatedWorkflows.length > 0 ? (
              <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
                <h2 className="text-xl font-semibold">관련 Workflow</h2>
                <div className="mt-4 grid gap-3">
                  {relatedWorkflows.map((relatedWorkflow) => (
                    <Link
                      key={relatedWorkflow.id}
                      href={`/workflows/${relatedWorkflow.slug}`}
                      className="grid gap-2 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)] p-3 hover:border-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
                    >
                      <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-action-primary)]">
                        <LinkIcon aria-hidden="true" size={14} />
                        {relatedWorkflow.category}
                      </div>
                      <h3 className="text-sm font-semibold">{relatedWorkflow.title}</h3>
                      <p className="text-xs leading-5 text-[var(--color-text-secondary)]">
                        {relatedWorkflow.summary}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}

            <Link
              href="/resources"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[var(--color-action-primary)] px-4 text-sm font-semibold text-white hover:bg-[var(--color-action-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
            >
              전체 Resource 보기
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
