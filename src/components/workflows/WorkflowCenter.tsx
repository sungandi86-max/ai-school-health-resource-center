"use client";

import { FileSearch, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { WorkflowCard } from "@/components/workflows/WorkflowCard";
import {
  countWorkflowsByCategory,
  searchWorkflows,
} from "@/lib/workflows";
import type { WorkflowCategory, WorkflowModel } from "@/types/workflow";
import { WORKFLOW_CATEGORIES } from "@/types/workflow";

type WorkflowCenterProps = {
  readonly workflows: readonly WorkflowModel[];
};

const isWorkflowCategory = (value: string): value is WorkflowCategory =>
  WORKFLOW_CATEGORIES.some((category) => category === value);

export function WorkflowCenter({ workflows }: WorkflowCenterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const categoryParam = searchParams.get("category");
  const category =
    categoryParam && isWorkflowCategory(categoryParam) ? categoryParam : undefined;
  const filteredWorkflows = useMemo(
    () => searchWorkflows({ query, category }),
    [query, category],
  );

  const setSearchState = (nextQuery: string, nextCategory?: WorkflowCategory): void => {
    const params = new URLSearchParams();

    if (nextQuery.trim().length > 0) {
      params.set("q", nextQuery.trim());
    }

    if (nextCategory !== undefined) {
      params.set("category", nextCategory);
    }

    const nextSearch = params.toString();
    router.replace(nextSearch.length > 0 ? `${pathname}?${nextSearch}` : pathname, {
      scroll: false,
    });
  };

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
            <span className="font-semibold text-[var(--color-text-primary)]">AI Workflow</span>
          </nav>
          <div>
            <h1 className="text-3xl font-semibold leading-tight">AI Workflow</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)]">
              보건교사의 반복 업무를 AI와 함께 처리하는 실전 Workflow입니다.
            </p>
          </div>
        </header>

        <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label className="sr-only" htmlFor="workflow-search">
                Workflow 검색
              </label>
              <div className="flex min-h-14 items-center gap-2 rounded-md border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] px-3 focus-within:border-[var(--color-action-primary)] focus-within:ring-2 focus-within:ring-[var(--color-focus-ring)]">
                <Search aria-hidden="true" size={18} className="text-[var(--color-action-primary)]" />
                <input
                  id="workflow-search"
                  type="search"
                  value={query}
                  onChange={(event) => {
                    setSearchState(event.target.value, category);
                  }}
                  placeholder="업무명을 검색하세요"
                  className="min-h-12 w-full bg-transparent text-base text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-tertiary)]"
                />
                {query.length > 0 ? (
                  <button
                    type="button"
                    aria-label="검색어 지우기"
                    className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
                    onClick={() => {
                      setSearchState("", category);
                    }}
                  >
                    <X aria-hidden="true" size={17} />
                  </button>
                ) : null}
              </div>
            </div>

            <div className="grid gap-2" aria-label="Workflow 카테고리">
              <p className="text-xs font-semibold text-[var(--color-text-secondary)]">카테고리</p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  aria-pressed={category === undefined}
                  className="min-h-10 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)] px-3 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-action-primary)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)] aria-pressed:border-[var(--color-action-primary)] aria-pressed:bg-[var(--color-action-muted)] aria-pressed:text-[var(--color-action-primary)]"
                  onClick={() => {
                    setSearchState(query);
                  }}
                >
                  전체 {workflows.length}
                </button>
                {WORKFLOW_CATEGORIES.map((workflowCategory) => (
                  <button
                    key={workflowCategory}
                    type="button"
                    aria-pressed={category === workflowCategory}
                    className="min-h-10 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)] px-3 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-action-primary)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)] aria-pressed:border-[var(--color-action-primary)] aria-pressed:bg-[var(--color-action-muted)] aria-pressed:text-[var(--color-action-primary)]"
                    onClick={() => {
                      setSearchState(query, workflowCategory);
                    }}
                  >
                    {workflowCategory} {countWorkflowsByCategory(workflowCategory)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4" aria-label="Workflow 검색 결과">
          <div className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)]">
            <p className="text-sm font-semibold" aria-live="polite">
              {query.length > 0 || category !== undefined
                ? `${workflows.length}개 중 ${filteredWorkflows.length}개의 Workflow`
                : `총 ${workflows.length}개의 Workflow`}
            </p>
          </div>

          {filteredWorkflows.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredWorkflows.map((workflow) => (
                <WorkflowCard key={workflow.id} workflow={workflow} />
              ))}
            </div>
          ) : (
            <div className="grid min-h-64 place-items-center rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-8 text-center shadow-[var(--shadow-subtle)]">
              <div className="grid max-w-sm justify-items-center gap-3">
                <FileSearch aria-hidden="true" size={34} className="text-[var(--color-action-primary)]" />
                <h2 className="text-xl font-semibold">조건에 맞는 Workflow가 없습니다</h2>
                <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
                  검색어를 줄이거나 카테고리를 전체로 바꿔보세요.
                </p>
                <button
                  type="button"
                  className="min-h-12 rounded-md bg-[var(--color-action-primary)] px-4 text-sm font-semibold text-white hover:bg-[var(--color-action-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
                  onClick={() => {
                    setSearchState("");
                  }}
                >
                  검색 조건 초기화
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
