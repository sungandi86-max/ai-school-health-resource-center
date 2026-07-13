import { ArrowLeft, ExternalLink, ListChecks } from "lucide-react";
import Link from "next/link";
import type { Template } from "@/types/template";
import { TemplateActionIcon } from "@/components/templates/TemplateActionIcon";
import {
  templateActionMeta,
  templateDifficultyLabel,
  templatePrimaryActionLabel,
  templateTypeLabel,
} from "@/lib/templateLabels";

type TemplateDetailPageProps = {
  readonly template: Template;
};

const formatDate = (date: string): string => date.replaceAll("-", ".");

const getActionHref = (template: Template): string | undefined => template.copyUrl ?? template.downloadUrl;

const isExternalHref = (href: string): boolean => href.startsWith("https://");

function InfoList({
  title,
  items,
}: {
  readonly title: string;
  readonly items: readonly string[];
}) {
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

function PrimaryAction({ template }: TemplateDetailPageProps) {
  const href = getActionHref(template);
  const action = templateActionMeta(template.templateType);

  if (!href) {
    return (
      <button
        type="button"
        disabled
        aria-label={`${template.title} ${action.detailLabel}`}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[var(--color-surface-muted)] px-4 text-sm font-semibold text-[var(--color-text-tertiary)]"
      >
        <TemplateActionIcon kind={action.icon} size={17} />
        준비 중
      </button>
    );
  }

  const external = isExternalHref(href);

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[var(--color-status-success)] px-4 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-status-success-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-status-success)]"
    >
      <TemplateActionIcon kind={action.icon} size={17} />
      {templatePrimaryActionLabel(template.templateType)}
      {external ? <ExternalLink aria-hidden="true" size={15} /> : null}
    </a>
  );
}

export function TemplateDetailPage({ template }: TemplateDetailPageProps) {
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
          <Link href="/templates" className="font-medium hover:text-[var(--color-action-primary)]">
            템플릿 자료실
          </Link>
          <span aria-hidden="true" className="px-2">
            /
          </span>
          <span className="font-semibold text-[var(--color-text-primary)]">{template.title}</span>
        </nav>

        <section className="grid gap-5 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-5 shadow-[var(--shadow-subtle)] sm:p-6">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md bg-[var(--color-action-muted)] px-2 py-1 text-xs font-semibold text-[var(--color-action-primary)]">
              {templateTypeLabel(template.templateType)}
            </span>
            <span className="rounded-md border border-[var(--color-border-subtle)] px-2 py-1 text-xs font-medium text-[var(--color-text-secondary)]">
              {template.category}
            </span>
            <span className="rounded-md border border-[var(--color-border-subtle)] px-2 py-1 text-xs font-medium text-[var(--color-text-secondary)]">
              {templateDifficultyLabel(template.difficulty)}
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-semibold leading-tight">{template.title}</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--color-text-secondary)]">
              {template.summary}
            </p>
            <p className="mt-4 text-sm leading-6 text-[var(--color-text-secondary)]">
              v{template.version} · 업데이트 {formatDate(template.updatedAt)} · {template.tools.join(" · ")}
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <PrimaryAction template={template} />
            <Link
              href="/templates"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[var(--color-border-default)] px-4 text-sm font-semibold text-[var(--color-text-primary)] hover:border-[var(--color-action-primary)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
            >
              <ArrowLeft aria-hidden="true" size={16} />
              목록으로 돌아가기
            </Link>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="grid gap-6">
            <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
              <h2 className="text-xl font-semibold">자료 소개</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
                {template.description}
              </p>
            </section>
            <InfoList title="언제 사용하나요" items={[template.summary, `${template.category} 업무를 정리할 때`, "가상 데이터로 먼저 구조를 점검할 때"]} />
            <InfoList title="사용 대상" items={["보건교사", "AI 업무 자동화 강의 수강자", "전자책 연계 자료를 활용하는 사용자"]} />
            <InfoList title="포함 파일" items={template.includedFiles} />
            <InfoList title="사용 방법" items={template.usage} />
            <InfoList title="주의사항" items={template.cautions} />
          </div>

          <aside className="grid gap-4">
            <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
              <h2 className="text-xl font-semibold">다운로드 카드</h2>
              <dl className="mt-4 grid gap-3 text-sm text-[var(--color-text-secondary)]">
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold text-[var(--color-text-primary)]">자료 유형</dt>
                  <dd>{templateTypeLabel(template.templateType)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold text-[var(--color-text-primary)]">파일 크기</dt>
                  <dd>{template.fileSize}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold text-[var(--color-text-primary)]">다운로드</dt>
                  <dd>{template.downloadCount.toLocaleString("ko-KR")}회</dd>
                </div>
              </dl>
              <div className="mt-5">
                <PrimaryAction template={template} />
              </div>
              <p className="mt-3 text-xs leading-5 text-[var(--color-text-tertiary)]">
                Google Drive 연결은 다음 버전에서 실제 복사 URL로 교체할 예정입니다.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
