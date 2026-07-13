"use client";

import { FileSearch, Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { useProjectExplorerState } from "@/components/projects/useProjectExplorerState";
import { projectSortLabel, PROJECT_SORT_OPTIONS } from "@/lib/projectLabels";
import { filterProjects, getProjectResources, getProjectWorkflows, sortProjects } from "@/lib/projects";
import type { Project } from "@/types/project";

type ProjectExplorerProps = {
  readonly projects: readonly Project[];
};

const suggestedQueries = [
  "온라인 보건실",
  "건강검진",
  "업무 자동화",
  "전자책",
  "강의",
  "School Health Hub",
] as const;

export function ProjectExplorer({ projects }: ProjectExplorerProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const explorerState = useProjectExplorerState();
  const { state } = explorerState;
  const filteredProjects = useMemo(
    () => filterProjects({ projects, criteria: state }),
    [projects, state],
  );
  const sortedProjects = useMemo(
    () => sortProjects(filteredProjects, state.sort),
    [filteredProjects, state.sort],
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
            <span className="font-semibold text-[var(--color-text-primary)]">프로젝트 사례</span>
          </nav>
          <div>
            <h1 className="text-3xl font-semibold leading-tight">프로젝트 사례</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)]">
              보건 업무의 문제를 AI와 디지털 Workflow로 개선한 실제 프로젝트 구조와 적용 사례를
              살펴보세요.
            </p>
          </div>
        </header>

        <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
          <div className="grid gap-4">
            <div className="grid gap-3">
              <label className="sr-only" htmlFor="project-search">
                프로젝트 검색
              </label>
              <div className="flex min-h-14 items-center gap-2 rounded-md border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] px-3 focus-within:border-[var(--color-action-primary)] focus-within:ring-2 focus-within:ring-[var(--color-focus-ring)]">
                <Search aria-hidden="true" size={18} className="text-[var(--color-action-primary)]" />
                <input
                  id="project-search"
                  type="search"
                  value={state.query}
                  onChange={(event) => {
                    explorerState.setQuery(event.target.value);
                  }}
                  placeholder="프로젝트명, 업무 또는 사용 도구를 검색하세요"
                  className="min-h-12 w-full bg-transparent text-base text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-tertiary)]"
                />
                {state.query.length > 0 ? (
                  <button
                    type="button"
                    aria-label="검색어 지우기"
                    className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
                    onClick={explorerState.removeQuery}
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
                      explorerState.setQuery(query);
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
              aria-controls="mobile-project-filters"
              onClick={() => {
                setIsMobileFilterOpen((current) => !current);
              }}
            >
              <SlidersHorizontal aria-hidden="true" size={18} />
              {explorerState.activeFilterCount > 0 ? `필터 ${explorerState.activeFilterCount}` : "필터"}
            </button>
          </div>
        </section>

        {isMobileFilterOpen ? (
          <section
            id="mobile-project-filters"
            className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-5 shadow-[var(--shadow-subtle)] lg:hidden"
          >
            <ProjectFilters
              idPrefix="mobile"
              projects={projects}
              criteria={state}
              onToggleType={explorerState.toggleType}
              onToggleCategory={explorerState.toggleCategory}
              onToggleTool={explorerState.toggleTool}
              onToggleStatus={explorerState.toggleStatus}
              onClearAll={explorerState.clearAll}
            />
          </section>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:items-start">
          <aside className="hidden rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-5 shadow-[var(--shadow-subtle)] lg:block">
            <ProjectFilters
              idPrefix="desktop"
              projects={projects}
              criteria={state}
              onToggleType={explorerState.toggleType}
              onToggleCategory={explorerState.toggleCategory}
              onToggleTool={explorerState.toggleTool}
              onToggleStatus={explorerState.toggleStatus}
              onClearAll={explorerState.clearAll}
            />
          </aside>

          <section className="grid gap-4" aria-label="프로젝트 검색 결과">
            <div className="flex flex-col gap-3 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-[var(--color-text-primary)]" aria-live="polite">
                {explorerState.hasActiveConditions
                  ? `${projects.length}개 중 ${sortedProjects.length}개의 프로젝트`
                  : `총 ${projects.length}개의 프로젝트`}
              </p>
              <label className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                정렬
                <select
                  value={state.sort}
                  onChange={(event) => {
                    const sort = PROJECT_SORT_OPTIONS.find((option) => option === event.target.value);
                    if (sort) {
                      explorerState.setSort(sort);
                    }
                  }}
                  className="min-h-10 rounded-md border border-[var(--color-border-default)] bg-white px-3 text-sm font-medium text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
                >
                  {PROJECT_SORT_OPTIONS.map((sort) => (
                    <option key={sort} value={sort}>
                      {projectSortLabel(sort)}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {sortedProjects.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {sortedProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    workflowCount={getProjectWorkflows(project).length}
                    resourceCount={getProjectResources(project).length}
                  />
                ))}
              </div>
            ) : (
              <div className="grid min-h-64 place-items-center rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-8 text-center shadow-[var(--shadow-subtle)]">
                <div className="grid max-w-sm justify-items-center gap-3">
                  <FileSearch aria-hidden="true" size={34} className="text-[var(--color-action-primary)]" />
                  <h2 className="text-xl font-semibold">조건에 맞는 프로젝트가 없습니다</h2>
                  <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
                    검색어를 줄이거나 선택한 필터를 초기화해보세요.
                  </p>
                  <button
                    type="button"
                    className="min-h-12 rounded-md bg-[var(--color-action-primary)] px-4 text-sm font-semibold text-white hover:bg-[var(--color-action-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
                    onClick={() => {
                      window.location.assign("/projects");
                    }}
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
