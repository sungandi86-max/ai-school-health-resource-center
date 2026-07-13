import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Template } from "@/types/template";
import { TemplateActionIcon } from "@/components/templates/TemplateActionIcon";
import {
  templateActionMeta,
  templateDifficultyLabel,
  templateTypeLabel,
} from "@/lib/templateLabels";

type TemplateCardProps = {
  readonly template: Template;
};

const formatDate = (date: string): string => date.replaceAll("-", ".");

const getActionHref = (template: Template): string =>
  template.copyUrl ?? template.downloadUrl ?? `/templates/${template.slug}`;

export function TemplateCard({ template }: TemplateCardProps) {
  const action = templateActionMeta(template.templateType);
  const actionHref = getActionHref(template);

  return (
    <article className="flex h-full flex-col rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)]">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-md bg-[var(--color-action-muted)] px-2 py-1 text-xs font-semibold text-[var(--color-action-primary)]">
          {templateTypeLabel(template.templateType)}
        </span>
        <span className="rounded-md bg-[var(--color-surface-muted)] px-2 py-1 text-xs font-medium text-[var(--color-text-secondary)]">
          {template.category}
        </span>
        <span className="rounded-md border border-[var(--color-border-subtle)] px-2 py-1 text-xs font-medium text-[var(--color-text-secondary)]">
          {templateDifficultyLabel(template.difficulty)}
        </span>
      </div>

      <div className="mt-4 grid gap-2">
        <h3 className="text-lg font-semibold leading-snug text-[var(--color-text-primary)]">
          {template.title}
        </h3>
        <p className="text-sm leading-6 text-[var(--color-text-secondary)]">{template.summary}</p>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 rounded-md bg-[var(--color-surface-muted)] p-3 text-xs text-[var(--color-text-secondary)]">
        <div>
          <dt className="font-semibold text-[var(--color-text-primary)]">업데이트</dt>
          <dd className="mt-1">{formatDate(template.updatedAt)}</dd>
        </div>
        <div>
          <dt className="font-semibold text-[var(--color-text-primary)]">파일 크기</dt>
          <dd className="mt-1">{template.fileSize}</dd>
        </div>
        <div>
          <dt className="font-semibold text-[var(--color-text-primary)]">다운로드</dt>
          <dd className="mt-1">{template.downloadCount.toLocaleString("ko-KR")}회</dd>
        </div>
        <div>
          <dt className="font-semibold text-[var(--color-text-primary)]">버전</dt>
          <dd className="mt-1">v{template.version}</dd>
        </div>
      </dl>

      <div className="mt-auto grid gap-3 pt-5">
        <p className="text-xs text-[var(--color-text-secondary)]">{template.tools.join(" · ")}</p>
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/templates/${template.slug}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[var(--color-border-default)] px-3 text-sm font-semibold text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-action-primary)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
          >
            자세히
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
          <a
            href={actionHref}
            download={template.downloadUrl ? true : undefined}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[var(--color-status-success)] px-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-status-success-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-status-success)]"
          >
            <TemplateActionIcon kind={action.icon} />
            {action.cardLabel}
          </a>
        </div>
      </div>
    </article>
  );
}
