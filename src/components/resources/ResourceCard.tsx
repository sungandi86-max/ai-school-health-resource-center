import { ArrowRight, Eye } from "lucide-react";
import Link from "next/link";
import { DIFFICULTIES, RESOURCE_TYPES, type Resource } from "@/types/resource";

type ResourceCardProps = {
  readonly resource: Resource;
};

const formatDate = (date: string): string => date.replaceAll("-", ".");

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)]">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-md bg-[var(--color-action-muted)] px-2 py-1 text-xs font-semibold text-[var(--color-action-primary)]">
          {RESOURCE_TYPES[resource.resourceType]}
        </span>
        {resource.relatedBook ? (
          <span className="rounded-md bg-[var(--color-status-success-muted)] px-2 py-1 text-xs font-semibold text-[var(--color-status-success)]">
            전자책 연계
          </span>
        ) : null}
        {resource.tools.slice(0, 2).map((tool) => (
          <span
            key={tool}
            className="rounded-md border border-[var(--color-border-subtle)] px-2 py-1 text-xs font-medium text-[var(--color-text-secondary)]"
          >
            {tool}
          </span>
        ))}
      </div>

      <div className="mt-4 grid gap-2">
        <h3 className="text-lg font-semibold leading-snug text-[var(--color-text-primary)]">
          {resource.title}
        </h3>
        <p className="text-sm leading-6 text-[var(--color-text-secondary)]">{resource.summary}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {resource.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-[var(--color-surface-muted)] px-2 py-1 text-xs text-[var(--color-text-secondary)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto grid gap-3 pt-5">
        <p className="text-xs text-[var(--color-text-secondary)]">
          {DIFFICULTIES[resource.difficulty]} · 업데이트 {formatDate(resource.updatedAt)}
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/resources/${resource.slug}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[var(--color-border-default)] px-3 text-sm font-semibold text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-action-primary)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
          >
            <Eye aria-hidden="true" size={16} />
            미리보기
          </Link>
          <Link
            href={`/resources/${resource.slug}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[var(--color-status-success)] px-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-status-success-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-status-success)]"
          >
            자세히 보기
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
