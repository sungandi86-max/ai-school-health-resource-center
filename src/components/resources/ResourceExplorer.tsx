"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Resource } from "@/types/resource";
import { ActiveFilterChips } from "@/components/resources/ActiveFilterChips";
import { MobileFilterPanel } from "@/components/resources/MobileFilterPanel";
import { ResourceFilters } from "@/components/resources/ResourceFilters";
import { ResourceGrid } from "@/components/resources/ResourceGrid";
import { ResourceResultsHeader } from "@/components/resources/ResourceResultsHeader";
import { ResourceSearch } from "@/components/resources/ResourceSearch";
import { useResourceExplorerState } from "@/components/resources/useResourceExplorerState";
import { filterResources, sortResources } from "@/lib/resourceFilters";

type ResourceExplorerProps = {
  readonly resources: readonly Resource[];
};

export function ResourceExplorer({ resources }: ResourceExplorerProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const explorerState = useResourceExplorerState();
  const { state } = explorerState;

  const filteredResources = useMemo(
    () => filterResources({ resources, criteria: state }),
    [resources, state],
  );
  const sortedResources = useMemo(
    () => sortResources(filteredResources, state.sort),
    [filteredResources, state.sort],
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
            <span className="font-semibold text-[var(--color-text-primary)]">자료 찾기</span>
          </nav>
          <div>
            <h1 className="text-3xl font-semibold leading-tight">자료 찾기</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)]">
              업무, 도구, 자료 유형을 선택하여 지금 필요한 AI 실무 자료를 찾아보세요.
            </p>
          </div>
        </header>

        <ResourceSearch
          query={state.query}
          activeFilterCount={explorerState.activeFilterCount}
          isMobileFilterOpen={isMobileFilterOpen}
          onQueryChange={explorerState.setQuery}
          onOpenMobileFilter={() => {
            setIsMobileFilterOpen((current) => !current);
          }}
        />

        {isMobileFilterOpen ? (
          <MobileFilterPanel
            resources={resources}
            criteria={state}
            onToggleCategory={explorerState.toggleCategory}
            onToggleType={explorerState.toggleType}
            onToggleTool={explorerState.toggleTool}
            onToggleDifficulty={explorerState.toggleDifficulty}
            onClearAll={explorerState.clearAll}
            onClose={() => {
              setIsMobileFilterOpen(false);
            }}
          />
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:items-start">
          <aside className="hidden rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-5 shadow-[var(--shadow-subtle)] lg:block">
            <ResourceFilters
              resources={resources}
              criteria={state}
              onToggleCategory={explorerState.toggleCategory}
              onToggleType={explorerState.toggleType}
              onToggleTool={explorerState.toggleTool}
              onToggleDifficulty={explorerState.toggleDifficulty}
              onClearAll={explorerState.clearAll}
            />
          </aside>

          <section className="grid gap-4" aria-label="검색 결과">
            <ActiveFilterChips
              criteria={state}
              onRemoveQuery={explorerState.removeQuery}
              onRemoveCategory={explorerState.toggleCategory}
              onRemoveType={explorerState.toggleType}
              onRemoveTool={explorerState.toggleTool}
              onRemoveDifficulty={explorerState.toggleDifficulty}
              onClearAll={explorerState.clearAll}
            />
            <ResourceResultsHeader
              totalCount={resources.length}
              resultCount={sortedResources.length}
              hasActiveConditions={explorerState.hasActiveConditions}
              sort={state.sort}
              onSortChange={explorerState.setSort}
            />
            <ResourceGrid resources={sortedResources} onClearAll={explorerState.clearAll} />
          </section>
        </div>
      </div>
    </main>
  );
}
