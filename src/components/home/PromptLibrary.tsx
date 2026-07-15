"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { AdditionalResources } from "@/components/home/AdditionalResources";
import { ChapterAccordion, type PromptChapterGroup } from "@/components/home/PromptLibraryCards";
import { PROMPT_CATEGORIES, promptLibraryItems, type PromptCategory, type PromptLibraryItem } from "@/data/promptLibrary";

const CHAPTER_TITLES: Readonly<Record<string, string>> = {
  "Chapter 1": "보건업무 자동화는 문제 발견에서 시작된다",
  "Chapter 2": "안내문은 한 번 만들고 계속 다듬는다",
  "Chapter 3": "AI로 반복 문서 업무를 구조화한다",
  "Chapter 4": "업무 포털은 메뉴 구조에서 시작된다",
  "Chapter 5": "AI에게 안전하게 작업을 지시한다",
  "Chapter 6": "Workflow로 업무 흐름을 설계한다",
  "Chapter 7": "연수 자료를 AI와 함께 설계한다",
  "Chapter 8": "Toolchain으로 제작 환경을 정리한다",
  "Chapter 9": "긴 프로젝트를 끊기지 않게 이어간다",
  "실전 부록 1": "반복 업무 구조화",
  "실전 부록 2": "교직원 메신저 안내",
  "실전 부록 3": "공문·보고서 초안",
  "실전 부록 4": "반복 보건업무 목록화",
  "실전 부록 5": "Google Sheets 설계",
  "실전 부록 6": "TSV 더미 데이터",
  "실전 부록 7": "Apps Script 작성",
  "실전 부록 8": "오류 원인 분석",
  "실전 부록 9": "교육자료 설계",
  "실전 부록 10": "긴 프로젝트 이어가기",
};

const getChapterOrder = (chapter: string): number => {
  const chapterNumber = Number(chapter.match(/\d+$/)?.[0] ?? Number.MAX_SAFE_INTEGER);

  return chapter.startsWith("Chapter") ? chapterNumber : 100 + chapterNumber;
};

const getChapterTitle = (chapter: string): string => CHAPTER_TITLES[chapter] ?? "전자책 실전 프롬프트";

export function PromptLibrary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PromptCategory>(PROMPT_CATEGORIES[0]);
  const [openChapters, setOpenChapters] = useState<readonly string[]>(["Chapter 1"]);
  const normalizedQuery = query.trim().toLocaleLowerCase("ko-KR");
  const hasActiveFilters = normalizedQuery.length > 0 || category !== PROMPT_CATEGORIES[0];
  const visibleItems = useMemo(
    () =>
      promptLibraryItems.filter((item) => {
        const matchesCategory = category === PROMPT_CATEGORIES[0] || item.category === category;
        const searchableText = [
          item.title,
          item.description,
          item.chapter,
          item.tool,
          item.category,
          item.content,
        ]
          .join(" ")
          .toLocaleLowerCase("ko-KR");

        return matchesCategory && (normalizedQuery.length === 0 || searchableText.includes(normalizedQuery));
      }),
    [category, normalizedQuery],
  );
  const visibleChapterGroups = useMemo<readonly PromptChapterGroup[]>(() => {
    const groups = new Map<string, PromptLibraryItem[]>();

    for (const item of visibleItems) {
      const chapterItems = groups.get(item.chapter) ?? [];
      groups.set(item.chapter, [...chapterItems, item]);
    }

    return [...groups.entries()].map(([chapter, items]) => ({ chapter, title: getChapterTitle(chapter), items })).toSorted((left, right) => getChapterOrder(left.chapter) - getChapterOrder(right.chapter));
  }, [visibleItems]);
  const expandedChapters = hasActiveFilters ? visibleChapterGroups.map((group) => group.chapter) : openChapters;

  const toggleChapter = (chapter: string) => {
    setOpenChapters((current) =>
      current.includes(chapter) ? current.filter((item) => item !== chapter) : [...current, chapter],
    );
  };

  return (
    <main className="min-h-dvh bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)]">
      <div className="mx-auto w-full max-w-5xl px-5 pb-16 pt-6 sm:px-8 sm:pt-8">
        <section className="max-w-4xl" aria-labelledby="prompt-library-title">
          <p className="w-fit rounded-full bg-[var(--color-action-muted)] px-3 py-1.5 text-xs font-semibold text-[var(--color-brand-primary)] ring-1 ring-[var(--color-border-subtle)]">
            『보건교사를 위한 AI 업무 자동화』 전자책 부록
          </p>
          <h1 id="prompt-library-title" className="mt-3 text-[2rem] font-semibold leading-[1.16] tracking-[-0.025em] sm:text-[2.65rem]">
            전자책 부록 자료실
          </h1>
          <div className="mt-3 max-w-3xl text-base leading-7 text-[var(--color-text-secondary)] sm:text-lg">
            <p>책에서 사용하는 실전 프롬프트와 추가 자료를 PART별로 내려받거나 바로 복사해 사용할 수 있습니다.</p>
            <p className="mt-2 text-sm leading-6 sm:text-base">
              Google Sheets 템플릿, 실습 파일, 업데이트 자료도 출간 이후 이 페이지에서 계속 연결합니다.
            </p>
          </div>
        </section>

        {promptLibraryItems.length === 0 ? (
          <section id="prompts" className="mt-8 scroll-mt-20 rounded-[20px] border border-[var(--color-border-subtle)] bg-white p-6 shadow-[var(--shadow-card)] sm:mt-10 sm:p-8" aria-label="프롬프트 준비 안내">
            <p className="text-base font-semibold leading-7 text-[var(--color-brand-primary)]">
              책에 수록된 실전 프롬프트를 정리하고 있습니다.
            </p>
          </section>
        ) : (
          <>
            <section id="prompts" className="mt-6 scroll-mt-20 rounded-[20px] bg-white p-4 shadow-[var(--shadow-card)] sm:mt-8 sm:p-5" aria-labelledby="prompt-search-title">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 id="prompt-search-title" className="text-lg font-semibold text-[var(--color-brand-primary)]">
                    부록 자료 찾기
                  </h2>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Chapter, 제목, 도구, 주제와 프롬프트 본문을 검색합니다.</p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-[var(--color-text-secondary)]" aria-live="polite">
                  {visibleItems.length}개
                </span>
              </div>

              <div className="mt-4 flex min-h-14 items-center gap-2 rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-surface-subtle)] px-4 focus-within:border-[var(--color-action-primary)] focus-within:ring-2 focus-within:ring-[var(--color-focus-ring)]">
                <Search aria-hidden="true" className="size-5 shrink-0 text-[var(--color-action-primary)]" />
                <label className="sr-only" htmlFor="prompt-search">
                  부록 자료 검색
                </label>
                <input
                  id="prompt-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Chapter, 제목, 도구 또는 내용을 검색해보세요"
                  className="min-h-12 w-full bg-transparent text-base outline-none placeholder:text-[var(--color-text-tertiary)]"
                />
                {query ? (
                  <button
                    type="button"
                    aria-label="부록 자료 검색어 지우기"
                    onClick={() => setQuery("")}
                    className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-xl text-[var(--color-text-secondary)] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
                  >
                    <X aria-hidden="true" className="size-4" />
                  </button>
                ) : null}
              </div>

              <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="부록 자료 카테고리">
                {PROMPT_CATEGORIES.map((item) => {
                  const isSelected = item === category;

                  return (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setCategory(item)}
                      className={`min-h-10 rounded-full px-3.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)] ${
                        isSelected
                          ? "bg-[var(--color-brand-primary)] text-white"
                          : "border border-[var(--color-border-default)] bg-[var(--color-action-muted)] text-[var(--color-brand-primary)] hover:bg-[var(--color-surface-blue)]"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="mt-8" aria-labelledby="prompt-list-title">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 id="prompt-list-title" className="text-xl font-semibold text-[var(--color-brand-primary)]">
                    Chapter별 실전 프롬프트
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">책의 흐름에 맞춰 필요한 프롬프트를 복사해 바로 사용하세요.</p>
                </div>
              </div>

              {visibleItems.length > 0 ? (
                <div className="mt-4 grid gap-3">
                  {visibleChapterGroups.map((group, index) => {
                    const isExpanded = expandedChapters.includes(group.chapter);
                    const panelId = `chapter-panel-${index}`;
                    const buttonId = `chapter-button-${index}`;

                    return (
                      <ChapterAccordion
                        key={group.chapter}
                        buttonId={buttonId}
                        group={group}
                        isExpanded={isExpanded}
                        panelId={panelId}
                        onToggle={() => toggleChapter(group.chapter)}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="mt-4 rounded-[20px] border border-[var(--color-border-subtle)] bg-white p-6 text-sm leading-6 text-[var(--color-text-secondary)]">
                  조건에 맞는 자료가 없습니다. 검색어 또는 카테고리를 변경해보세요.
                </div>
              )}
            </section>
            <AdditionalResources />
          </>
        )}
      </div>
    </main>
  );
}
