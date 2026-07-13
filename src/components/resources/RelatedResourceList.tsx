import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Resource } from "@/types/resource";
import { resourceTypeLabel } from "@/lib/resourceLabels";

type RelatedResourceListProps = {
  readonly resources: readonly Resource[];
};

export function RelatedResourceList({ resources }: RelatedResourceListProps) {
  if (resources.length === 0) {
    return null;
  }

  return (
    <section className="grid gap-4" aria-labelledby="related-resources-title">
      <div>
        <h2 id="related-resources-title" className="text-xl font-semibold">
          관련 자료
        </h2>
        <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
          이 자료와 함께 보면 좋은 다음 단계 자료입니다.
        </p>
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        {resources.map((resource) => (
          <article
            key={resource.id}
            className="grid gap-3 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)]"
          >
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md bg-[var(--color-action-muted)] px-2 py-1 text-xs font-semibold text-[var(--color-action-primary)]">
                {resourceTypeLabel(resource.resourceType)}
              </span>
              {resource.tools.slice(0, 2).map((tool) => (
                <span
                  key={tool}
                  className="rounded-md border border-[var(--color-border-subtle)] px-2 py-1 text-xs font-medium text-[var(--color-text-secondary)]"
                >
                  {tool}
                </span>
              ))}
            </div>
            <div>
              <h3 className="text-base font-semibold leading-snug">{resource.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                {resource.summary}
              </p>
            </div>
            <Link
              href={`/resources/${resource.slug}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-[var(--color-action-primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
            >
              상세 보기
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
