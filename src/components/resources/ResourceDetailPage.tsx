import { ArrowLeft, BookOpen, GitBranch, ListChecks } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Resource } from "@/types/resource";
import { CopyResourceButton } from "@/components/resources/CopyResourceButton";
import { RelatedResourceList } from "@/components/resources/RelatedResourceList";
import { ResourceContentPanel } from "@/components/resources/ResourceContentPanel";
import { ResourceExampleOutput } from "@/components/resources/ResourceExampleOutput";
import { ResourceRevisionList } from "@/components/resources/ResourceRevisionList";
import { ResourceVariableList } from "@/components/resources/ResourceVariableList";
import { difficultyLabel, resourceTypeLabel } from "@/lib/resourceLabels";

type ResourceDetailPageProps = {
  readonly resource: Resource;
  readonly relatedResources: readonly Resource[];
};

const commonCautions = [
  "실제 학생 및 교직원의 개인정보를 입력하지 마세요.",
  "AI가 작성한 날짜, 법령, 기관명은 다시 확인하세요.",
  "학교 규정과 최신 공식 지침을 우선 적용하세요.",
  "최종 발송 또는 제출 전 사람이 검토하세요.",
] as const;

const formatDate = (date: string): string => date.replaceAll("-", ".");

const workflowHref = (relatedResources: readonly Resource[]): string => {
  const workflowResource = relatedResources.find((resource) => resource.resourceType === "workflow");
  return workflowResource ? `/resources/${workflowResource.slug}` : "/workflows";
};

function Badge({ children }: { readonly children: ReactNode }) {
  return (
    <span className="rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-surface-primary)] px-2 py-1 text-xs font-semibold text-[var(--color-text-secondary)]">
      {children}
    </span>
  );
}

function ListSection({
  title,
  items,
}: {
  readonly title: string;
  readonly items: readonly string[];
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
      <h2 className="text-xl font-semibold">{title}</h2>
      <ul className="mt-4 grid gap-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--color-text-secondary)]">
            <ListChecks
              aria-hidden="true"
              size={17}
              className="mt-1 shrink-0 text-[var(--color-action-primary)]"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function UsageSteps({ steps }: { readonly steps: readonly string[] }) {
  if (steps.length === 0) {
    return null;
  }

  return (
    <section className="grid gap-4" aria-labelledby="usage-steps-title">
      <div>
        <h2 id="usage-steps-title" className="text-xl font-semibold">
          사용 방법
        </h2>
        <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
          복사 후 바로 붙여넣기 전에 변수와 사실관계를 확인합니다.
        </p>
      </div>
      <ol className="grid gap-3">
        {steps.map((step, index) => (
          <li
            key={step}
            className="flex gap-3 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)]"
          >
            <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-md bg-[var(--color-action-muted)] text-sm font-semibold text-[var(--color-action-primary)]">
              {index + 1}
            </span>
            <p className="text-sm leading-6 text-[var(--color-text-secondary)]">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function CautionSection({ cautions }: { readonly cautions: readonly string[] }) {
  return (
    <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
      <h2 className="text-xl font-semibold">주의사항</h2>
      <ul className="mt-4 grid gap-2 border-l-4 border-[var(--color-status-warning)] pl-4">
        {cautions.map((caution) => (
          <li key={caution} className="text-sm leading-6 text-[var(--color-text-secondary)]">
            {caution}
          </li>
        ))}
      </ul>
    </section>
  );
}

function BookCard({ resource }: { readonly resource: Resource }) {
  if (!resource.relatedBook) {
    return null;
  }

  return (
    <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
      <div className="flex gap-3">
        <span className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-md bg-[var(--color-action-muted)] text-[var(--color-action-primary)]">
          <BookOpen aria-hidden="true" size={22} />
        </span>
        <div>
          <h2 className="text-lg font-semibold">『보건교사를 위한 AI 업무 자동화』</h2>
          {resource.relatedBook.chapterTitle ? (
            <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
              {resource.relatedBook.chapterId?.replace("chapter-", "Chapter ")}.{" "}
              {resource.relatedBook.chapterTitle}
            </p>
          ) : null}
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
            책에서는 이 자료를 활용하는 전체 업무 흐름을 설명합니다.
          </p>
          <Link
            href="/book/ai-work-automation"
            className="mt-3 inline-flex min-h-11 items-center rounded-md text-sm font-semibold text-[var(--color-action-primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
          >
            전자책 연계 자료 보기
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ResourceDetailPage({ resource, relatedResources }: ResourceDetailPageProps) {
  const copyText = resource.content ?? resource.summary;
  const cautions = [...commonCautions, ...(resource.cautions ?? [])];
  const content = resource.content;

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
          <Link href="/resources" className="font-medium hover:text-[var(--color-action-primary)]">
            자료 찾기
          </Link>
          <span aria-hidden="true" className="px-2">
            /
          </span>
          <span className="block truncate font-semibold text-[var(--color-text-primary)] sm:inline">
            {resource.title}
          </span>
        </nav>

        <section className="grid gap-5 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-5 shadow-[var(--shadow-subtle)] sm:p-6">
          <div className="flex flex-wrap gap-2">
            <Badge>{resourceTypeLabel(resource.resourceType)}</Badge>
            {resource.tools.slice(0, 2).map((tool) => (
              <Badge key={tool}>{tool}</Badge>
            ))}
            <Badge>{difficultyLabel(resource.difficulty)}</Badge>
            {resource.relatedBook ? <Badge>전자책 연계</Badge> : null}
          </div>
          <div>
            <h1 className="text-3xl font-semibold leading-tight">{resource.title}</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--color-text-secondary)]">
              {resource.summary}
            </p>
            <p className="mt-4 text-sm leading-6 text-[var(--color-text-secondary)]">
              최근 업데이트 {formatDate(resource.updatedAt)} · v{resource.version} · 예상 사용 시간{" "}
              {resource.estimatedMinutes ?? 5}분
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-[1fr_auto_auto]">
            <CopyResourceButton text={copyText} className="w-full" />
            <Link
              href="/resources"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[var(--color-border-default)] px-4 text-sm font-semibold text-[var(--color-text-primary)] hover:border-[var(--color-action-primary)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
            >
              <ArrowLeft aria-hidden="true" size={16} />
              목록으로 돌아가기
            </Link>
            <Link
              href={workflowHref(relatedResources)}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold text-[var(--color-action-primary)] hover:bg-[var(--color-action-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
            >
              <GitBranch aria-hidden="true" size={16} />
              관련 Workflow 보기
            </Link>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="grid gap-6">
            <ListSection title="이런 업무에 사용합니다" items={resource.useCases ?? []} />
            <ListSection title="사용 전 준비" items={resource.preparationItems ?? []} />
            {content ? <ResourceContentPanel title={resource.title} content={content} /> : null}
            <ResourceVariableList variables={resource.variables ?? []} />
            <UsageSteps steps={resource.usageSteps ?? []} />
            {resource.exampleOutput ? <ResourceExampleOutput output={resource.exampleOutput} /> : null}
            <CautionSection cautions={cautions} />
            <RelatedResourceList resources={relatedResources} />
          </div>

          <aside className="grid gap-4">
            <BookCard resource={resource} />
            <ResourceRevisionList resource={resource} />
          </aside>
        </div>

        <section className="grid gap-2 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:grid-cols-3 sm:p-5">
          <CopyResourceButton text={copyText} className="w-full" />
          <Link
            href="/resources"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-[var(--color-border-default)] px-4 text-sm font-semibold text-[var(--color-text-primary)] hover:border-[var(--color-action-primary)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
          >
            자료 목록으로
          </Link>
          {relatedResources.length > 0 ? (
            <a
              href="#related-resources-title"
              className="inline-flex min-h-12 items-center justify-center rounded-md px-4 text-sm font-semibold text-[var(--color-action-primary)] hover:bg-[var(--color-action-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
            >
              관련 자료 보기
            </a>
          ) : (
            <Link
              href="/resources"
              className="inline-flex min-h-12 items-center justify-center rounded-md px-4 text-sm font-semibold text-[var(--color-action-primary)] hover:bg-[var(--color-action-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
            >
              다른 자료 보기
            </Link>
          )}
        </section>
      </div>
    </main>
  );
}
