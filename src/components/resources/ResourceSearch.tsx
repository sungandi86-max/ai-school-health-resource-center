"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

const suggestedQueries = [
  "가정통신문",
  "결핵검진",
  "Google Sheets",
  "온라인 보건실",
  "전자책",
  "Workflow",
] as const;

type ResourceSearchProps = {
  readonly query: string;
  readonly activeFilterCount: number;
  readonly isMobileFilterOpen: boolean;
  readonly onQueryChange: (query: string) => void;
  readonly onOpenMobileFilter: () => void;
};

export function ResourceSearch({
  query,
  activeFilterCount,
  isMobileFilterOpen,
  onQueryChange,
  onOpenMobileFilter,
}: ResourceSearchProps) {
  return (
    <section
      aria-labelledby="resource-search-title"
      className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5"
    >
      <div className="grid gap-4">
        <div>
          <h2 id="resource-search-title" className="text-xl font-semibold">
            자료 검색
          </h2>
          <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
            제목, 업무명, 도구, 태그를 함께 검색합니다.
          </p>
        </div>

        <div className="grid gap-3">
          <label className="sr-only" htmlFor="resource-explorer-search">
            자료 제목, 업무명, 도구 또는 태그 검색
          </label>
          <div className="flex min-h-14 items-center gap-2 rounded-md border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] px-3 focus-within:border-[var(--color-action-primary)] focus-within:ring-2 focus-within:ring-[var(--color-focus-ring)]">
            <Search aria-hidden="true" size={18} className="text-[var(--color-action-primary)]" />
            <input
              id="resource-explorer-search"
              type="search"
              value={query}
              onChange={(event) => {
                onQueryChange(event.target.value);
              }}
              placeholder="자료 제목, 업무명, 도구 또는 태그를 검색하세요"
              className="min-h-12 w-full bg-transparent text-base text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-tertiary)]"
            />
            {query.length > 0 ? (
              <button
                type="button"
                aria-label="검색어 지우기"
                className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
                onClick={() => {
                  onQueryChange("");
                }}
              >
                <X aria-hidden="true" size={17} />
              </button>
            ) : null}
          </div>
        </div>

        <div className="grid gap-2" aria-label="추천 검색어">
          <p className="text-xs font-semibold text-[var(--color-text-secondary)]">추천 검색어</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.map((suggestedQuery) => (
              <button
                key={suggestedQuery}
                type="button"
                className="min-h-10 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)] px-3 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-action-primary)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
                onClick={() => {
                  onQueryChange(suggestedQuery);
                }}
              >
                {suggestedQuery}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[var(--color-border-default)] px-4 text-sm font-semibold text-[var(--color-text-primary)] hover:border-[var(--color-action-primary)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)] lg:hidden"
          aria-expanded={isMobileFilterOpen}
          aria-controls="mobile-resource-filters"
          onClick={onOpenMobileFilter}
        >
          <SlidersHorizontal aria-hidden="true" size={18} />
          {activeFilterCount > 0 ? `필터 ${activeFilterCount}` : "필터"}
        </button>
      </div>
    </section>
  );
}
