import { recentUpdates } from "@/data/updates";

const updateTypeLabels = {
  added: "추가",
  changed: "업데이트",
  improved: "보완",
} as const;

const formatDate = (date: string): string => date.replaceAll("-", ".");

export function RecentUpdates() {
  return (
    <section className="grid gap-4" aria-labelledby="recent-updates-title">
      <div>
        <h2 id="recent-updates-title" className="text-2xl font-semibold">
          최근 업데이트
        </h2>
        <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
          전자책 출간 이후에도 자료를 계속 정리하고 보완합니다.
        </p>
      </div>

      <div className="grid gap-3">
        {recentUpdates.map((update) => (
          <article
            key={update.id}
            className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)]"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-[var(--color-status-success-muted)] px-2 py-1 text-xs font-semibold text-[var(--color-status-success)]">
                {updateTypeLabels[update.updateType]}
              </span>
              <time className="text-xs text-[var(--color-text-secondary)]" dateTime={update.publishedAt}>
                {formatDate(update.publishedAt)}
              </time>
            </div>
            <h3 className="mt-3 text-base font-semibold text-[var(--color-text-primary)]">
              {update.title}
            </h3>
            <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
              {update.summary}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
