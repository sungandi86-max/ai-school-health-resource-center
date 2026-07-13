"use client";

import { Search } from "lucide-react";
import type { FormEvent } from "react";

const suggestedQueries = ["가정통신문", "결핵검진", "건강검진 일정", "온라인 보건실", "전자책 제작"] as const;

type SearchPanelProps = {
  readonly draftQuery: string;
  readonly resultCount: number;
  readonly onDraftQueryChange: (query: string) => void;
  readonly onSearch: (query: string) => void;
};

export function SearchPanel({
  draftQuery,
  resultCount,
  onDraftQueryChange,
  onSearch,
}: SearchPanelProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(draftQuery);
  };

  return (
    <section
      id="home-search"
      className="scroll-mt-24 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5"
      aria-labelledby="home-search-title"
    >
      <div className="grid gap-3.5">
        <div>
          <h2 id="home-search-title" className="text-xl font-semibold">
            통합 검색
          </h2>
          <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
            자료 제목, 설명, 태그를 기준으로 추천 자료를 바로 좁혀봅니다.
          </p>
        </div>

        <form className="grid gap-3" role="search" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="home-resource-search">
            업무명이나 필요한 자료 검색
          </label>
          <div className="grid min-h-[52px] grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2 gap-y-2 rounded-md border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] px-3 py-1.5 focus-within:border-[var(--color-action-primary)] focus-within:ring-2 focus-within:ring-[var(--color-focus-ring)] sm:flex sm:py-0">
            <Search aria-hidden="true" size={18} className="text-[var(--color-action-primary)]" />
            <input
              id="home-resource-search"
              type="search"
              value={draftQuery}
              onChange={(event) => {
                onDraftQueryChange(event.target.value);
              }}
              placeholder="업무명이나 필요한 자료를 검색하세요"
              className="min-h-11 w-full bg-transparent text-base text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-tertiary)]"
            />
            <button
              type="submit"
              className="col-span-2 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[var(--color-action-primary)] px-4 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-action-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)] sm:col-span-1 sm:min-h-10 sm:w-auto sm:min-w-20"
            >
              검색
            </button>
          </div>
        </form>

        <div className="grid gap-2" aria-label="추천 검색어">
          <p className="text-xs font-semibold text-[var(--color-text-secondary)]">추천 검색어</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.map((query) => (
              <button
                key={query}
                type="button"
                className={`min-h-10 rounded-md border px-3 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)] ${
                  draftQuery.trim() === query
                    ? "border-[var(--color-action-primary)] bg-[var(--color-action-muted)] text-[var(--color-action-primary)]"
                    : "border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] hover:border-[var(--color-action-primary)] hover:text-[var(--color-action-primary)]"
                }`}
                onClick={() => {
                  onDraftQueryChange(query);
                  onSearch(query);
                }}
              >
                {query}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-[var(--color-text-secondary)]" aria-live="polite">
          현재 표시 중인 자료 {resultCount}개
        </p>
      </div>
    </section>
  );
}
