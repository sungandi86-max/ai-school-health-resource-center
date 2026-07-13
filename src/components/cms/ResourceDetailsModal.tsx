"use client";

import { BookOpen, CalendarDays, FileText, History, X } from "lucide-react";
import type { MouseEvent } from "react";
import { useEffect, useRef } from "react";
import { DownloadButton } from "@/components/cms/DownloadButton";
import { TagBadge } from "@/components/cms/TagBadge";
import { formatCmsDate, getBookById, getCategoryLabel, getResourceStatusLabel } from "@/lib/cms";
import type { CmsResource } from "@/types/cms";

type ResourceDetailsModalProps = {
  readonly resource: CmsResource;
  readonly onClose: () => void;
};

export function ResourceDetailsModal({ resource, onClose }: ResourceDetailsModalProps) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const book = getBookById(resource.bookId);
  const titleId = `resource-details-title-${resource.id}`;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousActiveElement = document.activeElement;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = getFocusableElements(dialogRef.current);
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);
      if (!firstElement || !lastElement) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus();
      }
    };
  }, [onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(24,59,102,0.22)] p-0 sm:items-center sm:p-6"
      onClick={handleBackdropClick}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-[24px] bg-white p-5 shadow-[var(--shadow-card)] sm:rounded-[24px] sm:p-7"
      >
        <header className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap gap-2">
              <TagBadge tone="blue">{getCategoryLabel(resource.category)}</TagBadge>
              <TagBadge tone="gray">{resource.fileType}</TagBadge>
              <TagBadge tone={resource.status === "coming-soon" ? "gray" : "green"}>
                {getResourceStatusLabel(resource.status)}
              </TagBadge>
            </div>
            <h2 id={titleId} className="mt-4 text-2xl font-semibold leading-tight text-[var(--color-brand-primary)]">
              {resource.title}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="자료 상세 닫기"
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl text-[var(--color-text-secondary)] transition hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-brand-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </header>

        <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">{resource.description}</p>

        <dl className="mt-5 grid gap-3 sm:grid-cols-4">
          <MetaItem icon={History} label="버전" value={resource.version} />
          <MetaItem icon={CalendarDays} label="업데이트" value={formatCmsDate(resource.updatedAt)} />
          <MetaItem icon={FileText} label="파일 크기" value={resource.fileSize || "준비 중"} />
          <MetaItem icon={BookOpen} label="Chapter" value={`Chapter ${resource.chapter}`} />
        </dl>

        {book ? (
          <div className="mt-5 rounded-2xl bg-[var(--color-action-muted)] p-4">
            <p className="text-xs font-semibold text-[var(--color-action-primary)]">연결된 전자책</p>
            <p className="mt-1 text-sm font-semibold text-[var(--color-brand-primary)]">{book.title}</p>
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          {resource.tags.map((tag) => (
            <TagBadge key={`${resource.id}-detail-${tag}`}>{tag}</TagBadge>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
          <div>
            <p className="text-sm font-semibold text-[var(--color-brand-primary)]">최신 버전</p>
            <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
              기본 다운로드는 항상 현재 데이터에 지정된 최신 파일을 제공합니다.
            </p>
          </div>
          <DownloadButton resourceId={resource.id} resourceTitle={resource.title} download={resource} />
        </div>

        {resource.previousVersions.length > 0 ? (
          <details className="mt-6 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)] p-4">
            <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--color-brand-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]">
              버전 기록 보기 ({resource.previousVersions.length})
            </summary>
            <div className="mt-4 grid gap-3">
              {resource.previousVersions.map((version) => (
                <div
                  key={`${resource.id}-${version.version}`}
                  className="grid gap-3 rounded-xl bg-white p-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
                >
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-brand-primary)]">
                      {version.version} · {formatCmsDate(version.updatedAt)} · {version.fileType}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[var(--color-text-secondary)]">
                      {version.changeNote}
                    </p>
                  </div>
                  <DownloadButton
                    resourceId={resource.id}
                    resourceTitle={`${resource.title} ${version.version}`}
                    download={version}
                    label="이전 버전 다운로드"
                  />
                </div>
              ))}
            </div>
          </details>
        ) : null}
      </section>
    </div>
  );
}

function getFocusableElements(container: HTMLElement | null): HTMLElement[] {
  if (!container) {
    return [];
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), summary, input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
}

type MetaItemProps = {
  readonly icon: typeof History;
  readonly label: string;
  readonly value: string;
};

function MetaItem({ icon: Icon, label, value }: MetaItemProps) {
  return (
    <div className="rounded-xl bg-[var(--color-surface-muted)] p-3">
      <dt className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-tertiary)]">
        <Icon aria-hidden="true" className="size-3.5" />
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold text-[var(--color-brand-primary)]">{value}</dd>
    </div>
  );
}
