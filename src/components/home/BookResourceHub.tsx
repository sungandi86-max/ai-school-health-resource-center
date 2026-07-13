"use client";

import { ArrowRight, Download, Filter } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BookCard } from "@/components/cms/BookCard";
import { FilterBar } from "@/components/cms/FilterBar";
import { ResourceDetailsModal } from "@/components/cms/ResourceDetailsModal";
import { SearchBox } from "@/components/cms/SearchBox";
import { OfficialResourceSections } from "@/components/home/OfficialResourceSections";
import { ResourceInsightPanels } from "@/components/home/ResourceInsightPanels";
import { ChapterAccordion, EmptyResourceHubState } from "@/components/home/ResourceHubSection";
import {
  cmsBooks,
  cmsCategories,
  cmsResources,
  defaultCmsFilters,
  getBookById,
  getBookResourceSummary,
  getFilteredCmsResources,
  getResourceTags,
  getResourceTypes,
  getResourceVersions,
} from "@/lib/cms";
import type { CmsChapter, CmsResource, CmsResourceFilters } from "@/types/cms";

const buildChapters = (resources: readonly CmsResource[]): readonly CmsChapter[] => {
  const chapterMap = new Map<string, CmsResource[]>();

  for (const resource of resources) {
    const key = `${resource.bookId}-chapter-${resource.chapter}`;
    const chapterResources = chapterMap.get(key) ?? [];
    chapterMap.set(key, [...chapterResources, resource]);
  }

  return [...chapterMap.entries()].map(([id, chapterResources]) => {
    const firstResource = chapterResources[0];
    const chapter = firstResource?.chapter ?? 0;
    const book = firstResource ? getBookById(firstResource.bookId) : undefined;

    return {
      id,
      chapter,
      title: `${book?.title ?? "전자책"} · Chapter ${chapter}`,
      resources: chapterResources,
      pages: [`P.${chapter * 20 + 22}`],
    };
  });
};

export function BookResourceHub() {
  const [filters, setFilters] = useState<CmsResourceFilters>(() => defaultCmsFilters());
  const [openChapterIds, setOpenChapterIds] = useState<readonly string[]>([
    `${cmsBooks[0]?.id ?? "book"}-chapter-1`,
  ]);
  const [selectedResource, setSelectedResource] = useState<CmsResource | null>(null);

  const selectedBook = filters.bookId === "all" ? cmsBooks[0] : getBookById(filters.bookId);
  const bookId = selectedBook?.id ?? cmsBooks[0]?.id ?? "";
  const bookResources = getFilteredCmsResources(filters);
  const visibleChapters = buildChapters(bookResources);
  const summary = {
    resourceCount: cmsResources.length,
    downloadCount: cmsResources.reduce((total, resource) => total + resource.downloadCount, 0),
    updatedAt: cmsResources
      .map((resource) => resource.updatedAt)
      .toSorted((left, right) => right.localeCompare(left))[0] ?? "",
  };
  const heroSummary = selectedBook ? getBookResourceSummary(selectedBook.id) : summary;
  const allBookResources =
    filters.bookId === "all"
      ? cmsResources
      : cmsResources.filter((resource) => resource.bookId === filters.bookId);
  const hasActiveFilter =
    filters.query.trim().length > 0 ||
    filters.category !== "all" ||
    filters.type !== "all" ||
    filters.tag !== "all" ||
    filters.version !== "all";

  const updateFilters = (nextFilters: CmsResourceFilters) => {
    if (nextFilters.bookId !== filters.bookId) {
      const firstMatchingResource = cmsResources.find((resource) =>
        nextFilters.bookId === "all" ? true : resource.bookId === nextFilters.bookId,
      );
      const nextOpenId = firstMatchingResource
        ? `${firstMatchingResource.bookId}-chapter-${firstMatchingResource.chapter}`
        : `${nextFilters.bookId}-chapter-1`;

      setOpenChapterIds([nextOpenId]);
    }

    setFilters(nextFilters);
  };

  const toggleChapter = (chapterId: string) => {
    setOpenChapterIds((currentIds) =>
      currentIds.includes(chapterId)
        ? currentIds.filter((currentId) => currentId !== chapterId)
        : [...currentIds, chapterId],
    );
  };

  return (
    <main className="bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)]">
      <div className="mx-auto w-full max-w-[1200px] px-5 pb-16 pt-8 sm:px-8 lg:pb-24 lg:pt-12">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div className="max-w-3xl">
            <p className="w-fit rounded-full bg-[var(--color-action-muted)] px-3 py-1.5 text-xs font-semibold text-[var(--color-brand-primary)] ring-1 ring-[var(--color-border-subtle)]">
              전자책 Companion Site
            </p>
            <h1 className="mt-5 text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--color-brand-primary)] sm:text-[3.5rem] lg:text-[4rem]">
              AI School Health Resource Center
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
              책을 읽다가 필요한 장의 자료를 바로 찾을 수 있도록 Chapter 흐름에 맞춰
              정리했습니다.
            </p>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)]">
              새 전자책과 자료는 JSON 데이터만 추가하면 같은 구조로 자동 표시됩니다.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#resources"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--color-brand-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
              >
                다운로드 시작
                <Download aria-hidden="true" className="size-4" />
              </Link>
              <Link
                href={`/book/${bookId}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[var(--color-brand-primary)] shadow-[var(--shadow-ring)] transition hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
              >
                전자책 보기
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
          {selectedBook ? <BookCard book={selectedBook} summary={heroSummary} /> : null}
        </section>

        <OfficialResourceSections />
        <ResourceInsightPanels />

        <section
          id="resources"
          className="mt-12 rounded-[20px] bg-white p-4 shadow-[var(--shadow-card)] sm:p-5"
          aria-labelledby="resource-search-title"
        >
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <h2 id="resource-search-title" className="text-xl font-semibold text-[var(--color-brand-primary)]">
                CMS 기반 자료 찾기
              </h2>
              <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
                제목, 설명, 태그, 카테고리를 검색하고 JSON 필드 기준으로 필터링합니다.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]" aria-live="polite">
              <Filter aria-hidden="true" className="size-4" />
              {summary.resourceCount}개 중 {bookResources.length}개 자료 표시
            </div>
          </div>

          <div className="mt-5 grid gap-4">
            <SearchBox
              value={filters.query}
              label="자료 검색"
              placeholder="제목, 설명, 태그, 카테고리를 검색하세요"
              onChange={(query) => updateFilters({ ...filters, query })}
            />
            <FilterBar
              books={cmsBooks}
              categories={cmsCategories}
              types={getResourceTypes(allBookResources)}
              tags={getResourceTags(allBookResources)}
              versions={getResourceVersions(allBookResources)}
              filters={filters}
              onChange={updateFilters}
            />
          </div>
        </section>

        <section className="mt-10 grid gap-4" aria-label="전자책 Chapter 자료">
          {visibleChapters.length > 0 ? (
            visibleChapters.map((chapter) => (
              <ChapterAccordion
                key={chapter.id}
                chapter={chapter}
                isOpen={hasActiveFilter || openChapterIds.includes(chapter.id)}
                onToggle={() => {
                  toggleChapter(chapter.id);
                }}
                onOpenDetails={setSelectedResource}
              />
            ))
          ) : (
            <EmptyResourceHubState
              onReset={() => {
                updateFilters(defaultCmsFilters(bookId));
              }}
            />
          )}
        </section>

        <section className="mt-16 rounded-[20px] bg-white p-5 shadow-[var(--shadow-ring)] sm:p-6">
          <h2 className="text-base font-semibold text-[var(--color-brand-primary)]">개인정보 보호 원칙</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
            제공되는 프롬프트와 예시 자료에는 실제 학생 및 교직원의 개인정보를 입력하지
            마세요. AI가 생성한 결과는 학교 규정과 최신 지침에 따라 반드시 검토한 후
            사용하세요.
          </p>
        </section>
      </div>
      {selectedResource ? (
        <ResourceDetailsModal
          resource={selectedResource}
          onClose={() => {
            setSelectedResource(null);
          }}
        />
      ) : null}
    </main>
  );
}
