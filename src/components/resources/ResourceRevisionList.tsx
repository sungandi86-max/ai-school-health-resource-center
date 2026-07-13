import type { Resource } from "@/types/resource";

type ResourceRevisionListProps = {
  readonly resource: Resource;
};

const formatDate = (date: string): string => date.replaceAll("-", ".");

export function ResourceRevisionList({ resource }: ResourceRevisionListProps) {
  const revisions =
    resource.revisions ? [...resource.revisions].sort((left, right) => right.date.localeCompare(left.date)) : [
      {
        version: resource.version,
        date: resource.updatedAt,
        description: "현재 버전 정보입니다.",
      },
    ];

  return (
    <section className="grid gap-4" aria-labelledby="resource-revisions-title">
      <div>
        <h2 id="resource-revisions-title" className="text-xl font-semibold">
          변경 이력
        </h2>
        <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
          최신 변경 사항이 위에 표시됩니다.
        </p>
      </div>
      <div className="grid gap-3 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)]">
        {revisions.map((revision) => (
          <article
            key={`${revision.version}-${revision.date}`}
            className="border-b border-[var(--color-border-subtle)] pb-3 last:border-b-0 last:pb-0"
          >
            <h3 className="text-sm font-semibold">
              v{revision.version.replace(/^v/, "")} · {formatDate(revision.date)}
            </h3>
            <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
              {revision.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
