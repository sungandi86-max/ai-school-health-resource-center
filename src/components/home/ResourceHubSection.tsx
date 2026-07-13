import { ArrowRight, BookOpen, ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import type { CmsChapter, CmsResource } from "@/types/cms";
import { ResourceCard } from "@/components/cms/ResourceCard";

type ChapterAccordionProps = {
  readonly chapter: CmsChapter;
  readonly isOpen: boolean;
  readonly onToggle: () => void;
  readonly onOpenDetails?: (resource: CmsResource) => void;
};

export function ChapterAccordion({ chapter, isOpen, onToggle, onOpenDetails }: ChapterAccordionProps) {
  const panelId = `${chapter.id}-panel`;
  const buttonId = `${chapter.id}-button`;

  return (
    <section className="rounded-[20px] bg-white shadow-[var(--shadow-card)]">
      <button
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 rounded-[20px] p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)] sm:p-6"
      >
        <span>
          <span className="text-xs font-semibold text-[var(--color-action-primary)]">
            Chapter {chapter.chapter}
          </span>
          <span className="mt-1 block text-xl font-semibold text-[var(--color-brand-primary)]">
            {chapter.title}
          </span>
          <span className="mt-2 block text-sm leading-6 text-[var(--color-text-secondary)]">
            {chapter.resources.length}개의 자료가 연결되어 있습니다.
          </span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`mt-1 size-5 shrink-0 text-[var(--color-text-tertiary)] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen ? (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="grid gap-4 border-t border-[var(--color-border-subtle)] px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
        >
          {chapter.resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              {...(onOpenDetails ? { onOpenDetails: () => onOpenDetails(resource) } : {})}
            />
          ))}
          <BookPages pages={chapter.pages} bookId={chapter.resources[0]?.bookId ?? "ai-work-automation"} />
        </div>
      ) : null}
    </section>
  );
}

export function EmptyResourceHubState({ onReset }: { readonly onReset: () => void }) {
  return (
    <section className="rounded-[20px] bg-white p-8 text-center shadow-[var(--shadow-card)]">
      <Search aria-hidden="true" className="mx-auto size-8 text-[var(--color-action-primary)]" />
      <h2 className="mt-4 text-xl font-semibold text-[var(--color-brand-primary)]">
        조건에 맞는 자료가 없습니다
      </h2>
      <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
        검색어를 줄이거나 필터를 전체로 바꿔보세요.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--color-brand-primary)] px-5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
      >
        검색 조건 초기화
      </button>
    </section>
  );
}

function BookPages({ pages, bookId }: { readonly pages: readonly string[]; readonly bookId: string }) {
  return (
    <aside className="rounded-2xl bg-white p-4 shadow-[var(--shadow-ring)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <BookOpen aria-hidden="true" className="mt-0.5 size-5 text-[var(--color-action-primary)]" />
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-brand-primary)]">
              책에서 이 자료를 사용하는 페이지
            </h3>
            <p className="mt-1 text-xs leading-5 text-[var(--color-text-secondary)]">
              페이지 번호는 이후 데이터만 수정하면 함께 갱신됩니다.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {pages.map((page) => (
            <span
              key={page}
              className="rounded-full bg-[var(--color-action-muted)] px-3 py-1.5 text-xs font-semibold text-[var(--color-brand-primary)]"
            >
              {page}
            </span>
          ))}
        </div>
      </div>
      <Link
        href={`/book/${bookId}`}
        className="mt-4 inline-flex min-h-10 items-center text-sm font-semibold text-[var(--color-action-primary)] hover:text-[var(--color-action-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
      >
        전자책 연계 자료 보기
        <ArrowRight aria-hidden="true" className="ml-1 size-4" />
      </Link>
    </aside>
  );
}
