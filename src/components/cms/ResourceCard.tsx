import { FileText } from "lucide-react";
import { DownloadButton } from "@/components/cms/DownloadButton";
import { TagBadge } from "@/components/cms/TagBadge";
import {
  formatCmsDate,
  getCategoryLabel,
  getResourceStatusLabel,
  isDownloadableStatus,
} from "@/lib/cms";
import type { CmsResource } from "@/types/cms";

type ResourceCardProps = {
  readonly resource: CmsResource;
  readonly onOpenDetails?: () => void;
};

export function ResourceCard({ resource, onOpenDetails }: ResourceCardProps) {
  const statusTone = isDownloadableStatus(resource.status) ? "green" : "gray";
  const cardContent = (
    <>
      <span className="flex flex-wrap items-center gap-2">
        <TagBadge tone="blue">{getCategoryLabel(resource.category)}</TagBadge>
        {resource.isNew ? <TagBadge tone="green">NEW</TagBadge> : null}
        {resource.isUpdated ? <TagBadge tone="green">UPDATED</TagBadge> : null}
        {resource.isFeatured ? <TagBadge tone="blue">추천</TagBadge> : null}
        <TagBadge tone={statusTone}>{getResourceStatusLabel(resource.status)}</TagBadge>
        <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-[var(--color-action-primary)] shadow-[var(--shadow-ring)]">
          <FileText aria-hidden="true" className="size-3.5" />
          {resource.fileType}
        </span>
      </span>
      <span className="mt-3 block text-base font-semibold text-[var(--color-brand-primary)]">
        {resource.title}
      </span>
      <span className="mt-1 block text-sm leading-6 text-[var(--color-text-secondary)]">
        {resource.description}
      </span>
      <span className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--color-text-tertiary)]">
        <span>{resource.version}</span>
        <span>{formatCmsDate(resource.updatedAt)}</span>
        <span>{resource.fileSize || "파일 크기 미정"}</span>
        <span>{resource.downloadCount.toLocaleString("ko-KR")}회</span>
      </span>
      <span className="mt-3 flex flex-wrap gap-1.5">
        {resource.tags.slice(0, 3).map((tag) => (
          <TagBadge key={`${resource.id}-${tag}`}>{tag}</TagBadge>
        ))}
        {resource.tags.length > 3 ? <TagBadge>{`+${resource.tags.length - 3}`}</TagBadge> : null}
      </span>
    </>
  );

  return (
    <article className="rounded-2xl bg-[var(--color-surface-muted)] p-4 shadow-[var(--shadow-ring)] sm:grid sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-4">
      {onOpenDetails ? (
        <button
          type="button"
          onClick={onOpenDetails}
          aria-label={`${resource.title} 상세 보기`}
          className="min-w-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
        >
          {cardContent}
        </button>
      ) : (
        <div>{cardContent}</div>
      )}
      <div className="mt-4 grid gap-2 sm:mt-0 sm:min-w-[148px]">
        {onOpenDetails ? (
          <button
            type="button"
            onClick={onOpenDetails}
            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[var(--color-border-default)] px-3 text-sm font-semibold text-[var(--color-brand-primary)] transition hover:border-[var(--color-action-primary)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
          >
            상세 보기
          </button>
        ) : null}
        <DownloadButton
          resourceId={resource.id}
          resourceTitle={resource.title}
          download={resource}
          className="w-full"
        />
      </div>
    </article>
  );
}
