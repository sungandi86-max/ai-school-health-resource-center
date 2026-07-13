import type { CmsUpdate } from "@/types/cms";
import { formatCmsDate } from "@/lib/cms";

type UpdateTimelineProps = {
  readonly updates: readonly CmsUpdate[];
  readonly limit?: number;
};

export function UpdateTimeline({ updates, limit }: UpdateTimelineProps) {
  const visibleUpdates = limit ? updates.slice(0, limit) : updates;

  return (
    <div className="grid gap-4">
      {visibleUpdates.map((update) => (
        <article key={update.id} className="rounded-2xl bg-[var(--color-surface-muted)] p-4">
          <p className="text-xs font-semibold text-[var(--color-action-primary)]">
            {update.version} · {formatCmsDate(update.date)}
          </p>
          <h3 className="mt-1 font-semibold text-[var(--color-brand-primary)]">{update.title}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
            {update.description}
          </p>
          <ul className="mt-3 grid gap-1 text-sm leading-6 text-[var(--color-text-secondary)]">
            {update.changes.map((change) => (
              <li key={`${update.id}-${change}`}>{change}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
