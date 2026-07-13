import Link from "next/link";
import { ResourceCard } from "@/components/resources/ResourceCard";
import type { Resource } from "@/types/resource";

type FeaturedResourcesProps = {
  readonly resources: readonly Resource[];
  readonly query: string;
};

export function FeaturedResources({ resources, query }: FeaturedResourcesProps) {
  const heading = query.trim().length > 0 ? "검색 결과" : "추천 자료";

  return (
    <section className="grid gap-4" aria-labelledby="featured-resources-title">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="featured-resources-title" className="text-2xl font-semibold leading-tight">
            {heading}
          </h2>
          <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
            {query.trim().length > 0
              ? "입력한 검색어와 연결된 샘플 자료입니다."
              : "지금 바로 살펴보기 좋은 대표 자료입니다."}
          </p>
        </div>
        <Link
          href="/resources"
          className="inline-flex min-h-11 w-fit items-center rounded-md px-3 text-sm font-semibold text-[var(--color-action-primary)] hover:bg-[var(--color-action-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
        >
          전체 자료 보기
        </Link>
      </div>

      {resources.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-6 text-sm leading-6 text-[var(--color-text-secondary)]">
          일치하는 샘플 자료가 없습니다. 추천 검색어를 선택하거나 다른 업무명을 입력해 보세요.
        </div>
      )}
    </section>
  );
}
