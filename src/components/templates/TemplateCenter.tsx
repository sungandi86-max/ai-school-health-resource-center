"use client";

import { FileSearch, Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Template } from "@/types/template";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { TemplateFilters } from "@/components/templates/TemplateFilters";
import { useTemplateCenterState } from "@/components/templates/useTemplateCenterState";
import {
  templateDifficultyLabel,
  templateTypeLabel,
} from "@/lib/templateLabels";
import { filterTemplates, sortTemplates } from "@/lib/templates";

type TemplateCenterProps = {
  readonly templates: readonly Template[];
};

const suggestedQueries = ["건강검진", "결핵검진", "Google Sheets", "감염병", "전자책", "ZIP"] as const;

export function TemplateCenter({ templates }: TemplateCenterProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const templateState = useTemplateCenterState();
  const { state } = templateState;
  const filteredTemplates = useMemo(
    () => sortTemplates(filterTemplates({ templates, criteria: state })),
    [templates, state],
  );

  return (
    <main className="min-h-dvh bg-[var(--color-surface-subtle)] px-5 py-8 text-[var(--color-text-primary)] sm:py-10">
      <div className="mx-auto grid w-full max-w-6xl gap-6">
        <header className="grid gap-4">
          <nav aria-label="Breadcrumb" className="text-sm text-[var(--color-text-secondary)]">
            <Link
              href="/"
              className="font-medium hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
            >
              홈
            </Link>
            <span aria-hidden="true" className="px-2">
              /
            </span>
            <span className="font-semibold text-[var(--color-text-primary)]">템플릿 자료실</span>
          </nav>
          <div>
            <h1 className="text-3xl font-semibold leading-tight">템플릿 자료실</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)]">
              업무에 바로 사용할 수 있는 Google Sheets, Docs, 체크리스트와 실습 자료를
              제공합니다.
            </p>
          </div>
        </header>

        <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
          <div className="grid gap-4">
            <div className="grid gap-3">
              <label className="sr-only" htmlFor="template-search">
                템플릿 검색
              </label>
              <div className="flex min-h-14 items-center gap-2 rounded-md border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] px-3 focus-within:border-[var(--color-action-primary)] focus-within:ring-2 focus-within:ring-[var(--color-focus-ring)]">
                <Search aria-hidden="true" size={18} className="text-[var(--color-action-primary)]" />
                <input
                  id="template-search"
                  type="search"
                  value={state.query}
                  onChange={(event) => {
                    templateState.setQuery(event.target.value);
                  }}
                  placeholder="템플릿을 검색하세요"
                  className="min-h-12 w-full bg-transparent text-base text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-tertiary)]"
                />
                {state.query.length > 0 ? (
                  <button
                    type="button"
                    aria-label="검색어 지우기"
                    className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
                    onClick={templateState.removeQuery}
                  >
                    <X aria-hidden="true" size={17} />
                  </button>
                ) : null}
              </div>
            </div>

            <div className="grid gap-2" aria-label="추천 검색어">
              <p className="text-xs font-semibold text-[var(--color-text-secondary)]">추천 검색어</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQueries.map((query) => (
                  <button
                    key={query}
                    type="button"
                    className="min-h-10 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)] px-3 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-action-primary)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
                    onClick={() => {
                      templateState.setQuery(query);
                    }}
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[var(--color-border-default)] px-4 text-sm font-semibold text-[var(--color-text-primary)] hover:border-[var(--color-action-primary)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)] lg:hidden"
              aria-expanded={isMobileFilterOpen}
              aria-controls="mobile-template-filters"
              onClick={() => {
                setIsMobileFilterOpen((current) => !current);
              }}
            >
              <SlidersHorizontal aria-hidden="true" size={18} />
              {templateState.activeFilterCount > 0 ? `필터 ${templateState.activeFilterCount}` : "필터"}
            </button>
          </div>
        </section>

        {isMobileFilterOpen ? (
          <section
            id="mobile-template-filters"
            className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-5 shadow-[var(--shadow-subtle)] lg:hidden"
          >
            <TemplateFilters
              templates={templates}
              criteria={state}
              onToggleCategory={templateState.toggleCategory}
              onToggleType={templateState.toggleType}
              onToggleDifficulty={templateState.toggleDifficulty}
              onClearAll={templateState.clearAll}
            />
          </section>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:items-start">
          <aside className="hidden rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-5 shadow-[var(--shadow-subtle)] lg:block">
            <TemplateFilters
              templates={templates}
              criteria={state}
              onToggleCategory={templateState.toggleCategory}
              onToggleType={templateState.toggleType}
              onToggleDifficulty={templateState.toggleDifficulty}
              onClearAll={templateState.clearAll}
            />
          </aside>

          <section className="grid gap-4" aria-label="템플릿 검색 결과">
            <div className="flex flex-col gap-3 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-[var(--color-text-primary)]" aria-live="polite">
                {templateState.hasActiveConditions
                  ? `${templates.length}개 중 ${filteredTemplates.length}개의 템플릿`
                  : `총 ${templates.length}개의 템플릿`}
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-[var(--color-text-secondary)]">
                {state.types.map((type) => (
                  <span key={type} className="rounded-md bg-[var(--color-action-muted)] px-2 py-1">
                    {templateTypeLabel(type)}
                  </span>
                ))}
                {state.categories.map((category) => (
                  <span key={category} className="rounded-md bg-[var(--color-surface-muted)] px-2 py-1">
                    {category}
                  </span>
                ))}
                {state.difficulties.map((difficulty) => (
                  <span key={difficulty} className="rounded-md bg-[var(--color-surface-muted)] px-2 py-1">
                    {templateDifficultyLabel(difficulty)}
                  </span>
                ))}
              </div>
            </div>

            {filteredTemplates.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            ) : (
              <div className="grid min-h-64 place-items-center rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-8 text-center shadow-[var(--shadow-subtle)]">
                <div className="grid max-w-sm justify-items-center gap-3">
                  <FileSearch aria-hidden="true" size={34} className="text-[var(--color-action-primary)]" />
                  <h2 className="text-xl font-semibold">조건에 맞는 템플릿이 없습니다</h2>
                  <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
                    검색어를 줄이거나 선택한 필터를 초기화해보세요.
                  </p>
                  <button
                    type="button"
                    className="min-h-12 rounded-md bg-[var(--color-action-primary)] px-4 text-sm font-semibold text-white hover:bg-[var(--color-action-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
                    onClick={templateState.clearAll}
                  >
                    검색 조건 초기화
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
