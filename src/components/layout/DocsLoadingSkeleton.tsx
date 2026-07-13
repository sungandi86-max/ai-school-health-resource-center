type DocsLoadingSkeletonProps = {
  readonly label: string;
};

export function DocsLoadingSkeleton({ label }: DocsLoadingSkeletonProps) {
  return (
    <main className="min-h-dvh bg-[var(--color-surface-subtle)] px-5 py-10 text-[var(--color-text-primary)]">
      <div className="mx-auto grid w-full max-w-6xl gap-4">
        <p className="text-sm font-semibold text-[var(--color-action-primary)]">{label}</p>
        <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <div className="hidden rounded-[20px] bg-white p-5 shadow-[var(--shadow-card)] lg:grid lg:gap-3">
            <span className="h-5 w-24 rounded-full bg-[var(--color-surface-muted)] skeleton-pulse" />
            <span className="h-10 rounded-2xl bg-[var(--color-surface-muted)] skeleton-pulse" />
            <span className="h-10 rounded-2xl bg-[var(--color-surface-muted)] skeleton-pulse" />
          </div>
          <div className="grid gap-4">
            <span className="h-14 rounded-[20px] bg-white shadow-[var(--shadow-card)] skeleton-pulse" />
            <div className="grid gap-4 sm:grid-cols-2">
              <span className="h-48 rounded-[20px] bg-white shadow-[var(--shadow-card)] skeleton-pulse" />
              <span className="h-48 rounded-[20px] bg-white shadow-[var(--shadow-card)] skeleton-pulse" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
