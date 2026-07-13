"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { DownloadButton } from "@/components/cms/DownloadButton";
import { CopyResourceButton } from "@/components/resources/CopyResourceButton";
import { PROMPT_CATEGORIES, promptLibraryItems, type PromptCategory, type PromptLibraryItem } from "@/data/promptLibrary";

export function PromptLibrary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PromptCategory>("전체");
  const normalizedQuery = query.trim().toLocaleLowerCase("ko-KR");
  const visibleItems = useMemo(
    () =>
      promptLibraryItems.filter((item) => {
        const matchesCategory = category === "전체" || item.categories.includes(category);
        const searchableText = [
          item.title,
          item.summary,
          item.content ?? "",
          ...item.tools,
          ...item.tags,
          ...item.categories,
        ]
          .join(" ")
          .toLocaleLowerCase("ko-KR");

        return matchesCategory && (normalizedQuery.length === 0 || searchableText.includes(normalizedQuery));
      }),
    [category, normalizedQuery],
  );

  return (
    <main className="min-h-dvh bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)]">
      <div className="mx-auto w-full max-w-5xl px-5 pb-16 pt-8 sm:px-8 sm:pt-12">
        <section className="max-w-3xl" aria-labelledby="prompt-library-title">
          <p className="w-fit rounded-full bg-[var(--color-action-muted)] px-3 py-1.5 text-xs font-semibold text-[var(--color-brand-primary)] ring-1 ring-[var(--color-border-subtle)]">
            『보건교사를 위한 AI 업무 자동화』 공식 자료
          </p>
          <h1 id="prompt-library-title" className="mt-5 text-[2rem] font-semibold leading-[1.16] tracking-[-0.025em] sm:text-[2.75rem]">
            책과 함께 사용하는
            <br />
            실전 프롬프트 자료실
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)] sm:text-lg">
            『보건교사를 위한 AI 업무 자동화』에서 사용하는 최신 프롬프트를 복사하거나 다운로드할 수 있습니다.
          </p>
        </section>

        <section id="prompts" className="mt-8 rounded-[20px] bg-white p-4 shadow-[var(--shadow-card)] sm:mt-10 sm:p-5" aria-labelledby="prompt-search-title">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 id="prompt-search-title" className="text-lg font-semibold text-[var(--color-brand-primary)]">
                프롬프트 찾기
              </h2>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">제목, 설명, 도구, 주제와 프롬프트 본문을 검색합니다.</p>
            </div>
            <span className="shrink-0 text-sm font-semibold text-[var(--color-text-secondary)]" aria-live="polite">
              {visibleItems.length}개
            </span>
          </div>

          <div className="mt-4 flex min-h-14 items-center gap-2 rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-surface-subtle)] px-4 focus-within:border-[var(--color-action-primary)] focus-within:ring-2 focus-within:ring-[var(--color-focus-ring)]">
            <Search aria-hidden="true" className="size-5 shrink-0 text-[var(--color-action-primary)]" />
            <label className="sr-only" htmlFor="prompt-search">
              프롬프트 검색
            </label>
            <input
              id="prompt-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="프롬프트 제목, 도구 또는 내용을 검색하세요"
              className="min-h-12 w-full bg-transparent text-base outline-none placeholder:text-[var(--color-text-tertiary)]"
            />
            {query ? (
              <button
                type="button"
                aria-label="프롬프트 검색어 지우기"
                onClick={() => setQuery("")}
                className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-xl text-[var(--color-text-secondary)] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            ) : null}
          </div>

          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="프롬프트 카테고리">
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
                      : "bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] hover:bg-[var(--color-action-muted)] hover:text-[var(--color-action-primary)]"
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
                실전 프롬프트
              </h2>
              <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">필요한 프롬프트를 복사해 바로 사용하세요.</p>
            </div>
          </div>

          {visibleItems.length > 0 ? (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {visibleItems.map((item) => (
                <PromptCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-[20px] border border-[var(--color-border-subtle)] bg-white p-6 text-sm leading-6 text-[var(--color-text-secondary)]">
              조건에 맞는 프롬프트가 없습니다. 검색어 또는 카테고리를 변경해보세요.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function PromptCard({ item }: { readonly item: PromptLibraryItem }) {
  const content = item.content ?? "";
  const preview = content.replace(/\s+/g, " ").trim().slice(0, 180);

  return (
    <article className="flex min-h-[390px] flex-col rounded-[20px] border border-[var(--color-border-subtle)] bg-white p-5 shadow-[var(--shadow-card)] transition hover:border-[var(--color-brand-secondary)] hover:shadow-[var(--shadow-card-hover)] sm:p-6">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-[var(--color-action-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--color-action-primary)]">
          프롬프트
        </span>
        {item.tools.slice(0, 2).map((tool) => (
          <span key={tool} className="rounded-full bg-[var(--color-surface-muted)] px-2.5 py-1 text-xs font-medium text-[var(--color-text-secondary)]">
            {tool}
          </span>
        ))}
      </div>
      <h3 className="mt-4 text-lg font-semibold leading-snug text-[var(--color-brand-primary)]">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{item.summary}</p>

      <div className="mt-4 rounded-2xl bg-[var(--color-surface-muted)] p-4">
        <p className="text-xs font-semibold text-[var(--color-text-tertiary)]">프롬프트 미리보기</p>
        <p className="mt-2 line-clamp-4 text-sm leading-6 text-[var(--color-text-secondary)]">{preview}...</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.categories.filter((category) => category !== "전체").slice(0, 3).map((itemCategory) => (
          <span key={itemCategory} className="text-xs text-[var(--color-text-tertiary)]">
            #{itemCategory}
          </span>
        ))}
      </div>

      <div className="mt-auto grid gap-3 pt-5 sm:grid-cols-2">
        <CopyResourceButton text={content} idleLabel="복사" className="w-full" />
        {item.download ? (
          <DownloadButton resourceId={item.id} resourceTitle={item.title} download={item.download} label="다운로드" className="w-full" />
        ) : (
          <button
            type="button"
            disabled
            aria-label={`${item.title} 다운로드`}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--color-surface-muted)] px-4 text-sm font-semibold text-[var(--color-text-tertiary)]"
          >
            다운로드 준비 중
          </button>
        )}
      </div>
    </article>
  );
}
